import HeroText from "./hero-text";
import FeatureCards from "./feature-cards";

export default function HeroSection() {
  return (
    <div className="container mx-auto flex flex-1 items-center justify-between gap-12 px-8 py-20 max-w-7xl min-h-screen">
      <HeroText />
      <FeatureCards />
    </div>
  );
}
