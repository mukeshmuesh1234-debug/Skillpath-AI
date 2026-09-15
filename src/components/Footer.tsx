"use client";

import React from "react";
import Link from "next/link";
import { Compass, Sparkles, ShieldCheck, Heart, Github, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950/80 backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-academic-400 to-navy-900 p-0.5 flex items-center justify-center shadow-glow-blue">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-ice" />
                </div>
              </div>
              <span className="font-bold text-lg text-white">
                SkillPath <span className="text-academic-300">AI</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ice-300/70 leading-relaxed">
              Google Maps for your career. Discover your exact skill gaps, follow a personalized 5-phase learning roadmap, and accelerate your journey to becoming career-ready.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>AI Gap Engine: Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Platform
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-ice-300/80">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-white transition-colors">
                  Personalized Roadmap
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Career Explorer
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Career Comparison Matrix
                </Link>
              </li>
              <li>
                <Link href="/progress" className="hover:text-white transition-colors">
                  Progress & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Roadmaps */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Career Paths
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-ice-300/80">
              <li>
                <Link href="/careers/data-scientist" className="hover:text-white transition-colors">
                  Data Scientist (Demo)
                </Link>
              </li>
              <li>
                <Link href="/careers/machine-learning-engineer" className="hover:text-white transition-colors">
                  Machine Learning Engineer
                </Link>
              </li>
              <li>
                <Link href="/careers/ai-engineer" className="hover:text-white transition-colors">
                  AI Engineer (Generative AI)
                </Link>
              </li>
              <li>
                <Link href="/careers/full-stack-developer" className="hover:text-white transition-colors">
                  Full Stack Developer
                </Link>
              </li>
              <li>
                <Link href="/careers/data-analyst" className="hover:text-white transition-colors">
                  Data Analyst
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology & GitHub */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Architecture
            </h4>
            <p className="text-xs text-ice-300/70">
              Built with Next.js 15, TypeScript, Tailwind CSS, Prisma ORM, SQLite, Recharts, and Framer Motion.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/mukeshmuesh1234-debug/Skillpath-AI"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass-button-secondary text-xs text-ice hover:text-white"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ice-400/60">
          <p>© {new Date().getFullYear()} SkillPath AI. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Designed for College AI Immersion & Student Career Readiness</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
