import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GapStatus, PriorityLevel, SkillLevel } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJsonArray<T = string>(raw: string | undefined | null, fallback: T[] = []): T[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    // If it's a comma separated string, split it
    if (typeof raw === "string" && raw.includes(",")) {
      return raw.split(",").map((s) => s.trim()) as unknown as T[];
    }
    return [raw as unknown as T];
  }
}

export function getStatusBadgeClasses(status: GapStatus | string) {
  switch (status) {
    case "Strong":
    case "Completed":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]";
    case "Developing":
    case "Learning":
      return "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]";
    case "Missing":
    case "Not Started":
    default:
      return "bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]";
  }
}

export function getPriorityBadgeClasses(priority: PriorityLevel | string) {
  switch (priority) {
    case "Critical":
      return "bg-red-500/20 text-red-300 border-red-500/40";
    case "High":
      return "bg-orange-500/20 text-orange-300 border-orange-500/40";
    case "Medium":
      return "bg-sky-500/20 text-sky-300 border-sky-500/40";
    case "Low":
    default:
      return "bg-slate-500/20 text-slate-300 border-slate-500/40";
  }
}

export function getLevelWeight(level: SkillLevel | string): number {
  switch (level) {
    case "Advanced":
      return 3;
    case "Intermediate":
      return 2;
    case "Beginner":
      return 1;
    case "None":
    default:
      return 0;
  }
}
