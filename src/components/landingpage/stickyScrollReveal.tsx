"use client";

import React, { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import styles from "./StickyScrollReveal.module.css";

// --- Helper functions (countWords, renderWrappedWords) remain the same ---
// (I've collapsed them for brevity, no changes are needed inside them)
const countWords = (children: React.ReactNode): number => {
  let count = 0;
  React.Children.forEach(children, (child) => {
    if (typeof child === "string") {
      count += child.split(/\s+/).filter(Boolean).length;
    } else if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
      const { children: childElements } = child.props;
      if (childElements) {
        count += countWords(childElements);
      }
    }
  });
  return count;
};
const renderWrappedWords = (
  children: React.ReactNode,
  progress: MotionValue<number>,
  totalWords: number,
  wordCounter: { current: number },
): React.ReactNode => {
  return React.Children.map(children, (child, index) => {
    if (typeof child === "string") {
      const words = child.split(/\s+/).filter(Boolean);
      return words.map((word, wordIndex) => {
        const globalWordIndex = wordCounter.current;
        const start = globalWordIndex / totalWords;
        const end = start + 1 / totalWords;
        wordCounter.current++;
        return (
          <Word
            key={`${index}-${wordIndex}`}
            progress={progress}
            range={[start, end]}
          >
            {word + " "}
          </Word>
        );
      });
    }
    if (
      React.isValidElement<{ children?: React.ReactNode }>(child) &&
      child.props.children
    ) {
      return React.cloneElement(
        child,
        { key: index },
        renderWrappedWords(
          child.props.children,
          progress,
          totalWords,
          wordCounter,
        ),
      );
    }
    return child;
  });
};

// --- Main Components ---

// UPDATE 1: Add new props for customization
interface StickyScrollRevealProps {
  imageUrl: string;
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  imagePosition?: "left" | "right";
  scrollHeight?: string;
}

const Word = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span className={styles.word} style={{ opacity }}>
      {children}
    </motion.span>
  );
};

export default function StickyScrollReveal({
  imageUrl,
  children,
  // UPDATE 2: Set default values for the new props
  backgroundColor = "#23262A", // Default to dark background
  textColor = "#fff", // Default to light text
  imagePosition = "right", // Default to image on the right
  scrollHeight = "300vh", // Default scroll duration
}: StickyScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalWords = useMemo(() => countWords(children), [children]);
  const wordCounter = { current: 0 };

  // UPDATE 3: Create reusable JSX blocks for text and image
  const TextContent = (
    <div className={styles.textWrapper}>
      <div className={styles.paragraph} style={{ color: textColor }}>
        {renderWrappedWords(children, scrollYProgress, totalWords, wordCounter)}
      </div>
    </div>
  );

  const ImageContent = (
    <div className={styles.imageWrapper}>
      <Image
        src={imageUrl}
        alt="A descriptive alt text"
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  return (
    // UPDATE 4: Apply the dynamic styles and layout
    <div
      ref={containerRef}
      className={styles.scrollContainer}
      style={{ height: scrollHeight }}
    >
      <div className={styles.stickySection} style={{ backgroundColor }}>
        <div className={styles.gridContainer}>
          {imagePosition === "left" && ImageContent}
          {TextContent}
          {imagePosition === "right" && ImageContent}
        </div>
      </div>
    </div>
  );
}
