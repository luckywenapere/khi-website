"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ENTRANCE_EASE } from "./fade-in";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Scroll-triggered fade + 16px rise, fired once when the element enters the
 * viewport. Disabled under prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.4, ease: ENTRANCE_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
