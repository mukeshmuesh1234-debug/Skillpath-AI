import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AICareerChatModal from "@/components/AICareerChatModal";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SkillPath AI – Know Your Gap. Build Your Path.",
  description: "AI-Powered Student Skill Gap Detection and Career Roadmap Intelligence Platform. Discover missing skills, compare careers, and track your readiness journey.",
  keywords: ["career roadmap", "skill gap detection", "AI career advisor", "data scientist roadmap", "student career intelligence"],
  authors: [{ name: "SkillPath AI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col antialiased selection:bg-academic-500 selection:text-white">
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <AICareerChatModal />
      </body>
    </html>
  );
}
