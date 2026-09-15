"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  PlayCircle,
  XCircle,
  Calendar,
  Sparkles,
} from "lucide-react";
import { ProgressLogItem, SkillGapItem } from "@/lib/types";

interface ProgressChartsProps {
  logs: ProgressLogItem[];
  currentReadiness: number;
  initialReadiness: number;
  targetReadiness: number;
  skillGaps: SkillGapItem[];
  completedHours: number;
  totalHours: number;
}

export default function ProgressCharts({
  logs,
  currentReadiness,
  initialReadiness = 42,
  targetReadiness = 90,
  skillGaps,
  completedHours,
  totalHours,
}: ProgressChartsProps) {
  // Format timeline data for Recharts LineChart
  const timelineData = (logs.length > 0 ? logs : [
    { id: "1", date: "4 Wks Ago", readinessScore: 42, hoursSpent: 10, skillsCompleted: 1, skillsInProgress: 1, skillsRemaining: 12 },
    { id: "2", date: "3 Wks Ago", readinessScore: 48, hoursSpent: 22, skillsCompleted: 1, skillsInProgress: 2, skillsRemaining: 11 },
    { id: "3", date: "1 Wk Ago", readinessScore: 56, hoursSpent: 34, skillsCompleted: 2, skillsInProgress: 2, skillsRemaining: 10 },
    { id: "4", date: "Current", readinessScore: currentReadiness, hoursSpent: completedHours, skillsCompleted: 3, skillsInProgress: 2, skillsRemaining: 9 },
  ]).map((log, idx) => {
    let label = log.date;
    try {
      const d = new Date(log.date);
      if (!isNaN(d.getTime())) {
        label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      }
    } catch {}
    return {
      name: label,
      readiness: Math.round(log.readinessScore),
      hours: Math.round(log.hoursSpent),
      target: targetReadiness,
    };
  });

  // Calculate domain competency distribution for Radar Chart
  const categories = ["Programming", "Math & Stats", "ML & AI", "Data Engineering", "Tools & DevOps"];
  const radarData = categories.map((cat) => {
    const matching = skillGaps.filter(
      (g) => g.skill.category.toLowerCase().includes(cat.toLowerCase()) || cat.toLowerCase().includes(g.skill.category.toLowerCase())
    );
    if (!matching.length) {
      return { category: cat, score: 50, fullMark: 100 };
    }
    const strong = matching.filter((g) => g.status === "Strong").length;
    const developing = matching.filter((g) => g.status === "Developing").length;
    const score = Math.round(((strong * 1.0 + developing * 0.5) / matching.length) * 100);
    return {
      category: cat,
      score: Math.max(score, 20),
      fullMark: 100,
    };
  });

  const completedCount = skillGaps.filter((g) => g.status === "Strong").length;
  const developingCount = skillGaps.filter((g) => g.status === "Developing").length;
  const missingCount = skillGaps.filter((g) => g.status === "Missing").length;

  return (
    <div className="space-y-8">
      {/* Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-ice-400 font-semibold uppercase">Readiness</span>
            <Award className="w-4 h-4 text-academic-300" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{Math.round(currentReadiness)}%</span>
            <span className="text-xs text-emerald-400 font-semibold font-mono">
              +{Math.max(0, Math.round(currentReadiness - initialReadiness))}%
            </span>
          </div>
          <span className="text-[11px] text-ice-400 block">Baseline: {initialReadiness}% • Goal: {targetReadiness}%</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-300 font-semibold uppercase">Mastered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-3xl font-extrabold text-emerald-300">{completedCount} Skills</span>
          <span className="text-[11px] text-ice-400 block">Strong industry proficiency</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-300 font-semibold uppercase">In Progress</span>
            <PlayCircle className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-3xl font-extrabold text-amber-300">{developingCount} Skills</span>
          <span className="text-[11px] text-ice-400 block">Active sprint focus</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-ice-300 font-semibold uppercase">Study Velocity</span>
            <Clock className="w-4 h-4 text-ice" />
          </div>
          <span className="text-3xl font-extrabold text-white">{completedHours} hrs</span>
          <span className="text-[11px] text-ice-400 block">Out of {totalHours} total path hrs</span>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Timeline Growth Chart */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-academic-300 uppercase tracking-wider">
                Trajectory History
              </span>
              <h4 className="text-lg font-bold text-white">Career Readiness Growth</h4>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              Positive Momentum
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#B3CDE0" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#B3CDE0" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0C1446",
                    borderColor: "rgba(179, 205, 224, 0.3)",
                    borderRadius: "12px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="readiness"
                  name="Readiness Score %"
                  stroke="#5B96D3"
                  strokeWidth={3}
                  dot={{ fill: "#B3CDE0", r: 5 }}
                  activeDot={{ r: 8, fill: "#FFFFFF" }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target Goal (90%)"
                  stroke="#34D399"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Competency Radar Chart */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-academic-300 uppercase tracking-wider">
                Domain Balance
              </span>
              <h4 className="text-lg font-bold text-white">Skill Topology Breakdown</h4>
            </div>
            <span className="text-xs text-ice-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              5 Core Dimensions
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.15)" />
                <PolarAngleAxis dataKey="category" stroke="#B3CDE0" fontSize={11} />
                <PolarRadiusAxis domain={[0, 100]} stroke="transparent" />
                <Radar
                  name="Your Mastery"
                  dataKey="score"
                  stroke="#2B5C92"
                  fill="#2B5C92"
                  fillOpacity={0.5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0C1446",
                    borderColor: "rgba(179, 205, 224, 0.3)",
                    borderRadius: "12px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
