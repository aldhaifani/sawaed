"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, Check } from "lucide-react";
import { useI18n } from "@/providers/i18n-provider";
import type { Locale } from "@/i18n/dictionaries";

/**
 * Floating language switcher rendered at bottom-right of the viewport.
 * Opens a small panel listing supported languages with a check next to the current one.
 */
export function LanguageSwitcher(): React.ReactElement {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const languages: ReadonlyArray<{ code: Locale; label: string }> = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ] as const;

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent): void => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const onSelect = (code: Locale): void => {
    if (code === locale) {
      setOpen(false);
      return;
    }
    setLocale(code);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60]" ref={panelRef}>
      {/* Toggle Button */}
      <Button
        className="h-12 w-12 rounded-full shadow-lg"
        aria-label="Open language switcher"
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronUp className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </Button>

      {/* Panel */}
      <div
        className={`absolute bottom-16 right-0 min-w-40 rounded-xl border bg-accent/80 p-2 shadow-xl backdrop-blur-md transition-all duration-200 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
        role="menu"
        aria-hidden={!open}
      >
        {languages.map((lang) => {
          const isActive = lang.code === locale;
          return (
            <button
              key={lang.code}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-primary/10 ${
                isActive ? "font-semibold" : "font-normal"
              }`}
              onClick={() => onSelect(lang.code)}
              role="menuitemradio"
              aria-checked={isActive}
            >
              <span>{lang.label}</span>
              {isActive ? <Check size={16} /> : <span className="w-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
