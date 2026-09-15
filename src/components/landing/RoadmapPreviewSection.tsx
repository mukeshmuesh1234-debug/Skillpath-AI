"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function RoadmapPreviewSection() {
  const phases = [
    {
      phase: 1,
      title: "Foundations",
      skills: ["Python Fundamentals", "SQL Database Extraction", "Statistics & Probability"],
      status: "Mastered",
      badge: "Completed",
    },
    {
      phase: 2,
      title: "Data Science Core",
      skills: ["NumPy & Pandas Manipulation", "Data Cleaning & EDA", "Data Storytelling & Plotly"],
      status: "In Progress",
      badge: "Active Sprint",
    },
    {
      phase: 3,
      title: "Machine Learning",
      skills: ["Supervised Regression/Classification", "Feature Engineering", "Scikit-Learn Pipelines"],
      status: "Next Up",
      badge: "Scheduled",
    },
    {
      phase: 4,
      title: "Advanced AI",
      skills: ["Deep Learning & PyTorch", "NLP & Transformers", "Generative AI & RAG"],
      status: "Locked",
      badge: "Phase 4",
    },
    {
      phase: 5,
      title: "Career Ready",
      skills: ["FastAPI & Docker Model Serving", "GitHub Portfolio Capstone", "Technical Interview Prep"],
      status: "Goal",
      badge: "Phase 5",
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-wider text-academic-300">
            Personalized Learning Progression
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            5-Phase Dynamic Career Roadmaps
          </h2>
          <p className="text-sm sm:text-base text-ice-300/80">
            Every career roadmap is structured into 5 gating phases, ensuring you build unbreakable fundamentals before attempting advanced architectures.
          </p>
        </div>

        {/* Horizontal Timeline Preview for Desktop / Vertical for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {phases.map((p, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`glass-card p-5 rounded-2xl flex flex-col justify-between border ${
                idx === 0
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : idx === 1
                  ? "border-academic-400/50 bg-academic-950/40 shadow-glow-blue"
                  : "border-white/10"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-white/10 text-ice">
                    PHASE 0{p.phase}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      idx === 0
                        ? "bg-emerald-500/20 text-emerald-300"
                        : idx === 1
                        ? "bg-academic-500/30 text-white"
                        : "bg-white/5 text-ice-400"
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white">{p.title}</h4>

                <ul className="space-y-1.5 pt-1">
                  {p.skills.map((s, sIdx) => (
                    <li key={sIdx} className="text-xs text-ice-300/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-academic-400 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-[11px] text-ice-400 flex items-center justify-between">
                <span>Est. ~25 hrs</span>
                {idx === 0 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/roadmap"
            className="glass-button-primary px-8 py-3.5 rounded-2xl text-sm font-bold inline-flex items-center gap-2 shadow-glow-blue"
          >
            <span>View Full Interactive Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
