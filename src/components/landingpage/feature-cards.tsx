"use client";

import CardSwap, { Card } from "@/blocks/Components/CardSwap/CardSwap";
import { useI18n } from "@/providers/i18n-provider";
import { useEffect, useState } from "react";

interface CardSizes {
  readonly width: number;
  readonly height: number;
  readonly cardDistance: number;
  readonly verticalDistance: number;
}

function getResponsiveSizes(viewportWidth: number): CardSizes {
  if (viewportWidth < 360) {
    return { width: 280, height: 200, cardDistance: 24, verticalDistance: 36 } as const;
  }
  if (viewportWidth < 480) {
    return { width: 320, height: 220, cardDistance: 28, verticalDistance: 44 } as const;
  }
  if (viewportWidth < 768) {
    return { width: 360, height: 260, cardDistance: 32, verticalDistance: 52 } as const;
  }
  if (viewportWidth < 1024) {
    return { width: 380, height: 300, cardDistance: 36, verticalDistance: 56 } as const;
  }
  return { width: 380, height: 320, cardDistance: 40, verticalDistance: 60 } as const;
}

export default function FeatureCards() {
  const { t } = useI18n();
  const [sizes, setSizes] = useState<CardSizes>(() => getResponsiveSizes(typeof window !== "undefined" ? window.innerWidth : 1024));

  useEffect(() => {
    const onResize = (): void => setSizes(getResponsiveSizes(window.innerWidth));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <div className="mx-0 flex w-full flex-1 items-center justify-center px-0 sm:px-2 md:mx-0 md:mr-8 md:max-w-md md:justify-end">
      <CardSwap
        width={sizes.width}
        height={sizes.height}
        cardDistance={sizes.cardDistance}
        verticalDistance={sizes.verticalDistance}
        delay={4000}
        pauseOnHover={true}
      >
        <Card
          className="border-[#DAE2F8]/50 bg-gradient-to-br from-[#DAE2F8] to-[#D6A4A4] p-6 sm:p-8 shadow-xl backdrop-blur-sm"
          style={{ height: sizes.height, width: sizes.width }}
        >
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
            <h3 className="mb-4 text-2xl font-bold text-[#274046]">{t("features.showcaseTitle")}</h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              {t("features.showcaseDesc")}
            </p>
          </div>
        </Card>

        <Card
          className="border-[#9bc5c3]/50 bg-gradient-to-br from-[#616161] to-[#9bc5c3] p-6 sm:p-8 shadow-xl backdrop-blur-sm"
          style={{ height: sizes.height, width: sizes.width }}
        >
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
            <h3 className="mb-4 text-2xl font-bold text-white">{t("features.guidanceTitle")}</h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              {t("features.guidanceDesc")}
            </p>
          </div>
        </Card>

        <Card
          className="border-[#E6DADA]/50 bg-gradient-to-br from-[#E6DADA] to-[#274046] p-6 sm:p-8 shadow-xl backdrop-blur-sm"
          style={{ height: sizes.height, width: sizes.width }}
        >
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
            <h3 className="mb-4 text-2xl font-bold text-[#274046]">{t("features.matchedTitle")}</h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              {t("features.matchedDesc")}
            </p>
          </div>
        </Card>
      </CardSwap>
    </div>
  );
}
