"use client";

import React, {
  useEffect,
  useRef,
  type ReactNode,
  createContext,
  useContext,
} from "react";
import Lenis from "lenis";

type LenisContextType = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextType>({ lenis: null });

/**
 * Hook to access the Lenis instance from any component
 */
export const useLenis = (): LenisContextType => useContext(LenisContext);

interface LenisProviderProps {
  children: ReactNode;
  options?: ConstructorParameters<typeof Lenis>[0];
}

/**
 * Provider component that initializes Lenis smooth scrolling
 * and makes the instance available through the useLenis hook
 */
export function LenisProvider({
  children,
  options = {},
}: LenisProviderProps): React.ReactElement {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      ...options,
    });

    // Store the instance in the ref
    lenisRef.current = lenis;

    // Set up RAF (RequestAnimationFrame) for smooth animation
    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
