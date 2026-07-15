"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
  priority?: boolean;
};

export default function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 60,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-[-12%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
}
