"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, type ReactNode } from "react";

/** Shared easing for smooth, natural motion (ease-out-expo style). */
const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
  amount?: number;
  rootMargin?: string;
}

/**
 * Wraps content and animates it into view on scroll (fade + slide up).
 * Uses transform and opacity only to avoid layout shift and keep animations smooth.
 * Respects prefers-reduced-motion.
 */
export function AnimatedSection({
  children,
  className,
  staggerChildren = false,
  amount = 0.08,
  rootMargin = "0px 0px -40px 0px",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount, rootMargin, once: true });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const duration = reduceMotion ? 0 : undefined;
  const staggerDelay = reduceMotion ? 0 : 0.08;
  const delayChildren = reduceMotion ? 0 : 0.06;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay, delayChildren },
    },
  };

  const singleVariants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration ?? 0.55, ease: EASE_SMOOTH },
    },
  };

  const commonProps = {
    ref,
    className,
    initial: "hidden" as const,
    animate: (isInView ? "visible" : "hidden") as const,
  };

  if (staggerChildren) {
    return (
      <motion.div {...commonProps} variants={containerVariants}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div {...commonProps} variants={singleVariants}>
      {children}
    </motion.div>
  );
}

/**
 * Use inside AnimatedSection with staggerChildren so each item animates with a stagger.
 * Uses transform and opacity only to avoid layout shift and keep animations smooth.
 */
export function AnimatedItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const itemVariants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.5, ease: EASE_SMOOTH },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
