import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import KeyFeaturesSection from "@/components/landing/KeyFeaturesSection";
import SkillGapPreviewSection from "@/components/landing/SkillGapPreviewSection";
import RoadmapPreviewSection from "@/components/landing/RoadmapPreviewSection";
import CareerCategoriesSection from "@/components/landing/CareerCategoriesSection";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <KeyFeaturesSection />
      <SkillGapPreviewSection />
      <RoadmapPreviewSection />
      <CareerCategoriesSection />
      <CTASection />
    </div>
  );
}
