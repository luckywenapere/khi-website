"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Entrance ease from the design tokens (brief §2.4). */
export const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to delay the entrance. */
  delay?: number;
};

/**
 * Fade + 16px rise on mount. Under prefers-reduced-motion it renders the
 * final state immediately (no transform, no transition).
 */
export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: ENTRANCE_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
