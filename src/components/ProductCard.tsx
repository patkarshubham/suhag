"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/categories";

export default function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug);
  const isKit = product.categorySlug === "pooja-samagri";

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-blush">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-maroon px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ivory shadow-sm">
              {product.badge}
            </span>
          )}
          {isKit && (
            <span className="absolute bottom-3 left-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal">
              {product.highlights.length} items in this kit
            </span>
          )}
        </div>
        <div className="mt-3">
          {category && (
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              {category.name}
            </span>
          )}
          <h3 className="mt-1 font-display text-lg text-charcoal">{product.name}</h3>
        </div>
      </motion.div>
    </Link>
  );
}
