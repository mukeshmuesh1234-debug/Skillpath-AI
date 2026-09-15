"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  Search,
  Filter,
  Sparkles,
  GitCompare,
  TrendingUp,
  Layers,
  ArrowRight,
} from "lucide-react";
import CareerCard from "@/components/CareerCard";
import { CareerItem } from "@/lib/types";

export default function CareersPage() {
  const router = useRouter();
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    async function fetchCareers() {
      try {
        const res = await fetch("/api/careers");
        if (res.ok) {
          const data = await res.json();
          setCareers(data);
        }
      } catch (err) {
        console.error("Failed to load careers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCareers();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(careers.map((c) => c.category));
    return ["All", ...Array.from(set)];
  }, [careers]);

  const filteredCareers = useMemo(() => {
    return careers.filter((c) => {
      const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some((s) => s.skill.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [careers, selectedCategory, searchQuery]);

  const handleSelectForComparison = (slug: string) => {
    router.push(`/compare?slugA=${slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Top Banner */}
      <div className="space-y-3 pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-500/20 border border-academic-400/30 text-xs font-semibold text-ice">
          <Compass className="w-3.5 h-3.5 text-ice" />
          <span>Industry Career Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Career Explorer
        </h1>
        <p className="text-sm sm:text-base text-ice-300/80 max-w-2xl">
          Browse verified role definitions, skill prerequisites, salary benchmarks, and live market demands across high-growth tech domains.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-navy-950/60 border border-white/10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-academic-500/40 text-white border border-ice/30 shadow-glow-blue"
                  : "text-ice-300/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-ice-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search role or skill (e.g. PyTorch)..."
            className="w-full glass-input pl-9 pr-4 py-2.5 rounded-xl text-xs text-white placeholder:text-ice-400/50"
          />
        </div>
      </div>

      {/* Grid of Careers */}
      {loading ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
          <div className="w-10 h-10 border-4 border-academic-400/30 border-t-ice rounded-full animate-spin" />
          <p className="text-sm text-ice-300">Loading career profiles...</p>
        </div>
      ) : filteredCareers.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
          <p className="text-sm text-ice-300">No career paths matched your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="glass-button-secondary px-4 py-2 rounded-xl text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              onSelectForComparison={handleSelectForComparison}
            />
          ))}
        </div>
      )}
    </div>
  );
}
