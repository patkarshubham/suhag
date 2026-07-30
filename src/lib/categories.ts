import { prisma } from "@/lib/db";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

function toCategory(row: {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}): Category {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    image: row.image,
  };
}

export async function getCategories(): Promise<Category[]> {
  const rows = await prisma.category.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(toCategory);
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const row = await prisma.category.findUnique({ where: { slug } });
  return row ? toCategory(row) : undefined;
}
