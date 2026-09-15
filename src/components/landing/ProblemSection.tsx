"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Compass,
  ArrowRight,
  TrendingDown,
  Sparkles,
} from "lucide-react";

export default function ProblemSection() {
  const pitfalls = [
    "Learning random technologies without a coherent sequence",
    "Uncertainty about which skills companies actually require",
    "Wasting months on tutorials that don't increase job readiness",
    "Feeling overwhelmed by conflicting YouTube & roadmap advice",
    "No measurable way to track when you are truly job-ready",
  ];

  const solutions = [
    "AI compares your exact skills against real industry job specs",
    "Precise Skill Gap detection: Strong, Developing, or Missing",
    "Dynamic 5-Phase learning roadmap tailored to your hours/week",
    "Next Skill recommendation engine to eliminate decision fatigue",
    "Verifiable Career Readiness Score (0-100%) to prove readiness",
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-wider text-academic-300">
            The Problem & The Solution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stop Guessing. Start Navigating.
          </h2>
          <p className="text-sm sm:text-base text-ice-300/80">
            Most students learn in the dark. SkillPath AI turns career preparation into an exact science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Struggle Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-rose-500/20 bg-rose-500/5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">The Student Dilemma</h3>
                <span className="text-xs text-rose-300/80">Random, directionless learning</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {pitfalls.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ice-200/90">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* The Solution Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-academic-400/30 bg-academic-950/40 space-y-6 shadow-glow-blue">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-academic-500/30 flex items-center justify-center border border-academic-400/40">
                <Compass className="w-5 h-5 text-ice" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">The SkillPath AI Advantage</h3>
                <span className="text-xs text-academic-300">Precision career GPS navigation</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {solutions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ice-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
