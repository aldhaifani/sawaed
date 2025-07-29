"use client";

import CardSwap, { Card } from "@/blocks/Components/CardSwap/CardSwap";

export default function FeatureCards() {
  return (
    <div className="mr-8 flex max-w-md flex-1 items-center justify-end">
      <CardSwap
        width={380}
        height={320}
        cardDistance={40}
        verticalDistance={60}
        delay={4000}
        pauseOnHover={true}
      >
        <Card className="h-[320px] w-[380px] border-[#DAE2F8]/50 bg-gradient-to-br from-[#DAE2F8] to-[#D6A4A4] p-8 shadow-xl backdrop-blur-sm">
          <div className="flex h-full flex-col justify-center">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#DAE2F8]/30">
              <svg
                className="h-6 w-6 text-[#274046]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#274046]">
              Showcase Your Talent
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              Create a standout digital portfolio. Add skills, upload projects,
              and let your achievements tell your unique story.
            </p>
          </div>
        </Card>

        <Card className="h-[320px] w-[380px] border-[#9bc5c3]/50 bg-gradient-to-br from-[#616161] to-[#9bc5c3] p-8 shadow-xl backdrop-blur-sm">
          <div className="flex h-full flex-col justify-center">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9bc5c3]/30">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              Get Personalized Guidance
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              Receive AI-powered recommendations to develop the exact skills
              employers need. Your personalized path to career readiness starts
              here.
            </p>
          </div>
        </Card>

        <Card className="h-[320px] w-[380px] border-[#E6DADA]/50 bg-gradient-to-br from-[#E6DADA] to-[#274046] p-8 shadow-xl backdrop-blur-sm">
          <div className="flex h-full flex-col justify-center">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#E6DADA]/30">
              <svg
                className="h-6 w-6 text-[#274046]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#274046]">
              Find Matched Opportunities
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              Discover opportunities perfectly matched to your new skills and
              profile. Jobs, internships, and volunteering—all in one place.
            </p>
          </div>
        </Card>
      </CardSwap>
    </div>
  );
}
