"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
};

export default function AnimatedButton({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: AnimatedButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-maroon text-ivory hover:bg-maroon-deep"
      : "bg-transparent text-charcoal border border-charcoal/20 hover:border-charcoal/40";

  const content = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors",
        styles,
        className
      )}
    >
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}
