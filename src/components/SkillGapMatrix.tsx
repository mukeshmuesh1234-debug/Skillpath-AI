"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { SkillGapItem, SkillItem, GapStatus } from "@/lib/types";
import { getStatusBadgeClasses, getPriorityBadgeClasses } from "@/lib/utils";
import SkillDetailModal from "./SkillDetailModal";

interface SkillGapMatrixProps {
  skillGaps: SkillGapItem[];
  onSkillStatusUpdate?: (skillId: string, newStatus: "Not Started" | "Learning" | "Completed") => void;
}

export default function SkillGapMatrix({
  skillGaps,
  onSkillStatusUpdate,
}: SkillGapMatrixProps) {
  const [filter, setFilter] = useState<"All" | "Strong" | "Developing" | "Missing">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGap, setSelectedGap] = useState<SkillGapItem | null>(null);

  const filteredGaps = useMemo(() => {
    return skillGaps.filter((gap) => {
      const matchesFilter = filter === "All" || gap.status === filter;
      const matchesSearch =
        gap.skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gap.skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [skillGaps, filter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: skillGaps.length,
      strong: skillGaps.filter((g) => g.status === "Strong").length,
      developing: skillGaps.filter((g) => g.status === "Developing").length,
      missing: skillGaps.filter((g) => g.status === "Missing").length,
    };
  }, [skillGaps]);

  const getStatusIcon = (status: GapStatus) => {
    switch (status) {
      case "Strong":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "Developing":
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case "Missing":
      default:
        return <XCircle className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header controls & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-navy-950/60 border border-white/10 overflow-x-auto">
          {[
            { key: "All", label: `All (${counts.all})` },
            { key: "Strong", label: `Strong (${counts.strong})`, color: "text-emerald-300" },
            { key: "Developing", label: `Developing (${counts.developing})`, color: "text-amber-300" },
            { key: "Missing", label: `Missing (${counts.missing})`, color: "text-rose-300" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filter === tab.key
                  ? "bg-academic-500/40 text-white border border-ice/30 shadow-glow-blue"
                  : "text-ice-300/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className={filter === tab.key ? "text-white" : tab.color}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-ice-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by skill or category..."
            className="w-full glass-input pl-9 pr-4 py-2 rounded-xl text-xs text-white placeholder:text-ice-400/50"
          />
        </div>
      </div>

      {/* Grid of Skill Gap Cards */}
      {filteredGaps.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center space-y-3">
          <p className="text-sm text-ice-300">No skills match the current filter or search query.</p>
          <button
            onClick={() => {
              setFilter("All");
              setSearchQuery("");
            }}
            className="glass-button-secondary px-4 py-2 rounded-xl text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGaps.map((gap) => (
            <motion.div
              key={gap.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setSelectedGap(gap)}
              className="glass-card-interactive p-5 rounded-2xl flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Header badges */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-ice-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    {gap.skill.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold flex items-center gap-1 ${getStatusBadgeClasses(
                        gap.status
                      )}`}
                    >
                      {getStatusIcon(gap.status)}
                      {gap.status}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${getPriorityBadgeClasses(
                        gap.priority
                      )}`}
                    >
                      {gap.priority}
                    </span>
                  </div>
                </div>

                {/* Skill Title */}
                <h4 className="text-base font-bold text-white group-hover:text-ice transition-colors">
                  {gap.skill.name}
                </h4>

                <p className="text-xs text-ice-300/70 mt-1 line-clamp-2">
                  {gap.skill.description}
                </p>
              </div>

              {/* Skill Levels Matrix */}
              <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ice-400">Current:</span>
                  <span className="font-semibold text-white">
                    {gap.currentLevel === "None" ? "Not Started" : gap.currentLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-ice-400">Required:</span>
                  <span className="font-semibold text-academic-300">
                    {gap.requiredLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-ice-400">
                  <span className="flex items-center gap-1 text-ice-300">
                    <Clock className="w-3.5 h-3.5 text-ice-400" />
                    ~{gap.skill.estimatedHours} hrs
                  </span>
                  <span className="flex items-center gap-1 text-academic-300 font-semibold group-hover:translate-x-1 transition-transform">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedGap && (
        <SkillDetailModal
          skill={selectedGap.skill}
          currentLevel={selectedGap.currentLevel}
          requiredLevel={selectedGap.requiredLevel}
          status={selectedGap.status}
          priority={selectedGap.priority}
          isOpen={Boolean(selectedGap)}
          onClose={() => setSelectedGap(null)}
          onStatusChange={(newStatus) => {
            if (onSkillStatusUpdate) {
              onSkillStatusUpdate(selectedGap.skillId, newStatus);
            }
            setSelectedGap(null);
          }}
        />
      )}
    </div>
  );
}
