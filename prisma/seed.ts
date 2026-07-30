import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { categories } from "../src/data/categories";
import { products } from "../src/data/products";
import { rupeesToPaise } from "../src/lib/money";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        tagline: c.tagline,
        description: c.description,
        image: c.image,
      },
      create: {
        slug: c.slug,
        name: c.name,
        tagline: c.tagline,
        description: c.description,
        image: c.image,
      },
    });
  }

  for (const p of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: p.categorySlug },
    });

    const mrp = p.mrpRupees != null ? rupeesToPaise(p.mrpRupees) : null;
    const price = p.priceRupees != null ? rupeesToPaise(p.priceRupees) : null;

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        image: p.image,
        gallery: JSON.stringify(p.gallery),
        highlights: JSON.stringify(p.highlights),
        badge: p.badge ?? null,
        mrp,
        price,
        categoryId: category.id,
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        image: p.image,
        gallery: JSON.stringify(p.gallery),
        highlights: JSON.stringify(p.highlights),
        badge: p.badge ?? null,
        mrp,
        price,
        categoryId: category.id,
      },
    });
  }

  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
