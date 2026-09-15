"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Clock,
  CheckSquare,
  Square,
  Award,
  Zap,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { RecommendationItem, PriorityLevel } from "@/lib/types";
import { getPriorityBadgeClasses } from "@/lib/utils";

interface WhatToLearnNextProps {
  recommendation?: RecommendationItem | null;
  onStartLearning?: () => void;
}

export default function WhatToLearnNext({
  recommendation,
  onStartLearning,
}: WhatToLearnNextProps) {
  // Weekly checklist items with interactive toggle
  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: "task-1", text: "Learn Linear Regression & Scikit-Learn pipelines", done: true },
    { id: "task-2", text: "Practice EDA & Data Cleaning with Kaggle dataset", done: true },
    { id: "task-3", text: "Build Student Performance Prediction mini-project", done: false },
    { id: "task-4", text: "Complete Machine Learning diagnostic assessment", done: false },
  ]);

  const toggleTask = (id: string) => {
    setWeeklyTasks(
      weeklyTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = weeklyTasks.filter((t) => t.done).length;

  const defaultTitle = recommendation?.title || "Machine Learning – Supervised Learning";
  const defaultReason =
    recommendation?.reason ||
    "You have completed Python fundamentals and have enough statistics knowledge to begin supervised learning.";
  const defaultTime = recommendation?.estimatedTime || "6 hours";
  const defaultPriority = recommendation?.priority || "High";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left 2 Cols: Main Recommended Next Skill Hero Card */}
      <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between border-academic-400/30">
        <div className="liquid-glow w-56 h-56 bg-academic-500 -top-10 -right-10" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-500/25 border border-academic-400/30 text-xs font-semibold text-ice">
              <Sparkles className="w-3.5 h-3.5 text-ice" />
              <span>AI Recommended Priority</span>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${getPriorityBadgeClasses(
                defaultPriority
              )}`}
            >
              {defaultPriority} Priority
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-ice-400 block mb-1">
              Your Next Skill To Conquer
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {defaultTitle}
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/5 space-y-1">
            <span className="text-xs font-semibold text-academic-300 block">
              Why this skill right now?
            </span>
            <p className="text-xs sm:text-sm text-ice-200/90 leading-relaxed">
              "{defaultReason}"
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-ice-300">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-ice" />
              <span>Est. {defaultTime}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-emerald-400">
              <Zap className="w-4 h-4" />
              <span>Unlocks 3 Advanced Modules</span>
            </div>
          </div>

          <Link
            href="/roadmap"
            onClick={onStartLearning}
            className="w-full sm:w-auto glass-button-primary px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Right Col: This Week's Focus Sprint Checklist */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-academic-300" />
              <h4 className="text-base font-bold text-white">This Week's Sprint</h4>
            </div>
            <span className="text-xs font-bold text-emerald-400">
              {completedCount} / {weeklyTasks.length} Done
            </span>
          </div>

          <p className="text-xs text-ice-300/70 mb-4">
            Complete these milestones this week to stay on track for your readiness goal.
          </p>

          <div className="space-y-2.5">
            {weeklyTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`w-full p-3 rounded-xl text-left text-xs flex items-start gap-3 transition-all ${
                  task.done
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 line-through opacity-80"
                    : "glass-card text-ice-200 hover:border-white/20"
                }`}
              >
                {task.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-ice-400 flex-shrink-0 mt-0.5" />
                )}
                <span>{task.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-white/10 text-center">
          <span className="text-[11px] text-ice-400">
            Sprint target: 10 hrs committed this week
          </span>
        </div>
      </div>
    </div>
  );
}
