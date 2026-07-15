import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import AnimatedButton from "@/components/AnimatedButton";
import ProductCard from "@/components/ProductCard";
import { products, getProduct, getProductsByCategory } from "@/data/products";
import { getCategory } from "@/data/categories";
import { whatsappLink } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
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
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const isKit = product.categorySlug === "pooja-samagri";
  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
      <Link
        href={category ? `/categories/${category.slug}` : "/categories"}
        className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-soft hover:text-maroon"
      >
        <ArrowLeft size={16} />
        Back to {category?.name ?? "Categories"}
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
            {category && (
              <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                {category.name}
              </span>
            )}
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
          <h2 className="font-display text-2xl text-charcoal">More from {category?.name}</h2>
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
