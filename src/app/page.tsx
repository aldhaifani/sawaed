"use client";

import LandingNav from "@/components/landingpage/landing-nav";
import DotGrid from "@/blocks/Backgrounds/DotGrid/DotGrid";
import HeroSection from "@/components/landingpage/hero-section";
import StickyScrollReveal from "@/components/landingpage/stickyScrollReveal";
import FaqSection from "@/components/landingpage/faq-section";
import { useI18n } from "@/providers/i18n-provider";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

export default function HomePage() {
  const { t } = useI18n();
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
      <section className="quote_1">
        <StickyScrollReveal imageUrl="/sultan_qaboos.png">
          {/* 
          Now you can pass rich JSX directly!
          The component will handle the styling and animation correctly.
        */}
          <p>
            &ldquo;{t("quotes.q1")}&rdquo;
            <br />
            <i className="text-muted-foreground">{t("quotes.q1Author")}</i>
          </p>
        </StickyScrollReveal>
      </section>
      <section className="quote_2">
        <StickyScrollReveal
          imageUrl="/sultan_haithem.jpeg"
          backgroundColor="#fafafa" // Custom light background
          textColor="#222" // Custom dark text
          imagePosition="left" // Custom layout
          scrollHeight="320vh" // Custom scroll speed (faster)
        >
          <p>
            &ldquo;{t("quotes.q2")}&rdquo;
            <br />
            <i className="text-muted-foreground">{t("quotes.q2Author")}</i>
          </p>
        </StickyScrollReveal>
      </section>

      <FaqSection />
      {/* Floating language switcher */}
      <LanguageSwitcher />
    </div>
  );
}
