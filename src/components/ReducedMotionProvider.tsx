"use client";

import { MotionConfig } from "motion/react";

interface ReducedMotionProviderProps {
  children: React.ReactNode;
}

export function ReducedMotionProvider({
  children,
}: ReducedMotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
