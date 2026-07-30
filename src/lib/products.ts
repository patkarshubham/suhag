import { prisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";

export type Product = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  badge?: string;
  /** Prices in paise. Null means "enquire only" — no cart/buy UI for this product. */
  mrp: number | null;
  price: number | null;
};

type ProductRow = Prisma.ProductGetPayload<{ include: { category: true } }>;

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    categorySlug: row.category.slug,
    categoryName: row.category.name,
    image: row.image,
    gallery: JSON.parse(row.gallery) as string[],
    highlights: JSON.parse(row.highlights) as string[],
    description: row.description,
    badge: row.badge ?? undefined,
    mrp: row.mrp,
    price: row.price,
  };
}

const includeCategory = { category: true } as const;

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    include: includeCategory,
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toProduct);
}

export async function getNewestProducts(limit: number): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    include: includeCategory,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map(toProduct);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({
    where: { slug },
    include: includeCategory,
  });
  return row ? toProduct(row) : undefined;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({
    where: { id },
    include: includeCategory,
  });
  return row ? toProduct(row) : undefined;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { category: { slug: categorySlug } },
    include: includeCategory,
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toProduct);
}
