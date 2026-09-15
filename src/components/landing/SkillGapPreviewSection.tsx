"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  Clock,
} from "lucide-react";
import { getStatusBadgeClasses } from "@/lib/utils";

export default function SkillGapPreviewSection() {
  const [activeTab, setActiveTab] = useState<"All" | "Strong" | "Developing" | "Missing">("All");

  const sampleSkills = [
    { name: "Python", status: "Strong", current: "Intermediate", req: "Advanced", diff: "None", priority: "Critical", hours: 25 },
    { name: "SQL", status: "Developing", current: "Beginner", req: "Advanced", diff: "Low", priority: "Critical", hours: 20 },
    { name: "Statistics & Probability", status: "Developing", current: "Beginner", req: "Advanced", diff: "Moderate", priority: "Critical", hours: 30 },
    { name: "Machine Learning (Supervised)", status: "Missing", current: "None", req: "Advanced", diff: "High", priority: "Critical", hours: 40 },
    { name: "NumPy & Pandas", status: "Developing", current: "Beginner", req: "Advanced", diff: "Low", priority: "High", hours: 20 },
    { name: "Model Deployment & MLOps", status: "Missing", current: "None", req: "Intermediate", diff: "High", priority: "High", hours: 30 },
  ];

  const filtered = activeTab === "All" ? sampleSkills : sampleSkills.filter((s) => s.status === activeTab);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-navy-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column: Context & Stats */}
          <div className="lg:w-5/12 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-academic-500/20 border border-academic-400/30 text-xs font-semibold text-ice">
              <Sparkles className="w-3.5 h-3.5 text-ice" />
              <span>Real Student Assessment Example</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Skill Gap Matrix for <span className="text-academic-300">Data Scientist</span>
            </h2>

            <p className="text-sm sm:text-base text-ice-300/80 leading-relaxed">
              Here is how SkillPath AI breaks down a 2nd Year student's profile aiming for a Data Scientist role. Each skill is analyzed for exact depth, prerequisite dependencies, and priority rating.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="glass-card p-4 rounded-2xl border-emerald-500/30 text-center">
                <span className="text-2xl font-extrabold text-emerald-300">68%</span>
                <span className="text-[10px] text-emerald-200 block font-semibold uppercase mt-0.5">Readiness</span>
              </div>
              <div className="glass-card p-4 rounded-2xl border-amber-500/30 text-center">
                <span className="text-2xl font-extrabold text-amber-300">3</span>
                <span className="text-[10px] text-amber-200 block font-semibold uppercase mt-0.5">Developing</span>
              </div>
              <div className="glass-card p-4 rounded-2xl border-rose-500/30 text-center">
                <span className="text-2xl font-extrabold text-rose-300">2</span>
                <span className="text-[10px] text-rose-200 block font-semibold uppercase mt-0.5">Missing</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard"
                className="glass-button-primary px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
              >
                <span>Explore Full Interactive Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Gap Preview Matrix */}
          <div className="lg:w-7/12 w-full glass-panel rounded-3xl p-6 sm:p-8 border-white/10 space-y-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 pb-2 border-b border-white/10 overflow-x-auto">
              {(["All", "Strong", "Developing", "Missing"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? "bg-academic-500/40 text-white border border-ice/30 shadow-glow-blue"
                      : "text-ice-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-2.5">
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-3.5 rounded-2xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    {item.status === "Strong" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {item.status === "Developing" && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                    {item.status === "Missing" && <XCircle className="w-4 h-4 text-rose-400" />}
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
                      <span className="text-[11px] text-ice-400">
                        Current: <strong className="text-white">{item.current}</strong> • Req: <strong className="text-academic-300">{item.req}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold ${getStatusBadgeClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
