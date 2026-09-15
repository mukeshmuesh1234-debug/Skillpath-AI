# SkillPath AI
### *Know Your Gap. Build Your Path.*

SkillPath AI is an AI-powered Student Skill Gap Detection and Career Roadmap Platform — designed to function like **"Google Maps for a student's career"**.

---

## 🌟 The Problem & The Solution

- **The Problem:** Students often want high-impact careers (e.g., Data Scientist, ML Engineer, Full Stack Developer) but learn random technologies without knowing what skills are truly required, which skills they already possess, or how to reach job readiness systematically.
- **The Solution:** SkillPath AI analyzes a student's current competencies against verified employer requirements, calculates a **Career Readiness Score (0-100%)**, generates an interactive **5-Phase Chronological Roadmap**, and provides continuous AI recommendations on **"What Should I Learn Next?"**.

---

## 🚀 Key Features

1. **Student Onboarding & Skill Assessment (6 Steps):**
   - Education level (1st Year to Graduate)
   - Field of study & degree
   - Tag-based current skills selector with proficiency grading (Beginner, Intermediate, Advanced)
   - Target career selection or custom role
   - Technical experience level & committed study hours per week
   - Animated AI Gap Detection engine

2. **AI Skill Gap Detection Matrix:**
   - **Strong (Green):** Mastered skills meeting or exceeding industry requirements
   - **Developing (Yellow):** Foundational skills requiring depth upgrades
   - **Missing (Red):** Critical gap areas required for the role
   - Priority rating (Critical, High, Medium, Low) and prerequisite dependency checking

3. **Career Readiness Score Meter:**
   - Animated SVG circular gauge benchmarking user progress against employer job specs
   - Growth delta tracking (+26% from baseline) and celebration milestones

4. **Personalized 5-Phase Roadmap:**
   - **Phase 1: Foundations** (Programming, Databases, Math/Statistics)
   - **Phase 2: Core Domain** (Data manipulation, EDA, Storytelling)
   - **Phase 3: Machine Learning** (Supervised/Unsupervised modeling, Feature engineering)
   - **Phase 4: Advanced AI** (Deep Learning, NLP, Generative AI & LLMs)
   - **Phase 5: Career Ready** (Model deployment, MLOps, Capstone project, Interview prep)
   - Interactive status toggles (*Not Started* → *Learning* → *Completed*) with instant recalculation of hours and readiness score

5. **"What Should I Learn Next?" & Weekly Focus Sprint:**
   - Recommends the highest-ROI unblocked skill with detailed reasoning
   - Interactive weekly sprint checklist

6. **Career Explorer & Deep Curriculum Breakdowns:**
   - Browse high-demand technical careers (Data Scientist, ML Engineer, AI Engineer, Full Stack Developer, Data Analyst, Cloud & DevOps Engineer)
   - Salary benchmarks, demand index, difficulty ratings, and required modules

7. **Side-by-Side Career Comparison Tool:**
   - Compare any two career tracks (e.g., *Data Scientist vs ML Engineer*)
   - Shared skill overlap matrix, unique requirements to each role, and AI transition advice

8. **Progress Analytics & Historical Velocity:**
   - Interactive Recharts line graph tracking Career Readiness Growth over time
   - Radar chart showing 5-domain skill topology (Programming, Math & Stats, ML & AI, Data Engineering, DevOps)
   - Chronological milestone activity log

9. **AI Career Mentor (Floating Dialog):**
   - Profile-grounded conversational mentor for interview prep, capstone advice, and resume optimization

---

## 🎨 Visual Design Language

- **Liquid Glass / Glassmorphism:** Translucent glass cards, backdrop blurs (`backdrop-blur-xl`), soft glow shadows, and smooth micro-animations.
- **Color Palette:**
  - **Deep Navy:** `#0C1446`
  - **Academic Blue:** `#2B5C92`
  - **Soft Ice Blue:** `#B3CDE0`
  - **White:** `#FFFFFF`

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, Lucide React icons, Framer Motion
- **Visualizations:** Recharts, Canvas Confetti
- **Backend & Database:** Next.js Route Handlers, Prisma ORM, SQLite
- **AI Layer:** Deterministic fallback intelligence engine with optional external LLM API support

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/mukeshmuesh1234-debug/Skillpath-AI.git
cd Skillpath-AI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Initialize & Seed Database
```bash
npx prisma db push
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Demo Student Profile

The platform comes pre-seeded with **Vi**, a 2nd-year B.Tech student in AI & Data Science aiming for a Data Scientist role:
- **Current Skills:** Python (Intermediate), SQL (Beginner), Statistics & Probability (Beginner), Git (Beginner)
- **Target Role:** Data Scientist
- **Baseline Readiness:** 42% → **Current Readiness:** 68%
- **Weekly Commitment:** 10 hours/week

You can reset the demo student state at any time via the **Reset Demo** button in the navigation bar.

---

## 📄 License
MIT License. Built for student career readiness and AI Immersion evaluations.
