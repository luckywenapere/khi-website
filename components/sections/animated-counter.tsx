"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

import { ENTRANCE_EASE } from "@/components/motion/fade-in";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

/**
 * Counts up to `value` once it scrolls into view. Under prefers-reduced-motion
 * it renders the final value immediately (no animation). Figures use the mono
 * font via the parent.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // duration 0 under reduced motion → jumps straight to the final value.
    const controls = animate(0, value, {
      duration: reduceMotion ? 0 : 1.1,
      ease: ENTRANCE_EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
