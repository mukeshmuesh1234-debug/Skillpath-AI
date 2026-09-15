"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  GitCompare,
  CheckCircle2,
} from "lucide-react";
import { CareerItem } from "@/lib/types";

interface CareerCardProps {
  career: CareerItem;
  userReadinessScore?: number;
  isCurrentTarget?: boolean;
  onSelectForComparison?: (slug: string) => void;
  onSetAsTarget?: (slug: string) => void;
}

export default function CareerCard({
  career,
  userReadinessScore = 65,
  isCurrentTarget = false,
  onSelectForComparison,
  onSetAsTarget,
}: CareerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`glass-card p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden transition-all ${
        isCurrentTarget
          ? "border-academic-400/50 bg-academic-950/40 shadow-glow-blue"
          : "hover:border-ice/30"
      }`}
    >
      <div className="space-y-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-ice bg-academic-500/20 px-2.5 py-1 rounded-full border border-academic-400/30">
            {career.category}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <TrendingUp className="w-3 h-3" />
            <span>{career.demandLevel} Demand</span>
          </div>
        </div>

        {/* Title and description */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white group-hover:text-ice transition-colors">
              {career.title}
            </h3>
            {isCurrentTarget && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-academic-500/30 text-ice-200 border border-ice/30 font-bold">
                Active Goal
              </span>
            )}
          </div>
          <p className="text-xs text-ice-300/80 mt-1.5 line-clamp-2 leading-relaxed">
            {career.description}
          </p>
        </div>

        {/* Career Stats Pills */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-navy-950/60 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-ice-400 font-medium block">Avg. Salary</span>
            <span className="font-semibold text-white mt-0.5 block">{career.averageSalary}</span>
          </div>
          <div className="bg-navy-950/60 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-ice-400 font-medium block">Difficulty</span>
            <span className="font-semibold text-amber-300 mt-0.5 block">{career.difficulty}</span>
          </div>
        </div>

        {/* Core Required Skills */}
        <div>
          <span className="text-[11px] font-semibold text-ice-400 uppercase tracking-wider block mb-2">
            Top Required Skills:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {career.skills.slice(0, 5).map((cs) => (
              <span
                key={cs.id}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-ice-200"
              >
                {cs.skill.name}
              </span>
            ))}
            {career.skills.length > 5 && (
              <span className="text-[11px] px-2 py-1 rounded-lg bg-academic-500/10 text-ice-400">
                +{career.skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
        <Link
          href={`/careers/${career.slug}`}
          className="flex-1 glass-button-primary py-2.5 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5"
        >
          <span>View Requirements</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {onSelectForComparison && (
          <button
            type="button"
            onClick={() => onSelectForComparison(career.slug)}
            title="Compare with another career"
            className="p-2.5 rounded-xl glass-button-secondary text-ice hover:text-white"
          >
            <GitCompare className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
