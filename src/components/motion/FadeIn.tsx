"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
};

export default function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.6,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
