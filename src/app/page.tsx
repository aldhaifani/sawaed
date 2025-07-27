import LandingNav from "@/components/landing-nav";
import InteractiveVideo from "@/components/ui/InteractiveVideo";
import DotGrid from "@/blocks/Backgrounds/DotGrid/DotGrid";

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
      <main className="relative flex min-h-screen flex-col items-center justify-center text-black">
        <LandingNav />
        <div className="container flex flex-col items-center justify-center gap-12 px-16">
          <InteractiveVideo />
          <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-primary">Sawaed</span> <br /> Your companion
            to success.
          </h1>
        </div>
      </main>
    </div>
  );
}
