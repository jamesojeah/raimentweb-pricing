"use client";

import { m } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Light scroll-in animation. Content starts slightly faded (not invisible) so
 * the page is still readable before JavaScript loads on a slow connection.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      className={className}
      style={{ willChange: "transform, opacity" }}
      initial={{ opacity: 0.2, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
