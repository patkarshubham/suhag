import Link from "next/link";
import { cn } from "@/lib/utils";

type MarqueeItem = {
  href: string;
  label: string;
};

export default function Marquee({
  items,
  className,
  duration = 34,
}: {
  items: MarqueeItem[];
  className?: string;
  duration?: number;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className="flex w-max items-center gap-12 group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {track.map((item, i) => (
          <Link
            key={`${item.href}-${i}`}
            href={item.href}
            className="shrink-0 font-display text-2xl text-charcoal-soft/45 transition-colors duration-300 hover:text-maroon sm:text-3xl"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
