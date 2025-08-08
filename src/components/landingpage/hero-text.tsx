"use client";

import { useI18n } from "@/providers/i18n-provider";

export default function HeroText() {
  const { t } = useI18n();
  return (
    <div className="max-w-2xl flex-1">
      <h1 className="mb-6 text-5xl leading-tight font-extrabold tracking-tight sm:text-6xl">
        <span className="text-primary">{t("hero.title1")}</span>
        <br />
        <span className="text-foreground">{t("hero.title2")}</span>
      </h1>
      <p className="text-muted-foreground max-w-xl text-xl leading-relaxed">
        {t("hero.subtitle")}
      </p>
    </div>
  );
}
