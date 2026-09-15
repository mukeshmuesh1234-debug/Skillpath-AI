import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AIService, SkillInput, RequiredSkillInput } from "@/lib/ai-service";
import { parseJsonArray } from "@/lib/utils";
import { SkillLevel, PriorityLevel } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name = "Vi",
      email = "student@skillpath.ai",
      education = "2nd Year B.Tech",
      degree = "AI & Data Science",
      targetCareerSlug = "data-scientist",
      customCareer = "",
      currentSkills = [], // array of { name: string, level: SkillLevel }
      experienceLevel = "Intermediate",
      weeklyStudyHours = 10,
    } = body;

    // 1. Find or create User
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { name }],
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        },
      });
    }

    // 2. Find target career
    let targetCareer = await prisma.career.findUnique({
      where: { slug: targetCareerSlug },
      include: {
        skills: {
          include: { skill: true },
        },
      },
    });

    // If career not found by slug, fallback to data-scientist
    if (!targetCareer) {
      targetCareer = await prisma.career.findFirst({
        where: { slug: "data-scientist" },
        include: {
          skills: {
            include: { skill: true },
          },
        },
      });
    }

    // 3. Upsert Student Profile
    let profile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      profile = await prisma.studentProfile.create({
        data: {
          userId: user.id,
          education,
          degree,
          targetCareerId: targetCareer?.id,
          customCareer: customCareer || null,
          experienceLevel,
          weeklyStudyHours: Number(weeklyStudyHours) || 10,
          careerReadiness: 0,
          initialReadiness: 0,
        },
      });
    } else {
      profile = await prisma.studentProfile.update({
        where: { id: profile.id },
        data: {
          education,
          degree,
          targetCareerId: targetCareer?.id,
          customCareer: customCareer || null,
          experienceLevel,
          weeklyStudyHours: Number(weeklyStudyHours) || 10,
        },
      });
    }

    // 4. Ensure skills exist and create StudentSkill links
    // First clear old student skills and skill gaps for fresh analysis
    await prisma.studentSkill.deleteMany({ where: { profileId: profile.id } });
    await prisma.skillGap.deleteMany({ where: { profileId: profile.id } });
    await prisma.roadmapItem.deleteMany({
      where: { roadmap: { profileId: profile.id } },
    });
    await prisma.roadmap.deleteMany({ where: { profileId: profile.id } });
    await prisma.recommendation.deleteMany({ where: { profileId: profile.id } });

    const formattedStudentSkills: SkillInput[] = [];

    for (const rawSkill of currentSkills) {
      let skillRecord = await prisma.skill.findUnique({
        where: { name: rawSkill.name },
      });

      if (!skillRecord) {
        skillRecord = await prisma.skill.create({
          data: {
            name: rawSkill.name,
            category: "General",
            description: `${rawSkill.name} proficiency for industry applications.`,
            whyItMatters: `Valuable technical skill in high demand.`,
            prerequisites: JSON.stringify([]),
            whatToLearn: JSON.stringify(["Core syntax & usage", "Practical projects"]),
            recommendedProject: `Build an application utilizing ${rawSkill.name}`,
            estimatedHours: 15,
            difficulty: rawSkill.level === "Advanced" ? "Advanced" : "Intermediate",
          },
        });
      }

      await prisma.studentSkill.create({
        data: {
          profileId: profile.id,
          skillId: skillRecord.id,
          level: rawSkill.level as SkillLevel,
        },
      });

      formattedStudentSkills.push({
        name: skillRecord.name,
        level: rawSkill.level as SkillLevel,
      });
    }

    // 5. Run AI Skill Gap Analysis
    const careerSkillInputs: RequiredSkillInput[] = (targetCareer?.skills || []).map(
      (cs) => ({
        id: cs.skillId,
        name: cs.skill.name,
        requiredLevel: cs.requiredLevel as SkillLevel,
        priority: cs.priority as PriorityLevel,
        phase: cs.phase,
        phaseName: cs.phaseName,
        order: cs.order,
        estimatedHours: cs.skill.estimatedHours,
        category: cs.skill.category,
        prerequisites: parseJsonArray<string>(cs.skill.prerequisites),
      })
    );

    const gapResult = AIService.analyzeSkillGaps(
      name,
      education,
      targetCareer?.title || customCareer || "Tech Specialist",
      formattedStudentSkills,
      careerSkillInputs
    );

    // 6. Save calculated Skill Gaps
    for (const gap of gapResult.gaps) {
      const skillRecord = await prisma.skill.findUnique({
        where: { name: gap.skillName },
      });
      if (skillRecord) {
        await prisma.skillGap.create({
          data: {
            profileId: profile.id,
            skillId: skillRecord.id,
            currentLevel: gap.currentLevel,
            requiredLevel: gap.requiredLevel,
            gapLevel: gap.gapLevel,
            status: gap.status,
            priority: gap.priority,
            prerequisitesMet: gap.prerequisitesMet,
          },
        });
      }
    }

    // 7. Generate Personalized 5-Phase Roadmap
    const roadmap = await prisma.roadmap.create({
      data: {
        profileId: profile.id,
        careerId: targetCareer?.id,
        title: `${targetCareer?.title || "Career"} Accelerated Skill Path`,
        totalHours: careerSkillInputs.reduce((sum, s) => sum + (s.estimatedHours || 15), 0),
        completedHours: 0,
        status: "Active",
      },
    });

    let completedCount = 0;
    let inProgressCount = 0;
    let notStartedCount = 0;
    let completedHours = 0;

    for (const cs of targetCareer?.skills || []) {
      const gapMatch = gapResult.gaps.find((g) => g.skillName === cs.skill.name);
      let status: "Not Started" | "Learning" | "Completed" = "Not Started";

      if (gapMatch?.status === "Strong") {
        status = "Completed";
        completedCount++;
        completedHours += cs.skill.estimatedHours;
      } else if (gapMatch?.status === "Developing") {
        status = "Learning";
        inProgressCount++;
      } else {
        notStartedCount++;
      }

      await prisma.roadmapItem.create({
        data: {
          roadmapId: roadmap.id,
          skillId: cs.skill.id,
          phase: cs.phase,
          phaseName: cs.phaseName,
          order: cs.order,
          status,
          estimatedHours: cs.skill.estimatedHours,
          priority: cs.priority,
          completedAt: status === "Completed" ? new Date() : null,
        },
      });
    }

    // Update roadmap completed hours
    await prisma.roadmap.update({
      where: { id: roadmap.id },
      data: { completedHours },
    });

    // 8. Update profile with calculated readiness scores
    await prisma.studentProfile.update({
      where: { id: profile.id },
      data: {
        careerReadiness: gapResult.readinessScore,
        initialReadiness: gapResult.readinessScore,
        targetReadiness: 90.0,
      },
    });

    // 9. Create initial Progress log
    await prisma.learningProgress.create({
      data: {
        profileId: profile.id,
        readinessScore: gapResult.readinessScore,
        skillsCompleted: completedCount,
        skillsInProgress: inProgressCount,
        skillsRemaining: notStartedCount,
        hoursSpent: completedHours,
        notes: `Skill Path generated for ${targetCareer?.title}. Initial Career Readiness: ${gapResult.readinessScore}%.`,
      },
    });

    // 10. Create AI Recommendations
    const nextRec = AIService.getNextRecommendedSkill(
      formattedStudentSkills,
      careerSkillInputs
    );

    await prisma.recommendation.create({
      data: {
        profileId: profile.id,
        type: "NextSkill",
        title: nextRec.title,
        description: `Recommended target to bridge your primary gap.`,
        reason: nextRec.reason,
        estimatedTime: nextRec.estimatedTime,
        priority: nextRec.priority,
        actionUrl: "/roadmap",
      },
    });

    await prisma.recommendation.create({
      data: {
        profileId: profile.id,
        type: "WeeklyGoal",
        title: "Weekly Sprint Focus",
        description: `Allocate ${weeklyStudyHours} hours towards priority foundation modules.`,
        reason: `Consistent pacing guarantees reaching 85%+ readiness within 8 weeks.`,
        estimatedTime: `${weeklyStudyHours} hours`,
        priority: "High",
        actionUrl: "/dashboard",
      },
    });

    return NextResponse.json({
      success: true,
      profileId: profile.id,
      readinessScore: gapResult.readinessScore,
      aiInsight: gapResult.aiInsight,
      roadmapId: roadmap.id,
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding", details: String(error) },
      { status: 500 }
    );
  }
}
