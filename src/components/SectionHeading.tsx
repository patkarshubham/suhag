import RevealText from "@/components/motion/RevealText";
import FadeIn from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <FadeIn y={12}>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </span>
        </FadeIn>
      )}
      <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl text-charcoal">
        <RevealText text={title} />
      </h2>
      {subtitle && (
        <FadeIn delay={0.15} className={align === "center" ? "max-w-2xl" : "max-w-xl"}>
          <p className="text-base sm:text-lg text-charcoal-soft">{subtitle}</p>
        </FadeIn>
      )}
    </div>
  );
}
