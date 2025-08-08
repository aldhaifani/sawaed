"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Dictionary, type Locale } from "@/i18n/dictionaries";

export type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: Dictionary;
  t: <K extends string>(path: K) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "locale" as const;

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === "en" || stored === "ar") return stored;
  const browser = (navigator.language || "en").toLowerCase();
  if (browser.startsWith("ar")) return "ar";
  return "en";
}

function getDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

function getLang(locale: Locale): string {
  return locale;
}

export function I18nProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, locale);
    const html = document.documentElement;
    html.setAttribute("dir", getDir(locale));
    html.setAttribute("lang", getLang(locale));
  }, [locale]);

  const dict: Dictionary = useMemo(() => dictionaries[locale], [locale]);

  const t = useMemo(() => {
    return function translate(path: string): string {
      const parts = path.split(".");
      let current: unknown = dict as unknown;
      for (const p of parts) {
        if (typeof current === "object" && current !== null && p in (current as Record<string, unknown>)) {
          current = (current as Record<string, unknown>)[p];
        } else {
          return path;
        }
      }
      return typeof current === "string" ? current : path;
    };
  }, [dict]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale: setLocaleState, dict, t }),
    [locale, dict, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
