"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  MapPin,
  Sparkles,
  Award,
  GitCompare,
  FolderGit2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function KeyFeaturesSection() {
  const features = [
    {
      title: "AI Skill Gap Matrix",
      desc: "Instant color-coded classification: Strong (Green), Developing (Yellow), and Missing (Red) based on industry standards.",
      icon: BrainCircuit,
      tag: "Gap Detection",
    },
    {
      title: "5-Phase Personalized Roadmap",
      desc: "Chronologically ordered from Foundations to Capstone Projects, preventing prerequisite bottlenecks.",
      icon: MapPin,
      tag: "Roadmap Engine",
    },
    {
      title: '"What Should I Learn Next?"',
      desc: "Eliminates decision paralysis by analyzing mastered prerequisites and picking the single highest-impact skill to conquer.",
      icon: Sparkles,
      tag: "Next Action",
    },
    {
      title: "Career Readiness Score (0-100%)",
      desc: "Live algorithmic score benchmarked against employer expectations, growing as you mark modules completed.",
      icon: Award,
      tag: "Readiness Metric",
    },
    {
      title: "Side-by-Side Career Comparison",
      desc: "Compare Data Scientist vs ML Engineer vs Full Stack to view skill overlap, unique requirements, and transition ease.",
      icon: GitCompare,
      tag: "Decision Support",
    },
    {
      title: "Targeted Capstone Projects",
      desc: "Each skill module links to concrete, portfolio-ready project briefs designed to showcase on GitHub and in interviews.",
      icon: FolderGit2,
      tag: "Proof of Work",
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-wider text-academic-300">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Precision Career Growth
          </h2>
          <p className="text-sm sm:text-base text-ice-300/80">
            A complete career intelligence suite designed to replace guesswork with data-driven milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glass-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between hover:border-ice/30 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-academic-500/20 border border-academic-400/30 flex items-center justify-center text-ice">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-ice-300">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-ice-300/80 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
