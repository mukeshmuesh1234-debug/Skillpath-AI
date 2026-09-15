import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AIService } from "@/lib/ai-service";

export async function POST(request: Request) {
  try {
    const { question, profileId } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    let studentName = "Student";
    let education = "Undergraduate";
    let careerTitle = "Data Scientist";
    let readinessScore = 68;
    let skills = ["Python", "SQL", "Statistics", "Git"];

    if (profileId) {
      const profile = await prisma.studentProfile.findUnique({
        where: { id: profileId },
        include: {
          user: true,
          targetCareer: true,
          skills: { include: { skill: true } },
        },
      });

      if (profile) {
        studentName = profile.user.name;
        education = `${profile.education} (${profile.degree})`;
        careerTitle = profile.targetCareer?.title || profile.customCareer || "Specialist";
        readinessScore = Math.round(profile.careerReadiness);
        skills = profile.skills.map((s) => s.skill.name);
      }
    }

    const answer = await AIService.askMentor(question, {
      studentName,
      education,
      careerTitle,
      readinessScore,
      skills,
    });

    return NextResponse.json({
      question,
      answer,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AI Mentor error:", error);
    return NextResponse.json(
      { error: "Failed to query AI mentor" },
      { status: 500 }
    );
  }
}
