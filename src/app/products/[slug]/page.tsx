import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import AnimatedButton from "@/components/AnimatedButton";
import ProductCard from "@/components/ProductCard";
import { getProduct, getProductsByCategory } from "@/lib/products";
import { whatsappLink } from "@/lib/utils";
import { formatPaise, discountPercent } from "@/lib/money";
import { addToCartAction } from "@/app/cart/actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const isKit = product.categorySlug === "pooja-samagri";
  const related = (await getProductsByCategory(product.categorySlug))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
      <Link
        href={`/categories/${product.categorySlug}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-soft hover:text-maroon"
      >
        <ArrowLeft size={16} />
        Back to {product.categoryName}
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <FadeIn>
          <div className="grid grid-cols-2 gap-4 [&>*:last-child:nth-child(odd)]:col-span-2">
            {product.gallery.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-blush [&:last-child:nth-child(odd)]:aspect-[16/9]"
              >
                <Image src={src} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              {product.categoryName}
            </span>
            {product.badge && (
              <span className="rounded-full bg-maroon px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ivory">
                {product.badge}
              </span>
            )}
          </div>
          <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-charcoal-soft">
            {product.description}
          </p>

          {product.price != null && (
            <div className="mt-6 rounded-2xl bg-ivory-deep p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-2xl text-charcoal">
                  {formatPaise(product.price)}
                </span>
                {product.mrp != null && product.mrp > product.price && (
                  <span className="text-base text-charcoal-soft line-through">
                    {formatPaise(product.mrp)}
                  </span>
                )}
                {discountPercent(product.mrp, product.price) && (
                  <span className="rounded-full bg-maroon/10 px-2.5 py-1 text-xs font-semibold text-maroon">
                    {discountPercent(product.mrp, product.price)}% off
                  </span>
                )}
              </div>
              <form action={addToCartAction} className="mt-4 flex items-center gap-3">
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="from" value={`/products/${product.slug}`} />
                <input
                  type="number"
                  name="quantity"
                  defaultValue={1}
                  min={1}
                  className="w-20 rounded-lg border border-charcoal/15 bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-maroon"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-maroon px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>
              </form>
            </div>
          )}

          <h2 className="mt-7 text-sm font-semibold uppercase tracking-wider text-charcoal">
            {isKit ? `What's in this kit (${product.highlights.length} items)` : "Highlights"}
          </h2>
          <ul className="mt-3 space-y-3">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-charcoal">
                <Check size={16} className="mt-0.5 shrink-0 text-maroon" />
                {h}
              </li>
            ))}
          </ul>

          {isKit && (
            <p className="mt-5 text-sm text-charcoal-soft">
              Ordered separately, these {product.highlights.length} items mean{" "}
              {product.highlights.length} different shops. Enquire once and we
              send the whole kit together.
            </p>
          )}

          <div className="mt-9 flex flex-wrap gap-4">
            <AnimatedButton
              href={whatsappLink(
                `Hi Suhag! I'm interested in "${product.name}". Could you share more details?`
              )}
              external
            >
              Enquire on WhatsApp
            </AnimatedButton>
            <AnimatedButton href="/contact" variant="secondary">
              Contact Form
            </AnimatedButton>
          </div>
        </FadeIn>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl text-charcoal">More from {product.categoryName}</h2>
          <StaggerContainer className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {related.map((p) => (
              <StaggerItem key={p.slug}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}
    </div>
  );
}
