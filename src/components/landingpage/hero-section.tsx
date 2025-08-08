"use client";

import HeroText from "./hero-text";
import ScrollStack, {
  ScrollStackItem,
} from "@/blocks/Components/ScrollStack/ScrollStack";
import { useI18n } from "@/providers/i18n-provider";
import { useEffect, useState } from "react";

type ScrollConfig = {
  readonly itemDistance: number;
  readonly itemStackDistance: number;
  readonly baseScale: number;
  readonly scaleEndPosition: string;
  readonly topPaddingVh: number;
  readonly bottomSpacer: number;
};

function getScrollConfig(viewportWidth: number): ScrollConfig {
  if (viewportWidth < 640) {
    return {
      itemDistance: 48,
      itemStackDistance: 16,
      baseScale: 0.92,
      scaleEndPosition: "6%",
      topPaddingVh: 4,
      bottomSpacer: 300,
    } as const;
  }
  if (viewportWidth < 1024) {
    return {
      itemDistance: 56,
      itemStackDistance: 20,
      baseScale: 0.9,
      scaleEndPosition: "8%",
      topPaddingVh: 2,
      bottomSpacer: 100,
    } as const;
  }
  return {
    itemDistance: 64,
    itemStackDistance: 24,
    baseScale: 0.9,
    scaleEndPosition: "10%",
    topPaddingVh: 0,
    bottomSpacer: 400,
  } as const;
}

export default function HeroSection() {
  const { t } = useI18n();
  const [conf, setConf] = useState<ScrollConfig>(() =>
    getScrollConfig(typeof window !== "undefined" ? window.innerWidth : 1280),
  );
  useEffect(() => {
    const onResize = (): void => setConf(getScrollConfig(window.innerWidth));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <div
      id="hero"
      className="container mx-auto flex min-h-[70vh] max-w-7xl flex-1 scroll-mt-24 flex-col items-center justify-evenly gap-4 px-4 pt-20 pb-10 sm:gap-6 md:min-h-screen md:flex-row md:gap-12 md:px-8 md:py-20 lg:justify-between"
    >
      <div className="sticky top-16 z-10 w-full self-start sm:top-20 md:top-24 md:w-[40%] lg:top-28">
        <HeroText />
      </div>
      <div className="flex w-full justify-center pt-4 sm:pt-6 md:w-[60%] md:justify-end md:pt-0">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-none">
          <ScrollStack
            className="rounded-2xl"
            itemDistance={conf.itemDistance}
            itemScale={0.03}
            itemStackDistance={conf.itemStackDistance}
            stackPosition="0%"
            scaleEndPosition={conf.scaleEndPosition}
            baseScale={conf.baseScale}
            rotationAmount={0}
            blurAmount={0}
            useWindowScroll
            topPaddingVh={conf.topPaddingVh}
            bottomSpacer={conf.bottomSpacer}
          >
            <ScrollStackItem itemClassName="border border-[#DAE2F8]/50 bg-gradient-to-br from-[#DAE2F8] to-[#D6A4A4] shadow-xl backdrop-blur-sm">
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
                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  {t("features.showcaseTitle")}
                </h3>
                <p className="text-base leading-relaxed text-slate-700">
                  {t("features.showcaseDesc")}
                </p>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="border border-[#9bc5c3]/50 bg-gradient-to-br from-[#616161] to-[#9bc5c3] shadow-xl backdrop-blur-sm">
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
                  {t("features.guidanceTitle")}
                </h3>
                <p className="text-foreground/80 text-base leading-relaxed">
                  {t("features.guidanceDesc")}
                </p>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="border border-[#E6DADA]/50 bg-gradient-to-br from-[#E6DADA] to-[#274046] shadow-xl backdrop-blur-sm">
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
                  {t("features.matchedTitle")}
                </h3>
                <p className="text-foreground/80 text-base leading-relaxed">
                  {t("features.matchedDesc")}
                </p>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </div>
    </div>
  );
}
