"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import ProgressCharts from "@/components/ProgressCharts";
import OnboardingModal from "@/components/OnboardingModal";
import { StudentProfileData } from "@/lib/types";

export default function ProgressPage() {
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
      console.error("Failed to fetch progress logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-academic-400/30 border-t-ice rounded-full animate-spin" />
        <p className="text-sm text-ice-300">Loading progress analytics & historical velocity...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="glass-panel p-10 rounded-3xl space-y-4">
          <Layers className="w-12 h-12 text-ice mx-auto" />
          <h2 className="text-2xl font-bold text-white">No Progress Records Found</h2>
          <p className="text-sm text-ice-300/80 max-w-md mx-auto">
            Take a skill assessment to start logging historical career readiness milestones.
          </p>
          <button
            onClick={() => setOnboardingOpen(true)}
            className="glass-button-primary px-6 py-3 rounded-xl text-sm font-bold"
          >
            Start Assessment
          </button>
        </div>
        <OnboardingModal isOpen={onboardingOpen} onClose={() => { setOnboardingOpen(false); fetchStudent(); }} />
      </div>
    );
  }

  const completedHours = profileData.roadmap?.completedHours || 45;
  const totalHours = profileData.roadmap?.totalHours || 140;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-500/20 border border-academic-400/30 text-xs font-semibold text-ice mb-1">
            <Layers className="w-3.5 h-3.5 text-ice" />
            <span>Velocity & Metric Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Progress & Career Growth
          </h1>
          <p className="text-xs sm:text-sm text-ice-300/80 mt-1">
            Tracking {profileData.name}'s journey toward {profileData.targetCareer?.title || "Data Scientist"} readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/roadmap"
            className="glass-button-primary px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <span>Continue Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Recharts Visualizations */}
      <ProgressCharts
        logs={profileData.progressLogs}
        currentReadiness={profileData.careerReadiness}
        initialReadiness={profileData.initialReadiness}
        targetReadiness={profileData.targetReadiness}
        skillGaps={profileData.skillGaps}
        completedHours={completedHours}
        totalHours={totalHours}
      />

      {/* Historical Milestone Log Table */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-academic-300 uppercase tracking-wider">
              Audit Trail
            </span>
            <h3 className="text-xl font-bold text-white">Historical Milestone Activity</h3>
          </div>
          <span className="text-xs text-ice-400 font-mono">
            {profileData.progressLogs.length} Checkpoints Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ice-300">
            <thead className="bg-white/5 uppercase text-[10px] text-ice-400 font-bold border-b border-white/10">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Timestamp</th>
                <th className="py-3 px-4">Readiness Score</th>
                <th className="py-3 px-4">Completed / Remaining</th>
                <th className="py-3 px-4">Study Hours</th>
                <th className="py-3 px-4 rounded-r-xl">Milestone Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {profileData.progressLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-white">
                    {new Date(log.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-academic-300 bg-academic-500/15 px-2 py-0.5 rounded-md border border-academic-400/20">
                      {Math.round(log.readinessScore)}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-emerald-300 font-semibold">{log.skillsCompleted} done</span> •{" "}
                    <span className="text-ice-400">{log.skillsRemaining} to go</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-white">{log.hoursSpent} hrs</td>
                  <td className="py-3.5 px-4 text-ice-200">{log.notes || "Milestone check."}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OnboardingModal isOpen={onboardingOpen} onClose={() => { setOnboardingOpen(false); fetchStudent(); }} />
    </div>
  );
}
