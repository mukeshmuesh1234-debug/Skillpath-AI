"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Briefcase,
  Layers,
  Clock,
  Award,
  Plus,
  Trash2,
  BrainCircuit,
  Search,
} from "lucide-react";
import { SkillLevel } from "@/lib/types";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EDUCATION_OPTIONS = [
  "1st Year Undergrad",
  "2nd Year Undergrad",
  "3rd Year Undergrad",
  "Final Year Undergrad",
  "Graduate / Master's",
  "Self-Taught / Bootcamp",
];

const DEGREE_OPTIONS = [
  "AI & Data Science",
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Mechanical / Civil",
  "Business & Statistics",
  "Other / Independent",
];

const POPULAR_SKILLS = [
  "Python",
  "SQL",
  "Statistics & Probability",
  "Git & GitHub",
  "NumPy & Pandas",
  "TypeScript & React",
  "Machine Learning",
  "Deep Learning",
  "Docker & Kubernetes",
  "Java",
  "C++",
  "HTML & CSS",
  "Linear Algebra",
  "Power BI / Tableau",
];

const CAREER_OPTIONS = [
  { slug: "data-scientist", title: "Data Scientist", icon: "📊", desc: "Predictive modeling, statistical insights, and business ML" },
  { slug: "machine-learning-engineer", title: "Machine Learning Engineer", icon: "🧠", desc: "Production ML pipelines, high-throughput models, scalable AI" },
  { slug: "ai-engineer", title: "AI Engineer (GenAI & LLMs)", icon: "✨", desc: "RAG architectures, AI agents, foundation model integration" },
  { slug: "full-stack-developer", title: "Full Stack Developer", icon: "💻", desc: "End-to-end web apps, reactive frontends, resilient APIs" },
  { slug: "data-analyst", title: "Data Analyst", icon: "📈", desc: "BI dashboards, data storytelling, SQL warehousing" },
  { slug: "cloud-devops-engineer", title: "Cloud & DevOps Engineer", icon: "☁️", desc: "CI/CD automation, cloud infrastructure, Kubernetes" },
];

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Form State
  const [studentName, setStudentName] = useState("Vi");
  const [education, setEducation] = useState("2nd Year Undergrad");
  const [degree, setDegree] = useState("AI & Data Science");
  const [currentSkills, setCurrentSkills] = useState<{ name: string; level: SkillLevel }[]>([
    { name: "Python", level: "Intermediate" },
    { name: "SQL", level: "Beginner" },
    { name: "Statistics & Probability", level: "Beginner" },
    { name: "Git & GitHub", level: "Beginner" },
  ]);
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [customSkillLevel, setCustomSkillLevel] = useState<SkillLevel>("Beginner");
  const [targetCareerSlug, setTargetCareerSlug] = useState("data-scientist");
  const [customCareer, setCustomCareer] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Intermediate");
  const [weeklyStudyHours, setWeeklyStudyHours] = useState(10);

  if (!isOpen) return null;

  const handleAddSkill = (name: string, level: SkillLevel = "Beginner") => {
    if (!name.trim()) return;
    if (currentSkills.some((s) => s.name.toLowerCase() === name.toLowerCase())) return;
    setCurrentSkills([...currentSkills, { name: name.trim(), level }]);
    setCustomSkillInput("");
  };

  const handleRemoveSkill = (skillName: string) => {
    setCurrentSkills(currentSkills.filter((s) => s.name !== skillName));
  };

  const handleUpdateSkillLevel = (skillName: string, newLevel: SkillLevel) => {
    setCurrentSkills(
      currentSkills.map((s) => (s.name === skillName ? { ...s, level: newLevel } : s))
    );
  };

  const handleSubmit = async () => {
    setStep(7); // Analysis scanning step
    setIsSubmitting(true);

    // Realistic scanning animation ticker
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 15;
      });
    }, 250);

    try {
      const payload = {
        name: studentName,
        education,
        degree,
        targetCareerSlug: customCareer ? "data-scientist" : targetCareerSlug,
        customCareer: customCareer || undefined,
        currentSkills,
        experienceLevel,
        weeklyStudyHours: Number(weeklyStudyHours),
      };

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      clearInterval(interval);
      setAnalysisProgress(100);

      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
        router.push("/dashboard");
        router.refresh();
      }, 700);
    } catch (err) {
      console.error("Onboarding submission failed:", err);
      clearInterval(interval);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 glass-panel rounded-3xl p-6 sm:p-8 border border-ice/20 shadow-glass-lg text-white">
        {/* Close Button */}
        {step !== 7 && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl glass-button-secondary text-ice hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header Progress indicator */}
        {step !== 7 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-ice-300/80 font-medium mb-2">
              <span className="flex items-center gap-1.5 text-academic-300">
                <Sparkles className="w-3.5 h-3.5" /> Step {step} of 6
              </span>
              <span>{Math.round((step / 6) * 100)}% Complete</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-academic-400 to-ice transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step Contents */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-academic-500/20 border border-academic-400/30 flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6 text-ice" />
                </div>
                <h3 className="text-2xl font-bold text-white">What is your current education level?</h3>
                <p className="text-sm text-ice-300/70 mt-1">
                  Tell us where you are in your academic or professional journey.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-ice-200">Your Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Vi"
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EDUCATION_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setEducation(opt)}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                      education === opt
                        ? "bg-academic-500/40 border-academic-300 text-white shadow-glow-blue border"
                        : "glass-card text-ice-200 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {education === opt && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-academic-500/20 border border-academic-400/30 flex items-center justify-center mb-3">
                  <Layers className="w-6 h-6 text-ice" />
                </div>
                <h3 className="text-2xl font-bold text-white">What is your field of study or degree?</h3>
                <p className="text-sm text-ice-300/70 mt-1">
                  Helps our AI align technical prerequisites with your curriculum.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEGREE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setDegree(opt)}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                      degree === opt
                        ? "bg-academic-500/40 border-academic-300 text-white shadow-glow-blue border"
                        : "glass-card text-ice-200 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {degree === opt && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-academic-500/20 border border-academic-400/30 flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-ice" />
                </div>
                <h3 className="text-2xl font-bold text-white">What are your current skills?</h3>
                <p className="text-sm text-ice-300/70 mt-1">
                  Add technologies you have touched, and indicate your proficiency level.
                </p>
              </div>

              {/* Added Skills List */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-ice-200">
                  Selected Skills ({currentSkills.length})
                </label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 rounded-2xl bg-navy-950/60 border border-white/10">
                  {currentSkills.length === 0 ? (
                    <span className="text-xs text-ice-400/60">No skills selected yet. Tap suggestions below!</span>
                  ) : (
                    currentSkills.map((s) => (
                      <div
                        key={s.name}
                        className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-academic-900/80 border border-ice-300/30 text-xs"
                      >
                        <span className="font-semibold text-white">{s.name}</span>
                        <select
                          value={s.level}
                          onChange={(e) => handleUpdateSkillLevel(s.name, e.target.value as SkillLevel)}
                          className="bg-navy-950/80 text-ice-300 text-[10px] rounded px-1.5 py-0.5 border border-white/10 focus:outline-none"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                        <button
                          onClick={() => handleRemoveSkill(s.name)}
                          className="text-ice-400 hover:text-rose-400 ml-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add Custom Skill */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill(customSkillInput, customSkillLevel);
                    }
                  }}
                  placeholder="Type custom skill (e.g. Next.js, PyTorch)..."
                  className="flex-1 glass-input px-3.5 py-2.5 rounded-xl text-xs sm:text-sm"
                />
                <select
                  value={customSkillLevel}
                  onChange={(e) => setCustomSkillLevel(e.target.value as SkillLevel)}
                  className="glass-input px-3 py-2.5 rounded-xl text-xs"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleAddSkill(customSkillInput, customSkillLevel)}
                  className="glass-button-primary px-3 py-2.5 rounded-xl text-xs flex items-center gap-1 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {/* Popular Suggestions */}
              <div>
                <span className="text-xs font-semibold text-ice-300/80 mb-2 block">
                  Quick Add Suggestions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SKILLS.map((skillName) => {
                    const isAdded = currentSkills.some(
                      (s) => s.name.toLowerCase() === skillName.toLowerCase()
                    );
                    return (
                      <button
                        key={skillName}
                        type="button"
                        onClick={() =>
                          isAdded
                            ? handleRemoveSkill(skillName)
                            : handleAddSkill(skillName, "Beginner")
                        }
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                          isAdded
                            ? "bg-academic-500/30 text-white border-academic-300 font-medium"
                            : "glass-badge text-ice-300/80 hover:text-white hover:border-ice/40"
                        }`}
                      >
                        {isAdded ? `✓ ${skillName}` : `+ ${skillName}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-academic-500/20 border border-academic-400/30 flex items-center justify-center mb-3">
                  <Briefcase className="w-6 h-6 text-ice" />
                </div>
                <h3 className="text-2xl font-bold text-white">What is your dream target career?</h3>
                <p className="text-sm text-ice-300/70 mt-1">
                  Select a standardized track or specify a custom role.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {CAREER_OPTIONS.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => {
                      setTargetCareerSlug(c.slug);
                      setCustomCareer("");
                    }}
                    className={`p-4 rounded-xl text-left transition-all ${
                      targetCareerSlug === c.slug && !customCareer
                        ? "bg-academic-500/40 border-academic-300 text-white shadow-glow-blue border"
                        : "glass-card text-ice-200 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{c.icon}</span>
                      <span className="font-semibold text-sm text-white">{c.title}</span>
                    </div>
                    <p className="text-[11px] text-ice-300/70 line-clamp-2">{c.desc}</p>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10">
                <label className="text-xs font-semibold text-ice-200 mb-1 block">
                  Or specify a Custom Career Role
                </label>
                <input
                  type="text"
                  value={customCareer}
                  onChange={(e) => setCustomCareer(e.target.value)}
                  placeholder="e.g. Quantitative Risk Analyst, Robotics Software Engineer..."
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-xs sm:text-sm"
                />
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-academic-500/20 border border-academic-400/30 flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-ice" />
                </div>
                <h3 className="text-2xl font-bold text-white">What is your general technical experience?</h3>
                <p className="text-sm text-ice-300/70 mt-1">
                  Calibrates the ramp-up velocity and difficulty grading of roadmap modules.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    level: "Beginner",
                    title: "Beginner (0-1 years)",
                    desc: "Starting fresh with fundamentals; learning logic and core syntax.",
                  },
                  {
                    level: "Intermediate",
                    title: "Intermediate (1-3 years)",
                    desc: "Comfortable building basic projects, writing queries, and following tutorials.",
                  },
                  {
                    level: "Advanced",
                    title: "Advanced (3+ years)",
                    desc: "Experienced with system architectures, algorithms, and deployed production code.",
                  },
                ].map((item) => (
                  <button
                    key={item.level}
                    onClick={() => setExperienceLevel(item.level)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      experienceLevel === item.level
                        ? "bg-academic-500/40 border-academic-300 text-white shadow-glow-blue border"
                        : "glass-card text-ice-200 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-white">{item.title}</span>
                      {experienceLevel === item.level && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <p className="text-xs text-ice-300/70">{item.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-academic-500/20 border border-academic-400/30 flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-ice" />
                </div>
                <h3 className="text-2xl font-bold text-white">How much study time can you commit?</h3>
                <p className="text-sm text-ice-300/70 mt-1">
                  We schedule roadmap phases and weekly milestones to fit your calendar.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { hours: 5, label: "5 hours/week", sub: "Casual pace (~1 hr/day)" },
                  { hours: 10, label: "10 hours/week", sub: "Standard college sprint (~1.5 hrs/day)" },
                  { hours: 15, label: "15 hours/week", sub: "Accelerated track (~2 hrs/day)" },
                  { hours: 20, label: "20+ hours/week", sub: "Full-immersion bootcamp" },
                ].map((item) => (
                  <button
                    key={item.hours}
                    onClick={() => setWeeklyStudyHours(item.hours)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      weeklyStudyHours === item.hours
                        ? "bg-academic-500/40 border-academic-300 text-white shadow-glow-blue border"
                        : "glass-card text-ice-200 hover:border-white/20"
                    }`}
                  >
                    <span className="font-bold text-base text-white block">{item.label}</span>
                    <span className="text-[11px] text-ice-300/70 mt-0.5 block">{item.sub}</span>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-academic-950/60 border border-academic-500/20 flex items-center gap-3">
                <BrainCircuit className="w-6 h-6 text-ice flex-shrink-0" />
                <p className="text-xs text-ice-200">
                  Ready! Next, our AI will cross-reference your {currentSkills.length} skills against the standard requirements for{" "}
                  <strong className="text-white font-semibold">
                    {customCareer || CAREER_OPTIONS.find((c) => c.slug === targetCareerSlug)?.title}
                  </strong>
                  .
                </p>
              </div>
            </motion.div>
          )}

          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-academic-500/20 animate-spin border-t-academic-300" />
                <BrainCircuit className="w-10 h-10 text-ice animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">AI Skill Gap Engine Active</h3>
                <p className="text-sm text-ice-300/80 max-w-md">
                  Analyzing skill dependencies, calculating Career Readiness Score, and compiling your personalized 5-phase roadmap...
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-sm space-y-1.5">
                <div className="flex justify-between text-xs text-ice-400 font-mono">
                  <span>Synthesizing roadmap...</span>
                  <span>{analysisProgress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-academic-400 via-ice to-emerald-400 transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls */}
        {step !== 7 && (
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="glass-button-secondary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="glass-button-primary px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="glass-button-primary px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 bg-gradient-to-r from-academic-500 to-academic-700 shadow-glow-blue"
              >
                <Sparkles className="w-4 h-4 text-ice" />
                <span>Generate My Skill Path</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
