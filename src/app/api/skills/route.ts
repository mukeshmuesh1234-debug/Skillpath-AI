import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { name: "asc" },
    });

    const formatted = skills.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      description: s.description,
      whyItMatters: s.whyItMatters,
      prerequisites: parseJsonArray<string>(s.prerequisites),
      whatToLearn: parseJsonArray<string>(s.whatToLearn),
      recommendedProject: s.recommendedProject,
      estimatedHours: s.estimatedHours,
      difficulty: s.difficulty,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}
