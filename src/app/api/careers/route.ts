import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";

export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      include: {
        skills: {
          include: {
            skill: true,
          },
          orderBy: [{ phase: "asc" }, { order: "asc" }],
        },
      },
      orderBy: { title: "asc" },
    });

    const formatted = careers.map((career) => ({
      id: career.id,
      slug: career.slug,
      title: career.title,
      description: career.description,
      category: career.category,
      averageSalary: career.averageSalary,
      demandLevel: career.demandLevel,
      difficulty: career.difficulty,
      icon: career.icon,
      skills: career.skills.map((cs) => ({
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
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch careers:", error);
    return NextResponse.json(
      { error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}
