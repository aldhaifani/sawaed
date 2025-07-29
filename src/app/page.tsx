"use client";

import LandingNav from "@/components/landing-nav";
import DotGrid from "@/blocks/Backgrounds/DotGrid/DotGrid";
import HeroSection from "@/components/hero-section";

export default function HomePage() {
  return (
    <div className="relative">
      <DotGrid
        dotSize={4}
        gap={24}
        baseColor="#E9E3FF"
        activeColor="#8B5CF6"
        className="absolute inset-0 -z-10"
        style={{ height: "100vh", width: "100%", position: "fixed" }}
      />
      <main className="relative flex min-h-screen flex-col text-black">
        <LandingNav />
        <HeroSection />
      </main>
    </div>
  );
}
