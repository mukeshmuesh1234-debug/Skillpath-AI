import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AIService, SkillInput, RequiredSkillInput } from "@/lib/ai-service";
import { SkillLevel, PriorityLevel } from "@/lib/types";

export async function PATCH(request: Request) {
  try {
    const { itemId, status } = await request.json();

    if (!itemId || !status) {
      return NextResponse.json(
        { error: "itemId and status are required" },
        { status: 400 }
      );
    }

    // 1. Update the roadmap item
    const item = await prisma.roadmapItem.update({
      where: { id: itemId },
      data: {
        status,
        completedAt: status === "Completed" ? new Date() : null,
      },
      include: {
        skill: true,
        roadmap: {
          include: {
            profile: {
              include: {
                targetCareer: {
                  include: {
                    skills: { include: { skill: true } },
                  },
                },
                skills: { include: { skill: true } },
              },
            },
            items: { include: { skill: true } },
          },
        },
      },
    });

    const roadmap = item.roadmap;
    const profile = roadmap.profile;

    // 2. Recalculate roadmap hours
    const completedItems = roadmap.items.filter((i) => i.status === "Completed");
    const learningItems = roadmap.items.filter((i) => i.status === "Learning");
    const notStartedItems = roadmap.items.filter((i) => i.status === "Not Started");

    const completedHours = completedItems.reduce(
      (sum, i) => sum + i.estimatedHours,
      0
    );

    await prisma.roadmap.update({
      where: { id: roadmap.id },
      data: { completedHours },
    });

    // 3. Update or sync studentSkill level
    let targetSkillLevel: SkillLevel = "None";
    if (status === "Completed") targetSkillLevel = "Advanced";
    else if (status === "Learning") targetSkillLevel = "Intermediate";

    if (targetSkillLevel !== "None") {
      const existingSS = await prisma.studentSkill.findFirst({
        where: {
          profileId: profile.id,
          skillId: item.skillId,
        },
      });

      if (existingSS) {
        await prisma.studentSkill.update({
          where: { id: existingSS.id },
          data: { level: targetSkillLevel },
        });
      } else {
        await prisma.studentSkill.create({
          data: {
            profileId: profile.id,
            skillId: item.skillId,
            level: targetSkillLevel,
          },
        });
      }
    }

    // 4. Recalculate Career Readiness Score
    const updatedStudentSkills = await prisma.studentSkill.findMany({
      where: { profileId: profile.id },
      include: { skill: true },
    });

    const studentSkillInputs: SkillInput[] = updatedStudentSkills.map((ss) => ({
      name: ss.skill.name,
      level: ss.level as SkillLevel,
    }));

    const reqSkills: RequiredSkillInput[] = (
      profile.targetCareer?.skills || []
    ).map((cs) => ({
      name: cs.skill.name,
      requiredLevel: cs.requiredLevel as SkillLevel,
      priority: cs.priority as PriorityLevel,
      estimatedHours: cs.skill.estimatedHours,
      phase: cs.phase,
    }));

    const newReadinessScore = AIService.calculateReadinessScore(
      studentSkillInputs,
      reqSkills
    );

    await prisma.studentProfile.update({
      where: { id: profile.id },
      data: { careerReadiness: newReadinessScore },
    });

    // 5. Update Skill Gap record
    const targetCareerSkill = profile.targetCareer?.skills.find(
      (cs) => cs.skillId === item.skillId
    );
    if (targetCareerSkill) {
      let gapStatus = "Missing";
      let gapLevel = "High";
      if (status === "Completed") {
        gapStatus = "Strong";
        gapLevel = "None";
      } else if (status === "Learning") {
        gapStatus = "Developing";
        gapLevel = "Low";
      }

      const existingGap = await prisma.skillGap.findFirst({
        where: {
          profileId: profile.id,
          skillId: item.skillId,
        },
      });

      if (existingGap) {
        await prisma.skillGap.update({
          where: { id: existingGap.id },
          data: {
            currentLevel: targetSkillLevel,
            status: gapStatus,
            gapLevel: gapLevel as any,
          },
        });
      }
    }

    // 6. Record new LearningProgress log entry
    const progressLog = await prisma.learningProgress.create({
      data: {
        profileId: profile.id,
        readinessScore: newReadinessScore,
        skillsCompleted: completedItems.length,
        skillsInProgress: learningItems.length,
        skillsRemaining: notStartedItems.length,
        hoursSpent: completedHours,
        notes: `Updated "${item.skill.name}" to ${status}. Readiness is now ${newReadinessScore}%.`,
      },
    });

    // 7. Update Next Skill Recommendation
    const nextRec = AIService.getNextRecommendedSkill(
      studentSkillInputs,
      reqSkills
    );

    const existingRec = await prisma.recommendation.findFirst({
      where: { profileId: profile.id, type: "NextSkill" },
    });

    if (existingRec) {
      await prisma.recommendation.update({
        where: { id: existingRec.id },
        data: {
          title: nextRec.title,
          reason: nextRec.reason,
          estimatedTime: nextRec.estimatedTime,
          priority: nextRec.priority,
        },
      });
    }

    return NextResponse.json({
      success: true,
      item: {
        id: item.id,
        status: item.status,
        completedAt: item.completedAt,
      },
      readinessScore: newReadinessScore,
      completedHours,
      totalHours: roadmap.totalHours,
      progressLog,
    });
  } catch (error) {
    console.error("Failed to update roadmap item:", error);
    return NextResponse.json(
      { error: "Failed to update roadmap item" },
      { status: 500 }
    );
  }
}
