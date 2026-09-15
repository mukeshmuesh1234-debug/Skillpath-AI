"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Layers,
  Cloud,
  Shield,
  BarChart3,
  Cpu,
} from "lucide-react";

export default function CareerCategoriesSection() {
  const categories = [
    {
      title: "Data Science & AI",
      count: "3 Tracks",
      desc: "Data Scientist, ML Engineer, Generative AI Specialist",
      icon: BrainCircuit,
      popular: ["Python", "SQL", "Statistics", "PyTorch", "LangChain"],
      link: "/careers/data-scientist",
    },
    {
      title: "Software Engineering",
      count: "2 Tracks",
      desc: "Full Stack Developer, Backend Specialist",
      icon: Layers,
      popular: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker"],
      link: "/careers/full-stack-developer",
    },
    {
      title: "Data Analytics & BI",
      count: "2 Tracks",
      desc: "Data Analyst, Business Intelligence Engineer",
      icon: BarChart3,
      popular: ["SQL", "Tableau", "Power BI", "Pandas", "EDA"],
      link: "/careers/data-analyst",
    },
    {
      title: "Cloud & DevOps",
      count: "2 Tracks",
      desc: "Cloud Engineer, Site Reliability Engineer",
      icon: Cloud,
      popular: ["Docker", "Kubernetes", "Linux", "CI/CD", "AWS/GCP"],
      link: "/careers/cloud-devops-engineer",
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-navy-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-academic-300">
              High-Demand Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Career Tracks
            </h2>
            <p className="text-sm sm:text-base text-ice-300/80 max-w-xl">
              Compare verified skill requirements and salaries across today's most lucrative technical career domains.
            </p>
          </div>

          <Link
            href="/careers"
            className="glass-button-secondary px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap self-start sm:self-auto"
          >
            <span>View All Tracks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="glass-card p-6 rounded-3xl flex flex-col justify-between hover:border-academic-400/40 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-academic-500/20 border border-academic-400/30 flex items-center justify-center text-ice group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-ice-300">
                      {cat.count}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-ice transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-ice-300/70 mt-1">{cat.desc}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-ice-400 block mb-1.5">
                      Key Required Skills:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.popular.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-ice-200 border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10">
                  <Link
                    href={cat.link}
                    className="text-xs font-semibold text-academic-300 group-hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inspect Track</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
