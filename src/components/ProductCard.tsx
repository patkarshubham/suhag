"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { formatPaise, discountPercent } from "@/lib/money";

export default function ProductCard({ product }: { product: Product }) {
  const isKit = product.categorySlug === "pooja-samagri";
  const off = discountPercent(product.mrp, product.price);

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
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">
            {product.categoryName}
          </span>
          <h3 className="mt-1 font-display text-lg text-charcoal">{product.name}</h3>
          {product.price != null && (
            <div className="mt-1 flex items-center gap-2">
              <span className="font-medium text-charcoal">{formatPaise(product.price)}</span>
              {product.mrp != null && product.mrp > product.price && (
                <span className="text-sm text-charcoal-soft line-through">
                  {formatPaise(product.mrp)}
                </span>
              )}
              {off && <span className="text-xs font-semibold text-maroon">{off}% off</span>}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
