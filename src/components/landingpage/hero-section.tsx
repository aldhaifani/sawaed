import HeroText from "./hero-text";
import FeatureCards from "./feature-cards";

export default function HeroSection() {
  return (
    <div id="hero" className="container mx-auto flex min-h-screen max-w-7xl flex-1 flex-col items-center justify-evenly gap-8 px-4 py-10 md:flex-row md:gap-12 md:px-8 md:py-20 lg:justify-between">
      <div className="w-full md:w-auto">
        <HeroText />
      </div>
      <div className="flex w-full justify-center pt-8 md:w-auto md:justify-end md:pt-0">
        <FeatureCards />
      </div>
    </div>
  );
}
