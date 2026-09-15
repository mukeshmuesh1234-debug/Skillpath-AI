import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const career = await prisma.career.findUnique({
      where: { slug },
      include: {
        skills: {
          include: {
            skill: true,
          },
          orderBy: [{ phase: "asc" }, { order: "asc" }],
        },
      },
    });

    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    const formatted = {
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
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch career details:", error);
    return NextResponse.json(
      { error: "Failed to fetch career details" },
      { status: 500 }
    );
  }
}
