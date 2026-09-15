"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  GitCompare,
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  Compass,
} from "lucide-react";
import CareerComparisonTool from "@/components/CareerComparisonTool";
import { CareerItem } from "@/lib/types";

function CompareContent() {
  const searchParams = useSearchParams();
  const slugAQuery = searchParams.get("slugA") || "data-scientist";
  const slugBQuery = searchParams.get("slugB") || "machine-learning-engineer";

  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCareers() {
      try {
        const res = await fetch("/api/careers");
        if (res.ok) {
          const data = await res.json();
          setCareers(data);
        }
      } catch (err) {
        console.error("Failed to load careers for comparison:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCareers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-academic-400/30 border-t-ice rounded-full animate-spin" />
        <p className="text-sm text-ice-300">Loading career topology comparison matrix...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-academic-500/20 border border-academic-400/30 text-xs font-semibold text-ice">
          <GitCompare className="w-3.5 h-3.5 text-ice" />
          <span>Cross-Career Intelligence Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Career Path Comparison
        </h1>
        <p className="text-sm sm:text-base text-ice-300/80 max-w-2xl">
          Evaluate required skill overlap, unique technical domains, and calculate your personalized transition readiness between any two careers.
        </p>
      </div>

      {/* Comparison Tool */}
      <CareerComparisonTool
        careers={careers}
        defaultSlugA={slugAQuery}
        defaultSlugB={slugBQuery}
      />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-academic-400/30 border-t-ice rounded-full animate-spin" />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
