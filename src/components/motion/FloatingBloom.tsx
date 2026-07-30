"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flower, Flower2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Bloom = {
  Icon: LucideIcon;
  top: string;
  left: string;
  size: number;
  iconSize: number;
  duration: number;
  delay: number;
  drift: number;
};

const blooms: Bloom[] = [
  { Icon: Flower, top: "14%", left: "8%", size: 52, iconSize: 20, duration: 11, delay: 0, drift: 14 },
  { Icon: Flower2, top: "24%", left: "84%", size: 40, iconSize: 16, duration: 9, delay: 1.2, drift: -10 },
  { Icon: Flower, top: "66%", left: "89%", size: 60, iconSize: 24, duration: 13, delay: 0.6, drift: 12 },
  { Icon: Flower2, top: "76%", left: "12%", size: 38, iconSize: 15, duration: 10, delay: 2, drift: -12 },
  { Icon: Flower, top: "46%", left: "5%", size: 32, iconSize: 13, duration: 8.5, delay: 1.6, drift: 8 },
  { Icon: Flower2, top: "36%", left: "93%", size: 46, iconSize: 18, duration: 12, delay: 0.4, drift: -14 },
];

export default function FloatingBloom({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {blooms.map((bloom, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center rounded-full border border-ivory/25 bg-ivory/10 text-ivory/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-sm"
          style={{ top: bloom.top, left: bloom.left, width: bloom.size, height: bloom.size }}
          initial={{ opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.55 }
              : { opacity: 0.55, y: [0, -16, 0], x: [0, bloom.drift, 0], rotate: [0, 10, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0.8, delay: bloom.delay }
              : {
                  opacity: { duration: 0.8, delay: bloom.delay },
                  y: { duration: bloom.duration, delay: bloom.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                  x: { duration: bloom.duration, delay: bloom.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                  rotate: { duration: bloom.duration, delay: bloom.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                }
          }
        >
          <bloom.Icon size={bloom.iconSize} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}
