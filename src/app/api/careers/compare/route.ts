import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";
import { AIService, SkillInput, RequiredSkillInput } from "@/lib/ai-service";
import { SkillLevel, PriorityLevel } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const { slugA, slugB, profileId } = await request.json();

    if (!slugA || !slugB) {
      return NextResponse.json(
        { error: "Both slugA and slugB are required" },
        { status: 400 }
      );
    }

    const [careerA, careerB] = await Promise.all([
      prisma.career.findUnique({
        where: { slug: slugA },
        include: { skills: { include: { skill: true } } },
      }),
      prisma.career.findUnique({
        where: { slug: slugB },
        include: { skills: { include: { skill: true } } },
      }),
    ]);

    if (!careerA || !careerB) {
      return NextResponse.json(
        { error: "One or both careers not found" },
        { status: 404 }
      );
    }

    // Fetch student skills if profileId provided or default to demo Vi
    let studentSkills: SkillInput[] = [];
    if (profileId) {
      const studentSkillsData = await prisma.studentSkill.findMany({
        where: { profileId },
        include: { skill: true },
      });
      studentSkills = studentSkillsData.map((s) => ({
        name: s.skill.name,
        level: s.level as SkillLevel,
      }));
    } else {
      // Default demo skills
      studentSkills = [
        { name: "Python", level: "Intermediate" },
        { name: "SQL", level: "Beginner" },
        { name: "Statistics & Probability", level: "Beginner" },
        { name: "Git & GitHub", level: "Beginner" },
      ];
    }

    const studentMap = new Map<string, SkillLevel>();
    studentSkills.forEach((s) => studentMap.set(s.name.toLowerCase().trim(), s.level));

    const reqSkillsA: RequiredSkillInput[] = careerA.skills.map((cs) => ({
      name: cs.skill.name,
      requiredLevel: cs.requiredLevel as SkillLevel,
      priority: cs.priority as PriorityLevel,
      estimatedHours: cs.skill.estimatedHours,
    }));

    const reqSkillsB: RequiredSkillInput[] = careerB.skills.map((cs) => ({
      name: cs.skill.name,
      requiredLevel: cs.requiredLevel as SkillLevel,
      priority: cs.priority as PriorityLevel,
      estimatedHours: cs.skill.estimatedHours,
    }));

    const readinessA = AIService.calculateReadinessScore(studentSkills, reqSkillsA);
    const readinessB = AIService.calculateReadinessScore(studentSkills, reqSkillsB);

    const mapA = new Map(careerA.skills.map((s) => [s.skill.name.toLowerCase(), s]));
    const mapB = new Map(careerB.skills.map((s) => [s.skill.name.toLowerCase(), s]));

    const overlappingSkills: any[] = [];
    const uniqueToA: any[] = [];
    const uniqueToB: any[] = [];

    careerA.skills.forEach((cs) => {
      const nameKey = cs.skill.name.toLowerCase();
      const userLevel = studentMap.get(nameKey) || "None";
      const skillObj = {
        ...cs.skill,
        prerequisites: parseJsonArray<string>(cs.skill.prerequisites),
        whatToLearn: parseJsonArray<string>(cs.skill.whatToLearn),
      };

      if (mapB.has(nameKey)) {
        const csB = mapB.get(nameKey)!;
        overlappingSkills.push({
          skill: skillObj,
          reqA: cs.requiredLevel,
          reqB: csB.requiredLevel,
          userLevel,
        });
      } else {
        uniqueToA.push({
          skill: skillObj,
          req: cs.requiredLevel,
          userLevel,
        });
      }
    });

    careerB.skills.forEach((cs) => {
      const nameKey = cs.skill.name.toLowerCase();
      if (!mapA.has(nameKey)) {
        const userLevel = studentMap.get(nameKey) || "None";
        const skillObj = {
          ...cs.skill,
          prerequisites: parseJsonArray<string>(cs.skill.prerequisites),
          whatToLearn: parseJsonArray<string>(cs.skill.whatToLearn),
        };
        uniqueToB.push({
          skill: skillObj,
          req: cs.requiredLevel,
          userLevel,
        });
      }
    });

    const overlapCount = overlappingSkills.length;
    const overlapPercentage = Math.round(
      (overlapCount / Math.max(careerA.skills.length, careerB.skills.length, 1)) * 100
    );

    let aiAdvice = `Both roles share a ${overlapPercentage}% skill overlap centered around ${overlappingSkills.slice(0, 3).map((s) => s.skill.name).join(", ")}. `;
    if (readinessA > readinessB) {
      aiAdvice += `Based on your current skill profile, you are closer to ${careerA.title} (${readinessA}%) than ${careerB.title} (${readinessB}%). Moving to ${careerB.title} would require dedicated focus on ${uniqueToB.slice(0, 2).map((s) => s.skill.name).join(" and ")}.`;
    } else if (readinessB > readinessA) {
      aiAdvice += `You are currently more aligned with ${careerB.title} (${readinessB}%) than ${careerA.title} (${readinessA}%). Bridging the gap to ${careerA.title} requires mastering ${uniqueToA.slice(0, 2).map((s) => s.skill.name).join(" and ")}.`;
    } else {
      aiAdvice += `You are equally positioned for both roles at ${readinessA}%. Choose ${careerA.title} for deeper business modeling & analytics, or ${careerB.title} for software architecture and large-scale deployments.`;
    }

    return NextResponse.json({
      careerA: {
        id: careerA.id,
        slug: careerA.slug,
        title: careerA.title,
        description: careerA.description,
        category: careerA.category,
        averageSalary: careerA.averageSalary,
        demandLevel: careerA.demandLevel,
        difficulty: careerA.difficulty,
        icon: careerA.icon,
      },
      careerB: {
        id: careerB.id,
        slug: careerB.slug,
        title: careerB.title,
        description: careerB.description,
        category: careerB.category,
        averageSalary: careerB.averageSalary,
        demandLevel: careerB.demandLevel,
        difficulty: careerB.difficulty,
        icon: careerB.icon,
      },
      readinessA,
      readinessB,
      overlappingSkills,
      uniqueToA,
      uniqueToB,
      aiAdvice,
    });
  } catch (error) {
    console.error("Career comparison error:", error);
    return NextResponse.json(
      { error: "Failed to compare careers" },
      { status: 500 }
    );
  }
}
