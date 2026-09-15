"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ChevronDown,
  ArrowDown,
  Lock,
  PlayCircle,
  Award,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { RoadmapData, RoadmapNodeItem, RoadmapItemStatus, SkillItem } from "@/lib/types";
import { getStatusBadgeClasses, getPriorityBadgeClasses } from "@/lib/utils";
import SkillDetailModal from "./SkillDetailModal";

interface VisualRoadmapProps {
  roadmap: RoadmapData | null;
  onUpdateStatus?: (itemId: string, newStatus: RoadmapItemStatus) => Promise<void>;
}

export default function VisualRoadmap({
  roadmap,
  onUpdateStatus,
}: VisualRoadmapProps) {
  const [selectedSkill, setSelectedSkill] = useState<{
    skill: SkillItem;
    status: RoadmapItemStatus;
    priority: string;
    itemId: string;
  } | null>(null);

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  if (!roadmap || !roadmap.items.length) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center space-y-4">
        <Layers className="w-12 h-12 text-ice-300 mx-auto" />
        <h3 className="text-xl font-bold text-white">No Roadmap Generated Yet</h3>
        <p className="text-sm text-ice-300/80 max-w-md mx-auto">
          Complete the skill assessment wizard to generate your personalized 5-phase career roadmap.
        </p>
      </div>
    );
  }

  // Group items by phase
  const phases = [1, 2, 3, 4, 5].map((phaseNum) => {
    const items = roadmap.items.filter((item) => item.phase === phaseNum);
    const phaseName = items[0]?.phaseName || `Phase ${phaseNum}`;
    const completedInPhase = items.filter((i) => i.status === "Completed").length;
    const isCompleted = items.length > 0 && completedInPhase === items.length;
    const isInProgress = items.some((i) => i.status === "Learning");

    return {
      phase: phaseNum,
      title: phaseName,
      items,
      completedCount: completedInPhase,
      totalCount: items.length,
      isCompleted,
      isInProgress,
    };
  }).filter((p) => p.items.length > 0);

  const handleStatusToggle = async (
    e: React.MouseEvent,
    itemId: string,
    currentStatus: RoadmapItemStatus
  ) => {
    e.stopPropagation();
    if (!onUpdateStatus) return;

    let nextStatus: RoadmapItemStatus = "Learning";
    if (currentStatus === "Not Started") nextStatus = "Learning";
    else if (currentStatus === "Learning") nextStatus = "Completed";
    else nextStatus = "Not Started";

    setUpdatingId(itemId);
    try {
      await onUpdateStatus(itemId, nextStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-12">
      {/* Roadmap Header Stats */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-white/10">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs uppercase font-bold tracking-wider text-academic-300">
            Personalized Career Trajectory
          </span>
          <h3 className="text-2xl font-bold text-white">{roadmap.title}</h3>
          <p className="text-xs sm:text-sm text-ice-300/80">
            Structured step-by-step curriculum with progressive difficulty gates.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-3 rounded-2xl text-center">
            <span className="text-[11px] text-ice-400 block font-medium">Completed</span>
            <span className="text-lg font-bold text-emerald-400">
              {roadmap.completedHours} hrs
            </span>
          </div>
          <div className="glass-card px-4 py-3 rounded-2xl text-center">
            <span className="text-[11px] text-ice-400 block font-medium">Total Track</span>
            <span className="text-lg font-bold text-white">{roadmap.totalHours} hrs</span>
          </div>
        </div>
      </div>

      {/* 5-Phase Interactive Visual Timeline */}
      <div className="relative space-y-10">
        {phases.map((phase, idx) => (
          <div key={phase.phase} className="relative">
            {/* Connecting Vertical Line */}
            {idx < phases.length - 1 && (
              <div className="hidden sm:block absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-academic-400 via-academic-600 to-navy-800 -z-0" />
            )}

            {/* Phase Header */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 sm:w-16 h-12 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-base sm:text-lg border z-10 ${
                  phase.isCompleted
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40 shadow-glow-green"
                    : phase.isInProgress
                    ? "bg-academic-500/30 text-white border-academic-300 shadow-glow-blue"
                    : "bg-navy-950/80 text-ice-400 border-white/10"
                }`}
              >
                {phase.isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : (
                  <span>0{phase.phase}</span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-ice-400">
                    Phase {phase.phase}
                  </span>
                  {phase.isCompleted && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      Mastered
                    </span>
                  )}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">{phase.title}</h4>
              </div>

              <div className="ml-auto text-xs text-ice-400 hidden sm:block">
                {phase.completedCount} / {phase.totalCount} Skills Completed
              </div>
            </div>

            {/* Phase Skills Grid */}
            <div className="sm:ml-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {phase.items.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3 }}
                  onClick={() =>
                    setSelectedSkill({
                      skill: item.skill,
                      status: item.status,
                      priority: item.priority,
                      itemId: item.id,
                    })
                  }
                  className="glass-card-interactive p-5 rounded-2xl flex flex-col justify-between cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-semibold text-ice-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {item.skill.difficulty}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${getStatusBadgeClasses(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h5 className="text-base font-bold text-white group-hover:text-ice transition-colors">
                      {item.skill.name}
                    </h5>

                    <p className="text-xs text-ice-300/70 line-clamp-2">
                      {item.skill.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-ice-400">
                      <Clock className="w-3.5 h-3.5 text-ice-400" />
                      {item.estimatedHours} hrs
                    </span>

                    {/* Status Advance Button */}
                    <button
                      type="button"
                      onClick={(e) => handleStatusToggle(e, item.id, item.status)}
                      disabled={updatingId === item.id}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        item.status === "Completed"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                          : item.status === "Learning"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                          : "glass-button-secondary text-ice hover:text-white"
                      }`}
                    >
                      {item.status === "Completed" ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </>
                      ) : item.status === "Learning" ? (
                        <>
                          <PlayCircle className="w-3.5 h-3.5" /> In Progress
                        </>
                      ) : (
                        <span>Start Learning</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Skill Modal */}
      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill.skill}
          status={selectedSkill.status}
          priority={selectedSkill.priority}
          isOpen={Boolean(selectedSkill)}
          onClose={() => setSelectedSkill(null)}
          onStatusChange={async (newStatus) => {
            if (onUpdateStatus) {
              await onUpdateStatus(selectedSkill.itemId, newStatus);
            }
            setSelectedSkill(null);
          }}
        />
      )}
    </div>
  );
}
