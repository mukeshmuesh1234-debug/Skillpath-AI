export type SkillLevel = "None" | "Beginner" | "Intermediate" | "Advanced";
export type PriorityLevel = "Critical" | "High" | "Medium" | "Low";
export type GapStatus = "Strong" | "Developing" | "Missing";
export type RoadmapItemStatus = "Not Started" | "Learning" | "Completed";

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  description: string;
  whyItMatters: string;
  prerequisites: string[]; // parsed from JSON
  whatToLearn: string[]; // parsed from JSON
  recommendedProject: string;
  estimatedHours: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface StudentSkillItem {
  id: string;
  skillId: string;
  skill: SkillItem;
  level: SkillLevel;
  isVerified: boolean;
}

export interface CareerSkillRequirement {
  id: string;
  skillId: string;
  skill: SkillItem;
  requiredLevel: SkillLevel;
  priority: PriorityLevel;
  phase: number;
  phaseName: string;
  order: number;
}

export interface CareerItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  averageSalary: string;
  demandLevel: string;
  difficulty: string;
  icon: string;
  skills: CareerSkillRequirement[];
}

export interface SkillGapItem {
  id: string;
  skillId: string;
  skill: SkillItem;
  currentLevel: SkillLevel;
  requiredLevel: SkillLevel;
  gapLevel: "None" | "Low" | "Moderate" | "High" | "Critical";
  status: GapStatus;
  priority: PriorityLevel;
  prerequisitesMet: boolean;
}

export interface RoadmapNodeItem {
  id: string;
  skillId: string;
  skill: SkillItem;
  phase: number;
  phaseName: string;
  order: number;
  status: RoadmapItemStatus;
  estimatedHours: number;
  priority: PriorityLevel;
  completedAt?: string | null;
}

export interface RoadmapData {
  id: string;
  title: string;
  totalHours: number;
  completedHours: number;
  status: string;
  items: RoadmapNodeItem[];
}

export interface ProgressLogItem {
  id: string;
  date: string;
  readinessScore: number;
  skillsCompleted: number;
  skillsInProgress: number;
  skillsRemaining: number;
  hoursSpent: number;
  notes?: string | null;
}

export interface RecommendationItem {
  id: string;
  type: "NextSkill" | "Project" | "WeeklyGoal" | "CareerTip";
  title: string;
  description: string;
  reason: string;
  estimatedTime?: string | null;
  priority: PriorityLevel;
  actionUrl?: string | null;
  isActioned: boolean;
}

export interface StudentProfileData {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  education: string;
  degree: string;
  targetCareer: CareerItem | null;
  customCareer?: string | null;
  experienceLevel: string;
  weeklyStudyHours: number;
  careerReadiness: number;
  initialReadiness: number;
  targetReadiness: number;
  skills: StudentSkillItem[];
  skillGaps: SkillGapItem[];
  roadmap: RoadmapData | null;
  progressLogs: ProgressLogItem[];
  recommendations: RecommendationItem[];
}

export interface CareerComparisonResult {
  careerA: CareerItem;
  careerB: CareerItem;
  readinessA: number;
  readinessB: number;
  overlappingSkills: {
    skill: SkillItem;
    reqA: SkillLevel;
    reqB: SkillLevel;
    userLevel: SkillLevel;
  }[];
  uniqueToA: {
    skill: SkillItem;
    req: SkillLevel;
    userLevel: SkillLevel;
  }[];
  uniqueToB: {
    skill: SkillItem;
    req: SkillLevel;
    userLevel: SkillLevel;
  }[];
  aiAdvice: string;
}
