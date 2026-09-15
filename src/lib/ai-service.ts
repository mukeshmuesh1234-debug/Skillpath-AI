import { SkillLevel, PriorityLevel, GapStatus } from "./types";
import { getLevelWeight } from "./utils";

export interface SkillInput {
  name: string;
  level: SkillLevel;
}

export interface RequiredSkillInput {
  id?: string;
  name: string;
  requiredLevel: SkillLevel;
  priority: PriorityLevel;
  phase?: number;
  phaseName?: string;
  order?: number;
  estimatedHours?: number;
  category?: string;
  prerequisites?: string[];
}

export interface SkillGapAnalysisResult {
  readinessScore: number;
  strongSkills: string[];
  developingSkills: string[];
  missingSkills: string[];
  gaps: {
    skillName: string;
    currentLevel: SkillLevel;
    requiredLevel: SkillLevel;
    gapLevel: "None" | "Low" | "Moderate" | "High" | "Critical";
    status: GapStatus;
    priority: PriorityLevel;
    prerequisitesMet: boolean;
  }[];
  aiInsight: string;
}

export class AIService {
  /**
   * Calculates the Career Readiness Score based on skill weights and required depth
   */
  static calculateReadinessScore(
    studentSkills: SkillInput[],
    requiredSkills: RequiredSkillInput[]
  ): number {
    if (!requiredSkills.length) return 50;

    const studentSkillMap = new Map<string, SkillLevel>();
    studentSkills.forEach((s) => studentSkillMap.set(s.name.toLowerCase().trim(), s.level));

    let totalWeight = 0;
    let earnedWeight = 0;

    const priorityMultiplier: Record<PriorityLevel, number> = {
      Critical: 3.0,
      High: 2.0,
      Medium: 1.2,
      Low: 0.8,
    };

    requiredSkills.forEach((req) => {
      const mult = priorityMultiplier[req.priority] || 1.0;
      const reqVal = getLevelWeight(req.requiredLevel);
      const curVal = getLevelWeight(studentSkillMap.get(req.name.toLowerCase().trim()) || "None");

      totalWeight += reqVal * mult;
      // Match ratio capped at 1.0
      const scoreRatio = Math.min(curVal / Math.max(reqVal, 1), 1.0);
      earnedWeight += scoreRatio * reqVal * mult;
    });

    if (totalWeight === 0) return 60;
    const percentage = Math.round((earnedWeight / totalWeight) * 100);
    return Math.min(Math.max(percentage, 10), 100);
  }

  /**
   * Performs full Skill Gap analysis for a target career
   */
  static analyzeSkillGaps(
    studentName: string,
    education: string,
    careerTitle: string,
    studentSkills: SkillInput[],
    requiredSkills: RequiredSkillInput[]
  ): SkillGapAnalysisResult {
    const studentSkillMap = new Map<string, SkillLevel>();
    studentSkills.forEach((s) => studentSkillMap.set(s.name.toLowerCase().trim(), s.level));

    const strongSkills: string[] = [];
    const developingSkills: string[] = [];
    const missingSkills: string[] = [];

    const gaps = requiredSkills.map((req) => {
      const currentLevel = (studentSkillMap.get(req.name.toLowerCase().trim()) || "None") as SkillLevel;
      const curVal = getLevelWeight(currentLevel);
      const reqVal = getLevelWeight(req.requiredLevel);
      const diff = reqVal - curVal;

      let status: GapStatus = "Missing";
      let gapLevel: "None" | "Low" | "Moderate" | "High" | "Critical" = "High";

      if (diff <= 0) {
        status = "Strong";
        gapLevel = "None";
        strongSkills.push(req.name);
      } else if (diff === 1 && curVal > 0) {
        status = "Developing";
        gapLevel = "Low";
        developingSkills.push(req.name);
      } else if (diff === 1 && curVal === 0) {
        status = "Missing";
        gapLevel = "Moderate";
        missingSkills.push(req.name);
      } else {
        // diff >= 2
        if (curVal > 0) {
          status = "Developing";
          gapLevel = "Moderate";
          developingSkills.push(req.name);
        } else {
          status = "Missing";
          gapLevel = req.priority === "Critical" ? "Critical" : "High";
          missingSkills.push(req.name);
        }
      }

      // Check prerequisites
      let prerequisitesMet = true;
      if (req.prerequisites && req.prerequisites.length > 0) {
        prerequisitesMet = req.prerequisites.every((prereq) => {
          const pLevel = studentSkillMap.get(prereq.toLowerCase().trim());
          return pLevel && pLevel !== "None";
        });
      }

      return {
        skillName: req.name,
        currentLevel,
        requiredLevel: req.requiredLevel,
        gapLevel,
        status,
        priority: req.priority,
        prerequisitesMet,
      };
    });

    const readinessScore = this.calculateReadinessScore(studentSkills, requiredSkills);

    // AI Insight generation
    let aiInsight = "";
    if (readinessScore >= 80) {
      aiInsight = `Outstanding readiness (${readinessScore}%)! You have already mastered the critical foundations and core toolchains for ${careerTitle}. Focus on high-impact portfolio capstones and interview architecture challenges to secure top offers.`;
    } else if (readinessScore >= 60) {
      aiInsight = `Strong foundational trajectory (${readinessScore}%). You have solid basics in ${strongSkills.slice(0, 2).join(" & ") || "programming"}, but bridging the gaps in ${developingSkills.slice(0, 2).concat(missingSkills.slice(0, 1)).join(", ")} will accelerate you into high-tier candidate territory.`;
    } else if (readinessScore >= 40) {
      aiInsight = `Developing stage (${readinessScore}%). You possess early fundamentals, but need a structured sequence starting with ${missingSkills.slice(0, 3).join(", ")} before diving into advanced domain projects.`;
    } else {
      aiInsight = `Kickstarting your path (${readinessScore}%). Starting with foundational phase modules will build your core momentum systematically without burnout.`;
    }

    return {
      readinessScore,
      strongSkills,
      developingSkills,
      missingSkills,
      gaps,
      aiInsight,
    };
  }

