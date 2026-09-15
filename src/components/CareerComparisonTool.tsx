"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GitCompare,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Layers,
  Award,
  ArrowLeftRight,
} from "lucide-react";
import { CareerItem, CareerComparisonResult } from "@/lib/types";

interface CareerComparisonToolProps {
  careers: CareerItem[];
  defaultSlugA?: string;
  defaultSlugB?: string;
  profileId?: string;
}

export default function CareerComparisonTool({
  careers,
  defaultSlugA = "data-scientist",
  defaultSlugB = "machine-learning-engineer",
  profileId,
}: CareerComparisonToolProps) {
  const [slugA, setSlugA] = useState(defaultSlugA);
  const [slugB, setSlugB] = useState(defaultSlugB);
  const [comparison, setComparison] = useState<CareerComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchComparison = async (a: string, b: string) => {
    if (a === b) return;
    setLoading(true);
    try {
      const res = await fetch("/api/careers/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugA: a, slugB: b, profileId }),
      });
      if (res.ok) {
        const data = await res.json();
        setComparison(data);
      }
    } catch (err) {
      console.error("Comparison fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparison(slugA, slugB);
  }, [slugA, slugB, profileId]);

  const handleSwap = () => {
    const temp = slugA;
    setSlugA(slugB);
    setSlugB(temp);
  };

  return (
    <div className="space-y-8">
      {/* Selector Controls */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Career Dropdown */}
        <div className="w-full md:w-5/12 space-y-2">
          <label className="text-xs font-semibold text-ice-300 uppercase tracking-wider">
            Career Track A
          </label>
          <select
            value={slugA}
            onChange={(e) => setSlugA(e.target.value)}
            className="w-full glass-input px-4 py-3 rounded-2xl text-sm font-semibold"
          >
            {careers.map((c) => (
              <option key={c.slug} value={c.slug} disabled={c.slug === slugB} className="bg-navy-900 text-white">
                {c.title} ({c.category})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          className="p-3 rounded-2xl glass-button-secondary text-ice hover:text-white flex-shrink-0"
          title="Swap Careers"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>

        {/* Right Career Dropdown */}
        <div className="w-full md:w-5/12 space-y-2">
          <label className="text-xs font-semibold text-ice-300 uppercase tracking-wider">
            Career Track B
          </label>
          <select
            value={slugB}
            onChange={(e) => setSlugB(e.target.value)}
            className="w-full glass-input px-4 py-3 rounded-2xl text-sm font-semibold"
          >
            {careers.map((c) => (
              <option key={c.slug} value={c.slug} disabled={c.slug === slugA} className="bg-navy-900 text-white">
                {c.title} ({c.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="glass-panel rounded-3xl p-16 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-academic-400/30 border-t-ice rounded-full animate-spin mx-auto" />
          <p className="text-sm text-ice-300">Comparing skill topologies and overlap matrices...</p>
        </div>
      ) : comparison ? (
        <div className="space-y-8">
          {/* AI Decision Insight Banner */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-academic-950 via-navy-900 to-navy-950 border-academic-400/30 relative overflow-hidden">
            <div className="liquid-glow w-56 h-56 bg-academic-500 -top-10 -right-10" />
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-academic-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-ice" />
                <span>AI Career Differential Advisor</span>
              </div>
              <p className="text-sm sm:text-base text-ice-100 font-medium leading-relaxed">
                "{comparison.aiAdvice}"
              </p>
            </div>
          </div>

          {/* Readiness Comparison Meters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Career A Card */}
            <div className="glass-panel rounded-3xl p-6 space-y-4 border-academic-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-ice-400">
                    Track A
                  </span>
                  <h3 className="text-xl font-bold text-white">{comparison.careerA.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-academic-300">
                    {comparison.readinessA}%
                  </span>
                  <span className="text-[10px] text-ice-400 block">Your Readiness</span>
                </div>
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-academic-400"
                  style={{ width: `${comparison.readinessA}%` }}
                />
              </div>

              <div className="pt-2 text-xs text-ice-300 space-y-1">
                <p>💰 <strong className="text-white">Avg Salary:</strong> {comparison.careerA.averageSalary}</p>
                <p>📈 <strong className="text-white">Demand:</strong> {comparison.careerA.demandLevel}</p>
                <p>⚡ <strong className="text-white">Difficulty:</strong> {comparison.careerA.difficulty}</p>
              </div>
            </div>

            {/* Career B Card */}
            <div className="glass-panel rounded-3xl p-6 space-y-4 border-academic-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-ice-400">
                    Track B
                  </span>
                  <h3 className="text-xl font-bold text-white">{comparison.careerB.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-400">
                    {comparison.readinessB}%
                  </span>
                  <span className="text-[10px] text-ice-400 block">Your Readiness</span>
                </div>
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400"
                  style={{ width: `${comparison.readinessB}%` }}
                />
              </div>

              <div className="pt-2 text-xs text-ice-300 space-y-1">
                <p>💰 <strong className="text-white">Avg Salary:</strong> {comparison.careerB.averageSalary}</p>
                <p>📈 <strong className="text-white">Demand:</strong> {comparison.careerB.demandLevel}</p>
                <p>⚡ <strong className="text-white">Difficulty:</strong> {comparison.careerB.difficulty}</p>
              </div>
            </div>
          </div>

          {/* Overlapping Shared Skills Section */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-academic-300" />
                <h4 className="text-lg font-bold text-white">
                  Shared Skill Overlap ({comparison.overlappingSkills.length} Skills)
                </h4>
              </div>
              <span className="text-xs text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold">
                Transferable Core
              </span>
            </div>

            <p className="text-xs text-ice-300/80">
              These skills form the common foundation for both roles. Mastering them builds simultaneous progress towards both careers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {comparison.overlappingSkills.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-3.5 rounded-2xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-white">{item.skill.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-ice-400 flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <span>{comparison.careerA.title}: {item.reqA}</span>
                    <span>{comparison.careerB.title}: {item.reqB}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unique Skills Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unique to A */}
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-academic-400" />
                Unique to {comparison.careerA.title} ({comparison.uniqueToA.length})
              </h4>
              <p className="text-xs text-ice-300/70">
                Skills required specifically for {comparison.careerA.title}.
              </p>

              <div className="space-y-2">
                {comparison.uniqueToA.length === 0 ? (
                  <span className="text-xs text-ice-400">None</span>
                ) : (
                  comparison.uniqueToA.map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-card p-3 rounded-xl flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-white">{item.skill.name}</span>
                      <span className="text-ice-400 font-mono">Req: {item.req}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Unique to B */}
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                Unique to {comparison.careerB.title} ({comparison.uniqueToB.length})
              </h4>
              <p className="text-xs text-ice-300/70">
                Skills required specifically for {comparison.careerB.title}.
              </p>

              <div className="space-y-2">
                {comparison.uniqueToB.length === 0 ? (
                  <span className="text-xs text-ice-400">None</span>
                ) : (
                  comparison.uniqueToB.map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-card p-3 rounded-xl flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-white">{item.skill.name}</span>
                      <span className="text-ice-400 font-mono">Req: {item.req}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
