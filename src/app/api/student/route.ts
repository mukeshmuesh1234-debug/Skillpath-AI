import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || "vi.student@skillpath.ai";

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { name: "Vi" }],
      },
      include: {
        profile: {
          include: {
            targetCareer: {
              include: {
                skills: {
                  include: { skill: true },
                  orderBy: [{ phase: "asc" }, { order: "asc" }],
                },
              },
            },
            skills: {
              include: { skill: true },
            },
            skillGaps: {
              include: { skill: true },
              orderBy: [
                { priority: "asc" },
                { status: "asc" },
              ],
            },
            roadmaps: {
              where: { status: "Active" },
              include: {
                items: {
                  include: { skill: true },
                  orderBy: [{ phase: "asc" }, { order: "asc" }],
                },
              },
            },
            progressLogs: {
              orderBy: { date: "asc" },
            },
            recommendations: {
              orderBy: { createdAt: "desc" },
            },
          },
        },
      },
    });

    if (!user || !user.profile) {
      // Return null or 404
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 }
      );
    }

    const profile = user.profile;
    const roadmap = profile.roadmaps[0] || null;

    // Format clean response
    const formatted = {
      id: profile.id,
      name: user.name,
      email: user.email || "",
      avatar: user.avatar,
      education: profile.education,
      degree: profile.degree,
      targetCareer: profile.targetCareer
        ? {
            id: profile.targetCareer.id,
            slug: profile.targetCareer.slug,
            title: profile.targetCareer.title,
            description: profile.targetCareer.description,
            category: profile.targetCareer.category,
            averageSalary: profile.targetCareer.averageSalary,
            demandLevel: profile.targetCareer.demandLevel,
            difficulty: profile.targetCareer.difficulty,
            icon: profile.targetCareer.icon,
            skills: profile.targetCareer.skills.map((cs) => ({
              id: cs.id,
              skillId: cs.skillId,
              skill: {
                ...cs.skill,
                prerequisites: parseJsonArray<string>(cs.skill.prerequisites),
                whatToLearn: parseJsonArray<string>(cs.skill.whatToLearn),
              },
              requiredLevel: cs.requiredLevel,
              priority: cs.priority,
              phase: cs.phase,
              phaseName: cs.phaseName,
              order: cs.order,
            })),
          }
        : null,
      customCareer: profile.customCareer,
      experienceLevel: profile.experienceLevel,
      weeklyStudyHours: profile.weeklyStudyHours,
      careerReadiness: profile.careerReadiness,
      initialReadiness: profile.initialReadiness,
      targetReadiness: profile.targetReadiness,
      skills: profile.skills.map((ss) => ({
        id: ss.id,
        skillId: ss.skillId,
        skill: {
          ...ss.skill,
          prerequisites: parseJsonArray<string>(ss.skill.prerequisites),
          whatToLearn: parseJsonArray<string>(ss.skill.whatToLearn),
        },
        level: ss.level,
        isVerified: ss.isVerified,
      })),
      skillGaps: profile.skillGaps.map((sg) => ({
        id: sg.id,
        skillId: sg.skillId,
        skill: {
          ...sg.skill,
          prerequisites: parseJsonArray<string>(sg.skill.prerequisites),
          whatToLearn: parseJsonArray<string>(sg.skill.whatToLearn),
        },
        currentLevel: sg.currentLevel,
        requiredLevel: sg.requiredLevel,
        gapLevel: sg.gapLevel,
        status: sg.status,
        priority: sg.priority,
        prerequisitesMet: sg.prerequisitesMet,
      })),
      roadmap: roadmap
        ? {
            id: roadmap.id,
            title: roadmap.title,
            totalHours: roadmap.totalHours,
            completedHours: roadmap.completedHours,
            status: roadmap.status,
            items: roadmap.items.map((item) => ({
              id: item.id,
              skillId: item.skillId,
              skill: {
                ...item.skill,
                prerequisites: parseJsonArray<string>(item.skill.prerequisites),
                whatToLearn: parseJsonArray<string>(item.skill.whatToLearn),
              },
              phase: item.phase,
              phaseName: item.phaseName,
              order: item.order,
              status: item.status,
              estimatedHours: item.estimatedHours,
              priority: item.priority,
              completedAt: item.completedAt ? item.completedAt.toISOString() : null,
            })),
          }
        : null,
      progressLogs: profile.progressLogs.map((pl) => ({
        id: pl.id,
        date: pl.date.toISOString(),
        readinessScore: pl.readinessScore,
        skillsCompleted: pl.skillsCompleted,
        skillsInProgress: pl.skillsInProgress,
        skillsRemaining: pl.skillsRemaining,
        hoursSpent: pl.hoursSpent,
        notes: pl.notes,
      })),
      recommendations: profile.recommendations.map((rec) => ({
        id: rec.id,
        type: rec.type,
        title: rec.title,
        description: rec.description,
        reason: rec.reason,
        estimatedTime: rec.estimatedTime,
        priority: rec.priority,
        actionUrl: rec.actionUrl,
        isActioned: rec.isActioned,
      })),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch student data:", error);
    return NextResponse.json(
      { error: "Failed to fetch student data" },
      { status: 500 }
    );
  }
}
