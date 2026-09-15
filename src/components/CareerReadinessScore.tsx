"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, ShieldCheck, Target, Award, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";

interface CareerReadinessScoreProps {
  score: number;
  initialScore?: number;
  targetScore?: number;
  careerTitle: string;
  strongCount: number;
  developingCount: number;
  missingCount: number;
  size?: "sm" | "md" | "lg";
}

export default function CareerReadinessScore({
  score,
  initialScore = 42,
  targetScore = 90,
  careerTitle,
  strongCount,
  developingCount,
  missingCount,
  size = "lg",
}: CareerReadinessScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.round(score);
    if (start === end) {
      setAnimatedScore(end);
      return;
    }

    const duration = 1200;
    const incrementTime = 15;
    const steps = duration / incrementTime;
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
        if (end >= 80) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
          });
        }
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [score]);

  // SVG circular dimensions
  const strokeWidth = size === "lg" ? 12 : 8;
  const radius = size === "lg" ? 80 : 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 80) return "text-emerald-400";
    if (val >= 60) return "text-academic-300";
    if (val >= 40) return "text-amber-400";
    return "text-rose-400";
  };

  const getStrokeColor = (val: number) => {
    if (val >= 80) return "#34D399";
    if (val >= 60) return "#5B96D3";
    if (val >= 40) return "#FBBF24";
    return "#F87171";
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      {/* Background Liquid Glow */}
      <div className="liquid-glow w-64 h-64 bg-academic-600 -top-20 -right-20" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Score Circle */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex items-center justify-center">
            <svg
              className={`transform -rotate-90 ${size === "lg" ? "w-48 h-48" : "w-36 h-36"}`}
            >
              {/* Background track */}
              <circle
                cx={size === "lg" ? "96" : "72"}
                cy={size === "lg" ? "96" : "72"}
                r={radius}
                className="stroke-white/10"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Animated Progress Stroke */}
              <circle
                cx={size === "lg" ? "96" : "72"}
                cy={size === "lg" ? "96" : "72"}
                r={radius}
                stroke={getStrokeColor(score)}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span
                className={`font-extrabold tracking-tight ${getScoreColor(score)} ${
                  size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl"
                }`}
              >
                {animatedScore}%
              </span>
              <span className="text-[11px] uppercase tracking-wider text-ice-300/80 font-bold mt-0.5">
                Readiness
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-500/20 border border-academic-400/30 text-xs font-semibold text-ice">
              <Target className="w-3.5 h-3.5 text-academic-300" />
              <span>Target Role: {careerTitle}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {score >= 80
                ? "Job-Market Ready"
                : score >= 60
                ? "Accelerating Pace"
                : "Foundation Building"}
            </h2>

            <p className="text-xs sm:text-sm text-ice-300/80 max-w-sm">
              Your skills match {Math.round(score)}% of verified employer job requirements for{" "}
              <span className="text-white font-medium">{careerTitle}</span> roles.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{Math.max(0, Math.round(score - initialScore))}% vs Baseline</span>
              </div>
              <div className="text-xs text-ice-400">
                Goal: <span className="text-white font-semibold">{targetScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Skill Status Breakdown Pills */}
        <div className="grid grid-cols-3 md:grid-cols-1 gap-3 w-full md:w-56">
          <div className="glass-card p-3 rounded-2xl flex items-center justify-between border-emerald-500/30 bg-emerald-500/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-glow-green" />
              <span className="text-xs font-medium text-emerald-200">Strong</span>
            </div>
            <span className="text-sm font-bold text-emerald-300">{strongCount}</span>
          </div>

          <div className="glass-card p-3 rounded-2xl flex items-center justify-between border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-glow-amber" />
              <span className="text-xs font-medium text-amber-200">Developing</span>
            </div>
            <span className="text-sm font-bold text-amber-300">{developingCount}</span>
          </div>

          <div className="glass-card p-3 rounded-2xl flex items-center justify-between border-rose-500/30 bg-rose-500/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-glow-red" />
              <span className="text-xs font-medium text-rose-200">Missing</span>
            </div>
            <span className="text-sm font-bold text-rose-300">{missingCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
