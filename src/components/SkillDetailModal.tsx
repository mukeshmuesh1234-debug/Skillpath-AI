"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  BookOpen,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { SkillItem, SkillLevel, PriorityLevel, GapStatus } from "@/lib/types";
import { getStatusBadgeClasses, getPriorityBadgeClasses } from "@/lib/utils";

interface SkillDetailModalProps {
  skill: SkillItem | null;
  currentLevel?: SkillLevel;
  requiredLevel?: SkillLevel;
  status?: GapStatus | string;
  priority?: PriorityLevel | string;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (newStatus: "Not Started" | "Learning" | "Completed") => void;
}

export default function SkillDetailModal({
  skill,
  currentLevel = "Beginner",
  requiredLevel = "Advanced",
  status = "Developing",
  priority = "Critical",
  isOpen,
  onClose,
  onStatusChange,
}: SkillDetailModalProps) {
  const [updating, setUpdating] = useState(false);

  if (!isOpen || !skill) return null;

  const handleUpdate = async (newStatus: "Not Started" | "Learning" | "Completed") => {
    if (onStatusChange) {
      setUpdating(true);
      await onStatusChange(newStatus);
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl my-8 glass-panel rounded-3xl p-6 sm:p-8 border border-ice/20 shadow-glass-lg text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl glass-button-secondary text-ice hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Skill Header */}
        <div className="space-y-3 pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-academic-500/20 text-ice-200 border border-academic-400/30">
              {skill.category}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${getStatusBadgeClasses(status)}`}>
              {status}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${getPriorityBadgeClasses(priority)}`}>
              {priority} Priority
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {skill.name}
          </h2>

          <p className="text-xs sm:text-sm text-ice-300/80 leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Levels & Gap Comparison Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="glass-card p-3.5 rounded-2xl">
            <span className="text-[11px] text-ice-400 font-medium block">Current Level</span>
            <span className="text-sm sm:text-base font-bold text-white mt-1 block">
              {currentLevel}
            </span>
          </div>

          <div className="glass-card p-3.5 rounded-2xl">
            <span className="text-[11px] text-ice-400 font-medium block">Target Level</span>
            <span className="text-sm sm:text-base font-bold text-academic-300 mt-1 block">
              {requiredLevel}
            </span>
          </div>

          <div className="glass-card p-3.5 rounded-2xl">
            <span className="text-[11px] text-ice-400 font-medium block">Est. Time</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="w-4 h-4 text-ice" />
              <span className="text-sm sm:text-base font-bold text-white">
                {skill.estimatedHours} hrs
              </span>
            </div>
          </div>

          <div className="glass-card p-3.5 rounded-2xl">
            <span className="text-[11px] text-ice-400 font-medium block">Difficulty</span>
            <span className="text-sm sm:text-base font-bold text-amber-300 mt-1 block">
              {skill.difficulty}
            </span>
          </div>
        </div>

        {/* Deep Dive Tabs / Content */}
        <div className="space-y-6 max-h-96 overflow-y-auto pr-1">
          {/* Why this skill matters */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-academic-300 font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-ice" />
              <h4>Why This Skill Matters</h4>
            </div>
            <p className="text-xs sm:text-sm text-ice-200/90 leading-relaxed bg-academic-950/40 p-4 rounded-2xl border border-white/5">
              {skill.whyItMatters}
            </p>
          </div>

          {/* Prerequisites */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Layers className="w-4 h-4 text-academic-400" />
              <h4>Prerequisites</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.prerequisites.length > 0 ? (
                skill.prerequisites.map((p, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-ice-200 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {p}
                  </span>
                ))
              ) : (
                <span className="text-xs text-ice-400">None required (Foundational module)</span>
              )}
            </div>
          </div>

          {/* Step-by-Step Learning Path / Modules */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <BookOpen className="w-4 h-4 text-academic-400" />
              <h4>What to Learn (Structured Syllabus)</h4>
            </div>
            <div className="space-y-2">
              {skill.whatToLearn.map((stepItem, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-navy-950/50 border border-white/5 text-xs text-ice-200"
                >
                  <span className="w-5 h-5 rounded-full bg-academic-500/30 text-ice text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-academic-400/30">
                    {idx + 1}
                  </span>
                  <span>{stepItem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Capstone Project */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <FolderGit2 className="w-4 h-4 text-academic-400" />
              <h4>Recommended Hands-on Project</h4>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-academic-950 to-navy-900 border border-academic-400/30">
              <p className="font-semibold text-sm text-white">{skill.recommendedProject}</p>
              <p className="text-xs text-ice-300/80 mt-1">
                Build and push this to GitHub to provide tangible proof of competence to hiring teams.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-ice-400">
            Current Status: <strong className="text-white">{status}</strong>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleUpdate("Learning")}
              disabled={updating}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                status === "Learning"
                  ? "bg-amber-500/30 text-amber-300 border border-amber-400/40"
                  : "glass-button-secondary text-ice hover:text-white"
              }`}
            >
              Mark Learning
            </button>
            <button
              onClick={() => handleUpdate("Completed")}
              disabled={updating}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                status === "Completed"
                  ? "bg-emerald-500 text-navy-950 font-bold shadow-glow-green"
                  : "glass-button-primary text-white"
              }`}
            >
              ✓ Mark Mastered
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
