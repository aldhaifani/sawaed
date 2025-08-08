/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { useLayoutEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full my-8 h-72 sm:h-80 lg:h-96 p-6 sm:p-8 lg:p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
  useWindowScroll?: boolean;
  topPaddingVh?: number; // top padding for inner container (vh)
  bottomSpacer?: number; // bottom spacer in px
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
  useWindowScroll = false,
  topPaddingVh = 20,
  bottomSpacer = 800,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);
  const windowListenersAttachedRef = useRef(false);
  const rafScrollScheduledRef = useRef(false);
  const cardPositionsRef = useRef<number[]>([]);
  const windowResizeHandlerRef = useRef<((this: Window, ev: UIEvent) => any) | null>(null);
  const recomputeCardPositions = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;
    const scrollerTopOnPage = useWindowScroll && typeof window !== 'undefined'
      ? scroller.getBoundingClientRect().top + window.scrollY
      : 0;
    const positions: number[] = [];
    for (let i = 0; i < cardsRef.current.length; i++) {
      const el = cardsRef.current[i];
      if (!el) { positions.push(0); continue; }
      const top = useWindowScroll && typeof window !== 'undefined'
        ? el.getBoundingClientRect().top + window.scrollY - scrollerTopOnPage
        : el.offsetTop;
      positions.push(top);
    }
    cardPositionsRef.current = positions;
  }, [useWindowScroll]);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = useWindowScroll ? (typeof window !== 'undefined' ? window.scrollY : 0) : scroller.scrollTop;
    const containerHeight = useWindowScroll ? (typeof window !== 'undefined' ? window.innerHeight : scroller.clientHeight) : scroller.clientHeight;
    const scrollerTopOnPage = useWindowScroll && typeof window !== 'undefined'
      ? scroller.getBoundingClientRect().top + window.scrollY
      : 0;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = scroller.querySelector('.scroll-stack-end') as HTMLElement;
    const endElementTop = endElement
      ? (useWindowScroll && typeof window !== 'undefined'
          ? endElement.getBoundingClientRect().top + window.scrollY - scrollerTopOnPage
          : endElement.offsetTop)
      : 0;

    const totalCards = cardsRef.current.length;
    const lastIndex = Math.max(0, totalCards - 1);
    // Use the end spacer position so the stack releases exactly at the end of the section
    const unifiedPinEnd = (endElementTop || 0) - stackPositionPx;
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardPositionsRef.current[i] ?? 0;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const pinEnd = unifiedPinEnd;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardPositionsRef.current[j] ?? 0;
          const jTriggerStart = jCardTop - stackPositionPx - (itemStackDistance * j);
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      const newTransform = {
        translateY: Math.round(translateY),
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged = !lastTransform || 
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;
        // Ensure later cards stack above earlier ones as they move upward over the top-pinned stack
        // Give a high base to avoid interference from other page elements
        card.style.zIndex = String(1000 + i);
        
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    if (useWindowScroll) {
      if (!rafScrollScheduledRef.current) {
        rafScrollScheduledRef.current = true;
        requestAnimationFrame(() => {
          rafScrollScheduledRef.current = false;
          updateCardTransforms();
        });
      }
      return;
    }
    updateCardTransforms();
  }, [updateCardTransforms, useWindowScroll]);

  const setupLenisOrWindow = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    if (useWindowScroll) {
      if (typeof window !== 'undefined' && !windowListenersAttachedRef.current) {
        window.addEventListener('scroll', handleScroll, { passive: true });
        const onResize = () => { recomputeCardPositions(); handleScroll(); };
        window.addEventListener('resize', onResize, { passive: true });
        windowResizeHandlerRef.current = onResize;
        windowListenersAttachedRef.current = true;
      }
      // No Lenis when using window scroll
      return null;
    }

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    recomputeCardPositions();
    setupLenisOrWindow();

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (typeof window !== 'undefined' && windowListenersAttachedRef.current) {
        window.removeEventListener('scroll', handleScroll as any);
        if (windowResizeHandlerRef.current) {
          window.removeEventListener('resize', windowResizeHandlerRef.current as any);
          windowResizeHandlerRef.current = null;
        }
        windowListenersAttachedRef.current = false;
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    onStackComplete,
    setupLenisOrWindow,
    recomputeCardPositions,
    updateCardTransforms,
  ]);

  return (
    <div
      className={`relative w-full ${useWindowScroll ? 'h-auto' : 'h-full'} ${useWindowScroll ? 'overflow-visible' : 'overflow-y-auto'} overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: useWindowScroll ? 'auto' : 'contain',
        WebkitOverflowScrolling: useWindowScroll ? undefined : 'touch',
        scrollBehavior: useWindowScroll ? undefined : 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: useWindowScroll ? undefined : 'scroll-position'
      }}
    >
      <div
        className="scroll-stack-inner min-h-screen"
        style={{ paddingTop: `${topPaddingVh}vh` }}
      >
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full" style={{ height: `${bottomSpacer}px` }} />
      </div>
    </div>
  );
};

export default ScrollStack;