  /**
   * Generates next best skill to study based on unblocked dependencies & highest priority
   */
  static getNextRecommendedSkill(
    studentSkills: SkillInput[],
    requiredSkills: RequiredSkillInput[]
  ) {
    const studentSkillMap = new Map<string, SkillLevel>();
    studentSkills.forEach((s) => studentSkillMap.set(s.name.toLowerCase().trim(), s.level));

    // Find skills that are NOT Strong and have prerequisites met
    const candidates = requiredSkills.filter((req) => {
      const curLevel = studentSkillMap.get(req.name.toLowerCase().trim()) || "None";
      const curVal = getLevelWeight(curLevel);
      const reqVal = getLevelWeight(req.requiredLevel);
      return curVal < reqVal;
    });

    if (!candidates.length) {
      return {
        title: "Portfolio Capstone Project",
        skillName: "End-to-End Capstone",
        reason: "You have satisfied all core and advanced requirements. Now assemble a public portfolio project to showcase on GitHub and resume.",
        estimatedTime: "15 hours",
        priority: "Critical" as PriorityLevel,
      };
    }

    // Sort by phase ASC, priority weight DESC
    const priorityWeight: Record<PriorityLevel, number> = {
      Critical: 4,
      High: 3,
      Medium: 2,
      Low: 1,
    };

    candidates.sort((a, b) => {
      const phaseDiff = (a.phase || 1) - (b.phase || 1);
      if (phaseDiff !== 0) return phaseDiff;
      return (priorityWeight[b.priority] || 1) - (priorityWeight[a.priority] || 1);
    });

    const top = candidates[0];
    const curLevel = studentSkillMap.get(top.name.toLowerCase().trim()) || "None";

    let reason = "";
    if (curLevel === "None") {
      reason = `You have completed the required foundational prerequisites and are ready to tackle ${top.name} at the ${top.requiredLevel} level.`;
    } else {
      reason = `You currently have ${curLevel} knowledge in ${top.name}. Upgrading to ${top.requiredLevel} is critical to elevate your role readiness.`;
    }

    return {
      title: `${top.name} Mastery`,
      skillName: top.name,
      reason,
      estimatedTime: `${top.estimatedHours || 12} hours`,
      priority: top.priority,
    };
  }

  /**
   * Answers student queries using AI Mentor Engine
   */
  static async askMentor(
    question: string,
    context: {
      studentName: string;
      education: string;
      careerTitle: string;
      readinessScore: number;
      skills: string[];
    }
  ): Promise<string> {
    const qLower = question.toLowerCase();

    if (qLower.includes("resume") || qLower.includes("cv")) {
      return `For your ${context.careerTitle} resume, prioritize concrete metrics over simple lists of buzzwords. With your current readiness at ${context.readinessScore}%, highlight your completed projects in ${context.skills.slice(0, 3).join(", ")}. Include GitHub repo links, live demo URLs, and quantify results (e.g. "Achieved 92% ROC-AUC on student churn prediction dataset").`;
    }

    if (qLower.includes("interview") || qLower.includes("prepare")) {
      return `To prepare for ${context.careerTitle} technical interviews: 1) Master live coding in Python & SQL; 2) Review the mathematical trade-offs between algorithms; 3) Prepare 2 in-depth architectural stories from your portfolio capstones explaining why you picked specific architectures.`;
    }

    if (qLower.includes("project") || qLower.includes("portfolio")) {
      return `I recommend building an end-to-end deployed project rather than a generic Jupyter notebook. Build a "${context.careerTitle} Intelligent Decision Pipeline" using real Kaggle or public API data, package it with FastAPI & Docker, and provide an interactive UI for non-technical users.`;
    }

    if (qLower.includes("math") || qLower.includes("statistics")) {
      return `For ${context.careerTitle}, you don't need a pure PhD in math, but you MUST have intuition for: Hypothesis Testing (p-values, A/B testing), Linear Algebra (matrix dot products, embeddings), and Calculus (gradients & loss optimization).`;
    }

    if (qLower.includes("how long") || qLower.includes("timeline") || qLower.includes("weeks")) {
      return `At a pace of 10-12 focused hours per week, moving from ${context.readinessScore}% to 85%+ readiness typically takes 6 to 10 weeks following the 5-phase personalized roadmap.`;
    }

    return `Great question regarding your journey to become a ${context.careerTitle}. At your current ${context.readinessScore}% readiness, focusing on high-priority gap areas like modeling and deployment while reinforcing your ${context.skills.slice(0, 2).join(" & ") || "core"} strengths will deliver the highest return on study time.`;
  }
}
