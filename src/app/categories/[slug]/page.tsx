import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ParallaxImage from "@/components/motion/ParallaxImage";
import FadeIn from "@/components/motion/FadeIn";
import RevealText from "@/components/motion/RevealText";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import ProductCard from "@/components/ProductCard";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { categoryIcons } from "@/lib/icons";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);
  const Icon = categoryIcons[category.slug];

  return (
    <div>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <ParallaxImage
          src={category.image}
          alt=""
          className="absolute inset-0"
          strength={30}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/10" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 sm:px-8">
          <div className="flex size-12 items-center justify-center rounded-full bg-ivory/90 text-maroon">
            {Icon && <Icon size={22} />}
          </div>
          <h1 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">
            <RevealText text={category.name} />
          </h1>
          <FadeIn delay={0.3} className="mt-3 max-w-2xl">
            <p className="text-ivory/85">{category.description}</p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <StaggerContainer className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
