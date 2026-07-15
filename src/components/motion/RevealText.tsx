"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const word: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top pb-[0.1em] mr-[0.28em] last:mr-0"
          aria-hidden="true"
        >
          <motion.span className="inline-block" variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
