"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { ENTRANCE_EASE } from "./fade-in";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ENTRANCE_EASE },
  },
};

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Container that staggers its children's entrance (~70ms apart) when scrolled
 * into view. Pair with <StaggerItem> for each child. No-op under
 * prefers-reduced-motion.
 */
export function Stagger({ children, className }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child; must be rendered inside <Stagger>. */
export function StaggerItem({ children, className }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
