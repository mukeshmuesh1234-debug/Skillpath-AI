"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  MapPin,
  Compass,
  GitCompare,
  Layers,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  BookOpen,
  FolderGit2,
} from "lucide-react";
import CareerReadinessScore from "@/components/CareerReadinessScore";
import SkillGapMatrix from "@/components/SkillGapMatrix";
import WhatToLearnNext from "@/components/WhatToLearnNext";
import OnboardingModal from "@/components/OnboardingModal";
import { StudentProfileData, RoadmapItemStatus } from "@/lib/types";

export default function DashboardPage() {
  const [profileData, setProfileData] = useState<StudentProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const fetchStudent = async () => {
    try {
      const res = await fetch("/api/student");
      if (res.ok) {
        const data = await res.json();
        setProfileData(data);
      }
    } catch (err) {
      console.error("Failed to load student profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleSkillStatusUpdate = async (
    skillId: string,
    newStatus: "Not Started" | "Learning" | "Completed"
  ) => {
    if (!profileData?.roadmap) return;
    const roadmapItem = profileData.roadmap.items.find((i) => i.skillId === skillId);
    if (!roadmapItem) return;

    try {
      const res = await fetch("/api/roadmap/item", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: roadmapItem.id, status: newStatus }),
      });
      if (res.ok) {
        // Refresh profile data to sync readiness score and gap matrix
        fetchStudent();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-academic-400/30 border-t-ice rounded-full animate-spin" />
        <p className="text-sm text-ice-300 font-medium">Loading your AI career intelligence dashboard...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="glass-panel p-10 rounded-3xl space-y-4">
          <Compass className="w-12 h-12 text-ice mx-auto" />
          <h2 className="text-2xl font-bold text-white">No Active Assessment Found</h2>
          <p className="text-sm text-ice-300/80 max-w-md mx-auto">
            Take a 2-minute skill assessment to generate your personalized career intelligence dashboard and roadmap.
          </p>
          <button
            onClick={() => setOnboardingOpen(true)}
            className="glass-button-primary px-6 py-3 rounded-xl text-sm font-bold"
          >
            Launch Assessment Now
          </button>
        </div>
        <OnboardingModal isOpen={onboardingOpen} onClose={() => { setOnboardingOpen(false); fetchStudent(); }} />
      </div>
    );
  }

  const strongGaps = profileData.skillGaps.filter((g) => g.status === "Strong");
  const developingGaps = profileData.skillGaps.filter((g) => g.status === "Developing");
  const missingGaps = profileData.skillGaps.filter((g) => g.status === "Missing");

  // Priority Skills (Critical & High priority missing/developing)
  const prioritySkills = profileData.skillGaps
    .filter((g) => g.status !== "Strong")
    .sort((a, b) => {
      const pWeights: Record<string, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      return (pWeights[b.priority] || 1) - (pWeights[a.priority] || 1);
    })
    .slice(0, 4);

  const nextSkillRec = profileData.recommendations.find((r) => r.type === "NextSkill") || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Bar: Welcome back, Vi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-academic-300">
              Career Intelligence Dashboard
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              ● Live Sync
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Welcome back, {profileData.name}
          </h1>
          <p className="text-xs sm:text-sm text-ice-300/80 mt-1">
            {profileData.education} • {profileData.degree} • Target:{" "}
            <strong className="text-white font-semibold">
              {profileData.targetCareer?.title || profileData.customCareer || "Data Scientist"}
            </strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOnboardingOpen(true)}
            className="glass-button-secondary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>

          <Link
            href="/roadmap"
            className="glass-button-primary px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-ice" />
            <span>Open Roadmap</span>
          </Link>
        </div>
      </div>

      {/* Main Career Readiness Score Gauge */}
      <CareerReadinessScore
        score={profileData.careerReadiness}
        initialScore={profileData.initialReadiness}
        targetScore={profileData.targetReadiness}
        careerTitle={profileData.targetCareer?.title || profileData.customCareer || "Data Scientist"}
        strongCount={strongGaps.length}
        developingCount={developingGaps.length}
        missingCount={missingGaps.length}
      />

      {/* AI Decision Insight Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-academic-950 via-navy-900 to-navy-950 border-academic-400/30 relative overflow-hidden">
        <div className="liquid-glow w-56 h-56 bg-academic-500 -top-10 -right-10" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-academic-300 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-ice" />
            <span>AI Skill Gap Synthesis</span>
          </div>
          <p className="text-sm sm:text-base text-ice-100 font-medium leading-relaxed">
            "You have a solid foundation in{" "}
            <span className="text-white font-semibold">
              {strongGaps.map((g) => g.skill.name).join(", ") || "Python and Git"}
            </span>
            , but strengthening{" "}
            <span className="text-academic-300 font-semibold">
              {developingGaps.slice(0, 2).map((g) => g.skill.name).join(" & ") || "Statistics & SQL"}
            </span>{" "}
            and closing critical gaps in{" "}
            <span className="text-rose-300 font-semibold">
              {missingGaps.slice(0, 2).map((g) => g.skill.name).join(" and ") || "Machine Learning"}
            </span>{" "}
            will significantly boost your readiness for high-tier{" "}
            <strong className="text-white">
              {profileData.targetCareer?.title || "Data Scientist"}
            </strong>{" "}
            roles."
          </p>
        </div>
      </div>

      {/* "What Should I Learn Next?" Hero Component */}
      <WhatToLearnNext
        recommendation={nextSkillRec}
      />

      {/* 4-Column Skill Gap Categorization Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Your Strengths */}
        <div className="glass-panel p-5 rounded-3xl space-y-3 border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h4>Your Strengths</h4>
            </div>
            <span className="text-xs font-bold text-emerald-300 font-mono">
              {strongGaps.length}
            </span>
          </div>
          <p className="text-[11px] text-ice-300/70">Verified mastered skills</p>
          <div className="space-y-1.5 pt-1">
            {strongGaps.length === 0 ? (
              <span className="text-xs text-ice-400">None yet</span>
            ) : (
              strongGaps.map((g) => (
                <div key={g.id} className="text-xs p-2 rounded-xl bg-emerald-500/10 text-emerald-200 border border-emerald-500/20 flex items-center justify-between">
                  <span className="font-semibold">{g.skill.name}</span>
                  <span className="text-[10px] text-emerald-300/80">{g.currentLevel}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Developing Skills */}
        <div className="glass-panel p-5 rounded-3xl space-y-3 border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h4>Developing Skills</h4>
            </div>
            <span className="text-xs font-bold text-amber-300 font-mono">
              {developingGaps.length}
            </span>
          </div>
          <p className="text-[11px] text-ice-300/70">Needs depth upgrade to Advanced</p>
          <div className="space-y-1.5 pt-1">
            {developingGaps.length === 0 ? (
              <span className="text-xs text-ice-400">None</span>
            ) : (
              developingGaps.map((g) => (
                <div key={g.id} className="text-xs p-2 rounded-xl bg-amber-500/10 text-amber-200 border border-amber-500/20 flex items-center justify-between">
                  <span className="font-semibold">{g.skill.name}</span>
                  <span className="text-[10px] text-amber-300/80">{g.currentLevel} → {g.requiredLevel}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Skill Gaps */}
        <div className="glass-panel p-5 rounded-3xl space-y-3 border-rose-500/20 bg-rose-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
              <XCircle className="w-4 h-4 text-rose-400" />
              <h4>Skill Gaps</h4>
            </div>
            <span className="text-xs font-bold text-rose-300 font-mono">
              {missingGaps.length}
            </span>
          </div>
          <p className="text-[11px] text-ice-300/70">Missing from repertoire</p>
          <div className="space-y-1.5 pt-1">
            {missingGaps.length === 0 ? (
              <span className="text-xs text-ice-400">All covered!</span>
            ) : (
              missingGaps.slice(0, 4).map((g) => (
                <div key={g.id} className="text-xs p-2 rounded-xl bg-rose-500/10 text-rose-200 border border-rose-500/20 flex items-center justify-between">
                  <span className="font-semibold">{g.skill.name}</span>
                  <span className="text-[10px] text-rose-300/80">{g.priority}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Priority Action Ranking */}
        <div className="glass-panel p-5 rounded-3xl space-y-3 border-academic-400/30 bg-academic-950/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-academic-300 font-bold text-sm">
              <Award className="w-4 h-4 text-ice" />
              <h4>Priority Ranking</h4>
            </div>
            <span className="text-xs font-bold text-white font-mono">Top 4</span>
          </div>
          <p className="text-[11px] text-ice-300/70">Highest return on study time</p>
          <div className="space-y-1.5 pt-1">
            {prioritySkills.map((g, idx) => (
              <div key={g.id} className="text-xs p-2 rounded-xl bg-white/5 text-ice-100 flex items-center justify-between">
                <span className="font-semibold">{idx + 1}. {g.skill.name}</span>
                <span className="text-[10px] text-academic-300 font-bold">{g.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Filterable Skill Gap Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-academic-300">
              Granular Skill Breakdown
            </span>
            <h3 className="text-2xl font-bold text-white">Full Skill Gap Matrix</h3>
          </div>
          <span className="text-xs text-ice-400 hidden sm:inline">
            Click any skill to view syllabus & project guidelines
          </span>
        </div>

        <SkillGapMatrix
          skillGaps={profileData.skillGaps}
          onSkillStatusUpdate={handleSkillStatusUpdate}
        />
      </div>

      <OnboardingModal isOpen={onboardingOpen} onClose={() => { setOnboardingOpen(false); fetchStudent(); }} />
    </div>
  );
}
