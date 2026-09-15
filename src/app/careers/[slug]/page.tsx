"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  Clock,
  CheckCircle2,
  GitCompare,
  Target,
} from "lucide-react";
import { CareerItem, SkillItem } from "@/lib/types";
import { getPriorityBadgeClasses } from "@/lib/utils";
import SkillDetailModal from "@/components/SkillDetailModal";
import OnboardingModal from "@/components/OnboardingModal";

export default function CareerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [career, setCareer] = useState<CareerItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  useEffect(() => {
    async function fetchCareer() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/careers/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setCareer(data);
        }
      } catch (err) {
        console.error("Failed to load career:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCareer();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-academic-400/30 border-t-ice rounded-full animate-spin" />
        <p className="text-sm text-ice-300">Loading career curriculum...</p>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Career Profile Not Found</h2>
        <Link href="/careers" className="glass-button-primary px-6 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Career Explorer
        </Link>
      </div>
    );
  }

  // Group skills by phase
  const phases = [1, 2, 3, 4, 5].map((phaseNum) => {
    const items = career.skills.filter((cs) => cs.phase === phaseNum);
    const phaseName = items[0]?.phaseName || `Phase ${phaseNum}`;
    return {
      phase: phaseNum,
      phaseName,
      items,
    };
  }).filter((p) => p.items.length > 0);

  const totalEstHours = career.skills.reduce((sum, cs) => sum + cs.skill.estimatedHours, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ice-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Career Directory
        </Link>
      </div>

      {/* Hero Profile Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border-academic-400/30 relative overflow-hidden space-y-6">
        <div className="liquid-glow w-64 h-64 bg-academic-600 -top-10 -right-10" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-academic-500/20 text-ice border border-academic-400/30">
                {career.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{career.demandLevel} Demand</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {career.title}
            </h1>

            <p className="text-sm sm:text-base text-ice-200/90 leading-relaxed">
              {career.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
            <button
              onClick={() => setOnboardingOpen(true)}
              className="glass-button-primary px-6 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-glow-blue cursor-pointer"
            >
              <Target className="w-4 h-4 text-ice" />
              <span>Assess My Fit for This Role</span>
            </button>

            <Link
              href={`/compare?slugA=${career.slug}`}
              className="glass-button-secondary px-6 py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <GitCompare className="w-4 h-4 text-ice" />
              <span>Compare with Other Roles</span>
            </Link>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <div className="glass-card p-3.5 rounded-2xl">
            <span className="text-[11px] text-ice-400 block font-medium">Avg Salary Range</span>
            <span className="text-base font-bold text-white mt-0.5 block">{career.averageSalary}</span>
          </div>
          <div className="glass-card p-3.5 rounded-2xl">
            <span className="text-[11px] text-ice-400 block font-medium">Total Skills Req.</span>
            <span className="text-base font-bold text-academic-300 mt-0.5 block">{career.skills.length} Skills</span>
          </div>
          <div className="glass-card p-3.5 rounded-2xl">
            <span className="text-[11px] text-ice-400 block font-medium">Est. Track Hours</span>
            <span className="text-base font-bold text-emerald-400 mt-0.5 block">~{totalEstHours} hrs</span>
          </div>
          <div className="glass-card p-3.5 rounded-2xl">
            <span className="text-[11px] text-ice-400 block font-medium">Difficulty Grade</span>
            <span className="text-base font-bold text-amber-300 mt-0.5 block">{career.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Structured Curriculum Breakdown */}
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-academic-300">
            Standard Industry Blueprint
          </span>
          <h2 className="text-2xl font-bold text-white">Full Skill Curriculum & Prerequisites</h2>
        </div>

        <div className="space-y-8">
          {phases.map((p) => (
            <div key={p.phase} className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-academic-500/20 text-ice font-mono font-bold flex items-center justify-center text-xs border border-academic-400/30">
                  0{p.phase}
                </span>
                <h3 className="text-lg font-bold text-white">
                  Phase {p.phase}: {p.phaseName}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {p.items.map((cs) => (
                  <div
                    key={cs.id}
                    onClick={() => setSelectedSkill(cs.skill)}
                    className="glass-card-interactive p-4 rounded-2xl flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] text-ice-400 uppercase font-semibold bg-white/5 px-2 py-0.5 rounded">
                          {cs.skill.category}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${getPriorityBadgeClasses(cs.priority)}`}>
                          {cs.priority}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-ice transition-colors">
                        {cs.skill.name}
                      </h4>
                      <p className="text-xs text-ice-300/70 mt-1 line-clamp-2">
                        {cs.skill.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-ice-400">
                      <span>Req: <strong className="text-white">{cs.requiredLevel}</strong></span>
                      <span className="text-academic-300 font-semibold group-hover:translate-x-1 transition-transform">
                        Details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Skill Modal */}
      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill}
          isOpen={Boolean(selectedSkill)}
          onClose={() => setSelectedSkill(null)}
        />
      )}

      <OnboardingModal isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
    </div>
  );
}
