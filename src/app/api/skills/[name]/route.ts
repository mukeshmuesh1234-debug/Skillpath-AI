import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);

    const skill = await prisma.skill.findFirst({
      where: {
        OR: [
          { name: { equals: decodedName } },
          { id: decodedName },
        ],
      },
      include: {
        careerSkills: {
          include: { career: true },
        },
      },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const formatted = {
      id: skill.id,
      name: skill.name,
      category: skill.category,
      description: skill.description,
      whyItMatters: skill.whyItMatters,
      prerequisites: parseJsonArray<string>(skill.prerequisites),
      whatToLearn: parseJsonArray<string>(skill.whatToLearn),
      recommendedProject: skill.recommendedProject,
      estimatedHours: skill.estimatedHours,
      difficulty: skill.difficulty,
      careers: skill.careerSkills.map((cs) => ({
        careerTitle: cs.career.title,
        careerSlug: cs.career.slug,
        requiredLevel: cs.requiredLevel,
        priority: cs.priority,
      })),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch skill details:", error);
    return NextResponse.json(
      { error: "Failed to fetch skill details" },
      { status: 500 }
    );
  }
}
