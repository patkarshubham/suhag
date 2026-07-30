"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AnimatedRule({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(
        "h-px origin-left bg-gradient-to-r from-gold via-gold-light to-transparent",
        className
      )}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
