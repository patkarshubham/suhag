"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/motion/TiltCard";
import { categoryIcons } from "@/lib/icons";
import type { Category } from "@/lib/categories";

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = categoryIcons[category.slug];

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <TiltCard className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-blush">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />

        <div className="absolute left-5 top-5 flex size-10 items-center justify-center rounded-full bg-ivory/90 text-maroon">
          {Icon && <Icon size={18} />}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <div>
            <h3 className="font-display text-xl text-ivory">{category.name}</h3>
            <p className="mt-1 max-w-[85%] text-sm text-ivory/80">{category.tagline}</p>
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ivory/90 text-charcoal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </TiltCard>
    </Link>
  );
}
