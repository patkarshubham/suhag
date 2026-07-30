"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/motion/FadeIn";

type Step = {
  step: string;
  title: string;
  body: string;
};

export default function ScrollTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mx-auto max-w-2xl">
      <div className="absolute left-[17px] top-1 bottom-1 w-px bg-charcoal/10" />
      <motion.div
        className="absolute left-[17px] top-1 w-px origin-top bg-gradient-to-b from-gold to-maroon"
        style={{ scaleY: reduceMotion ? 1 : scaleY, height: "calc(100% - 0.5rem)" }}
      />

      <ol className="space-y-12">
        {steps.map((s, i) => (
          <li key={s.step}>
            <FadeIn y={20} delay={i * 0.05} className="flex gap-6">
              <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-ivory font-display text-sm text-maroon">
                {s.step}
              </span>
              <div className="pt-0.5">
                <h3 className="font-display text-xl text-charcoal">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{s.body}</p>
              </div>
            </FadeIn>
          </li>
        ))}
      </ol>
    </div>
  );
}
