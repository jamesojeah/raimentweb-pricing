"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * Loads only the small "domAnimation" feature set (not the full library) and
 * switches off movement for people who have "reduce motion" turned on.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
