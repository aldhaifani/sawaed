import LandingNav from "@/components/landingpage/landing-nav";
import DotGrid from "@/blocks/Backgrounds/DotGrid/DotGrid";
import HeroSection from "@/components/landingpage/hero-section";
import StickyScrollReveal from "@/components/landingpage/stickyScrollReveal";
import FaqSection from "@/components/landingpage/faq-section";

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
      <section className="quote_1">
        <StickyScrollReveal imageUrl="/sultan_qaboos.png">
          {/* 
          Now you can pass rich JSX directly!
          The component will handle the styling and animation correctly.
        */}
          <p>
            &ldquo;It is the hands of the youth that build the nation&apos;s
            present and shape its future.&rdquo; <br />{" "}
            <i className="text-muted-foreground">
              {" "}
              ~ HH, Sultan Qaboo, may he rest in peace.
            </i>
          </p>
        </StickyScrollReveal>
      </section>
      <section className="quote_2">
        <StickyScrollReveal
          imageUrl="/sultan_haithem.webp"
          backgroundColor="#fafafa" // Custom light background
          textColor="#222" // Custom dark text
          imagePosition="left" // Custom layout
          scrollHeight="250vh" // Custom scroll speed (faster)
        >
          <p>
            &ldquo;Youths are the wealth of nations and their inexhaustible
            resource; they are the very arms that build.&rdquo;
            <br />
            <i className="text-muted-foreground">
              {" "}
              ~ HM, Sultan Haitham, may God protect him.
            </i>
          </p>
        </StickyScrollReveal>
      </section>

      <FaqSection />
    </div>
  );
}
