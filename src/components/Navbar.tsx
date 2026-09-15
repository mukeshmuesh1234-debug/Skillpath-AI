"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  MapPin, 
  BarChart3, 
  Layers, 
  GitCompare, 
  Sparkles, 
  Menu, 
  X, 
  UserCircle2, 
  RefreshCw,
  Award
} from "lucide-react";
import OnboardingModal from "./OnboardingModal";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [studentInfo, setStudentInfo] = useState<{ name: string; targetCareer: string; readiness: number } | null>(null);

  useEffect(() => {
    async function loadStudent() {
      try {
        const res = await fetch("/api/student");
        if (res.ok) {
          const data = await res.json();
          setStudentInfo({
            name: data.name || "Vi",
            targetCareer: data.targetCareer?.title || "Data Scientist",
            readiness: Math.round(data.careerReadiness || 68),
          });
        }
      } catch {
        // Fallback demo info
        setStudentInfo({
          name: "Vi",
          targetCareer: "Data Scientist",
          readiness: 68,
        });
      }
    }
    loadStudent();
  }, [pathname]);

  const handleResetDemo = async () => {
    setIsResetting(true);
    try {
      await fetch("/api/reset-demo", { method: "POST" });
      window.location.reload();
    } catch (err) {
      console.error(err);
      setIsResetting(false);
    }
  };

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Roadmap", href: "/roadmap", icon: MapPin },
    { name: "Career Explorer", href: "/careers", icon: Compass },
    { name: "Compare Careers", href: "/compare", icon: GitCompare },
    { name: "Progress", href: "/progress", icon: Layers },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy-950/75 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-academic-400 via-academic-600 to-navy-900 p-0.5 shadow-glow-blue flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-navy-950/80 rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-ice group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg sm:text-xl tracking-tight text-white">
                    SkillPath <span className="text-academic-300">AI</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-academic-500/20 text-ice-300 border border-ice-300/20">
                    Live
                  </span>
                </div>
                <span className="text-[10px] text-ice-400/80 hidden sm:inline">
                  Know Your Gap. Build Your Path.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-academic-500/25 text-white border border-ice-300/30 shadow-glow-blue"
                        : "text-ice-300/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-ice" : "text-ice-400"}`} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Bar */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Student status pill */}
              {studentInfo && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-academic-900/60 border border-white/10 text-xs hover:border-ice/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-academic-500/40 flex items-center justify-center text-ice font-semibold text-xs border border-ice/30">
                    {studentInfo.name.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-white leading-none">
                      {studentInfo.name}
                    </span>
                    <span className="text-[10px] text-ice-300/70 leading-tight">
                      {studentInfo.targetCareer}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 pl-1 border-l border-white/10 text-emerald-400 font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>{studentInfo.readiness}%</span>
                  </div>
                </Link>
              )}

              {/* Reset Demo Button */}
              <button
                onClick={handleResetDemo}
                disabled={isResetting}
                title="Reset to demo student Vi state"
                className="p-2 rounded-lg glass-button-secondary text-ice-300 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 ${isResetting ? "animate-spin" : ""}`} />
              </button>

              {/* Start Assessment CTA */}
              <button
                onClick={() => setOnboardingOpen(true)}
                className="glass-button-primary flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-ice-300" />
                <span>Assess My Gap</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setOnboardingOpen(true)}
                className="glass-button-primary px-3 py-1.5 rounded-lg text-xs font-semibold"
              >
                Assess
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg glass-button-secondary text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-navy-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-academic-500/30 text-white border border-ice-300/30"
                      : "text-ice-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 text-ice-300" />
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOnboardingOpen(true);
                }}
                className="w-full glass-button-primary flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                <span>Assess My Skills & Build Roadmap</span>
              </button>
              <button
                onClick={handleResetDemo}
                className="w-full glass-button-secondary flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Student Profile</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Multi-Step Onboarding Modal */}
      <OnboardingModal isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
    </>
  );
}
