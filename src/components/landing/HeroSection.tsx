"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Target,
  Layers,
  MapPin,
  Cpu,
} from "lucide-react";
import OnboardingModal from "@/components/OnboardingModal";

export default function HeroSection() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const journeySteps = [
    { label: "Current Skills", sub: "Python, SQL, Stats", color: "bg-academic-600/40 text-ice-200 border-ice/20", icon: Layers },
    { label: "AI Gap Detection", sub: "Score: 68%", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: Sparkles },
    { label: "Personal Roadmap", sub: "5 Structured Phases", color: "bg-academic-500/30 text-white border-academic-300", icon: MapPin },
    { label: "Career Ready", sub: "Top 5% Candidate", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40", icon: CheckCircle2 },
  ];

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Background Liquid Mesh Orbs */}
      <div className="liquid-glow w-96 h-96 bg-academic-600 top-10 left-1/2 -translate-x-1/2 opacity-30" />
      <div className="liquid-glow w-72 h-72 bg-navy-800 -top-20 -left-20 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-academic-500/20 border border-ice-300/30 shadow-glow-blue text-xs font-semibold text-ice"
          >
            <Sparkles className="w-3.5 h-3.5 text-ice" />
            <span>AI-Powered Career Intelligence Platform</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
          >
            Know Your Gap. <br className="hidden sm:inline" />
            <span className="text-gradient-ice">Build Your Path.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-ice-300/85 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the exact skills you need for your dream career, understand where you stand today, and get a personalized roadmap to become truly job-ready.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => setOnboardingOpen(true)}
              className="w-full sm:w-auto glass-button-primary px-8 py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2.5 shadow-glow-blue group cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-ice group-hover:rotate-12 transition-transform" />
              <span>Build My Skill Path</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="/careers"
              className="w-full sm:w-auto glass-button-secondary px-8 py-4 rounded-2xl text-base font-semibold flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5 text-ice" />
              <span>Explore Careers</span>
            </Link>
          </motion.div>
        </div>

        {/* Hero Visual: Career Journey Pipeline ("Google Maps for your career") */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 sm:mt-20 max-w-5xl mx-auto"
        >
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border-academic-400/30 shadow-glass-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-ice-400 ml-2 font-mono">SkillPath AI Navigation GPS</span>
              </div>
              <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Path Optimization</span>
              </div>
            </div>

            {/* Pipeline Steps Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {journeySteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className={`glass-card p-5 rounded-2xl border flex flex-col justify-between relative transition-transform hover:-translate-y-1 ${step.color}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono opacity-60">0{idx + 1}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">{step.label}</h4>
                      <p className="text-xs opacity-80">{step.sub}</p>
                    </div>

                    {idx < journeySteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-ice-300">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <OnboardingModal isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
    </section>
  );
}
