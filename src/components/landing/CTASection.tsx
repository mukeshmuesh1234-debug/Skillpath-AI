"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Compass, ShieldCheck, Award } from "lucide-react";
import OnboardingModal from "@/components/OnboardingModal";

export default function CTASection() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Liquid background glow */}
      <div className="liquid-glow w-96 h-96 bg-academic-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 text-center border-academic-400/40 shadow-glass-lg space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-academic-500/25 border border-academic-400/30 text-xs font-semibold text-ice">
            <Sparkles className="w-3.5 h-3.5 text-ice" />
            <span>Start Free • No Sign-up Required</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Discover Your Gap & <br className="hidden sm:inline" />
            <span className="text-gradient-ice">Build Your Career Path?</span>
          </h2>

          <p className="text-sm sm:text-base text-ice-200 max-w-2xl mx-auto leading-relaxed">
            Take 2 minutes to map your current skills, identify exactly what you need to learn next, and follow your dynamic 5-phase roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setOnboardingOpen(true)}
              className="w-full sm:w-auto glass-button-primary px-8 py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2.5 shadow-glow-blue cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-ice" />
              <span>Launch My Skill Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto glass-button-secondary px-8 py-4 rounded-2xl text-base font-semibold flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5 text-ice" />
              <span>Explore Demo Profile (Vi)</span>
            </Link>
          </div>
        </div>
      </div>

      <OnboardingModal isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
    </section>
  );
}
