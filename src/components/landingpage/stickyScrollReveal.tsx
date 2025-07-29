"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import styles from "./StickyScrollReveal.module.css";

// --- Helper Functions for Processing JSX ---

/**
 * Recursively counts the number of words in React children.
 */
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

/**
 * Recursively traverses children, finds text nodes, and wraps each word
 * in the Word component for animation.
 */
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
        wordCounter.current++; // Mutate the counter

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

    if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
      // This is a nested React element (like <b> or <i>).
      // We clone it and recursively process its children.
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

    return child; // Return other elements (like <br/>) as is
  });
};

// --- Main Components ---

interface StickyScrollRevealProps {
  imageUrl: string;
  children: React.ReactNode; // Changed from `text` to `children`
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
}: StickyScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Count the total number of words first.
  // useMemo ensures this only runs when the children prop changes.
  const totalWords = useMemo(() => countWords(children), [children]);

  // 2. Render the words, passing down a mutable counter.
  const wordCounter = { current: 0 };

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.stickySection}>
        <div className={styles.gridContainer}>
          <div className={styles.textWrapper}>
            <div className={styles.paragraph}>
              {renderWrappedWords(
                children,
                scrollYProgress,
                totalWords,
                wordCounter,
              )}
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={imageUrl}
              alt="A descriptive alt text"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
