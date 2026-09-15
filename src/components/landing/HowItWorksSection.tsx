"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Layers,
  MapPin,
  Award,
  ArrowRight,
  BrainCircuit,
  Compass,
  CheckCircle2,
} from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Input Your Starting Point",
      desc: "Select your degree, year, current skills with proficiency levels, and available weekly study hours.",
      icon: Layers,
    },
    {
      num: "02",
      title: "AI Skill Gap Detection",
      desc: "Our AI maps your skills against real verified employer requirements to calculate your Career Readiness Score.",
      icon: BrainCircuit,
    },
    {
      num: "03",
      title: "Personalized 5-Phase Roadmap",
      desc: "Receive an actionable, chronological roadmap with estimated hours, prerequisite checks, and hands-on projects.",
      icon: MapPin,
    },
    {
      num: "04",
      title: "Track Growth & Get Hired",
      desc: "Mark completed milestones, unlock advanced modules, and watch your Career Readiness Score rise to 90%+.",
      icon: Award,
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-navy-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-wider text-academic-300">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Google Maps For Your Career
          </h2>
          <p className="text-sm sm:text-base text-ice-300/80">
            From "Where am I now?" to "Where do I want to go?" in four systematic steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="glass-card p-6 rounded-3xl flex flex-col justify-between relative group hover:border-academic-400/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-academic-500/20 border border-academic-400/30 flex items-center justify-center text-ice group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-extrabold text-white/20 font-mono">
                      {s.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-ice transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ice-300/75 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1 text-xs text-academic-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Step Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
