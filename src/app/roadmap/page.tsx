"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Sparkles,
  Compass,
  ArrowRight,
  Clock,
  CheckCircle2,
  Layers,
  RefreshCw,
  Award,
} from "lucide-react";
import VisualRoadmap from "@/components/VisualRoadmap";
import OnboardingModal from "@/components/OnboardingModal";
import { StudentProfileData, RoadmapItemStatus } from "@/lib/types";

export default function RoadmapPage() {
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
      console.error("Failed to fetch student:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleUpdateStatus = async (
    itemId: string,
    newStatus: RoadmapItemStatus
  ) => {
    try {
      const res = await fetch("/api/roadmap/item", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, status: newStatus }),
      });
      if (res.ok) {
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
        <p className="text-sm text-ice-300 font-medium">Synthesizing personalized learning roadmap...</p>
      </div>
    );
  }

  if (!profileData || !profileData.roadmap) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="glass-panel p-10 rounded-3xl space-y-4">
          <MapPin className="w-12 h-12 text-ice mx-auto" />
          <h2 className="text-2xl font-bold text-white">No Active Roadmap</h2>
          <p className="text-sm text-ice-300/80 max-w-md mx-auto">
            Take a 2-minute skill assessment to generate your personalized 5-phase career roadmap.
          </p>
          <button
            onClick={() => setOnboardingOpen(true)}
            className="glass-button-primary px-6 py-3 rounded-xl text-sm font-bold"
          >
            Generate Roadmap Now
          </button>
        </div>
        <OnboardingModal isOpen={onboardingOpen} onClose={() => { setOnboardingOpen(false); fetchStudent(); }} />
      </div>
    );
  }

  const completedCount = profileData.roadmap.items.filter((i) => i.status === "Completed").length;
  const learningCount = profileData.roadmap.items.filter((i) => i.status === "Learning").length;
  const totalCount = profileData.roadmap.items.length;
  const progressPercent = Math.round((completedCount / Math.max(totalCount, 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Top Banner Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-academic-300">
              Personalized Learning Route
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-academic-500/20 text-ice border border-academic-400/30 font-bold">
              {profileData.targetCareer?.title || "Career Track"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Personalized Career Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-ice-300/80 mt-1">
            Tailored for {profileData.name} ({profileData.education} • {profileData.weeklyStudyHours} hrs/week)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="glass-button-secondary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2"
          >
            <span>Back to Dashboard</span>
          </Link>
          <button
            onClick={() => setOnboardingOpen(true)}
            className="glass-button-primary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-ice" />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Summary Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-semibold text-ice-300 uppercase tracking-wider">
              Roadmap Progress Overview
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {completedCount} of {totalCount} Skills Mastered ({progressPercent}%)
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{completedCount} Completed</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>{learningCount} In Progress</span>
            </div>
            <div className="flex items-center gap-1.5 text-ice-400">
              <Clock className="w-4 h-4 text-ice-400" />
              <span>{profileData.roadmap.completedHours} / {profileData.roadmap.totalHours} hrs</span>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-academic-400 via-ice to-emerald-400 rounded-full transition-all duration-500 shadow-glow-blue"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Visual Roadmap 5-Phase Component */}
      <VisualRoadmap
        roadmap={profileData.roadmap}
        onUpdateStatus={handleUpdateStatus}
      />

      <OnboardingModal isOpen={onboardingOpen} onClose={() => { setOnboardingOpen(false); fetchStudent(); }} />
    </div>
  );
}
