"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { rupeesToPaise } from "@/lib/money";

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const root = slugify(base) || "product";
  let slug = root;
  let n = 2;
  while (true) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${root}-${n++}`;
  }
}

function parseHighlights(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function filesFrom(formData: FormData, key: string): File[] {
  return formData.getAll(key).filter((f): f is File => f instanceof File && f.size > 0);
}

function parsePrice(raw: FormDataEntryValue | null): number | null {
  const value = String(raw ?? "").trim();
  return value ? rupeesToPaise(value) : null;
}

function revalidateCatalog(...categorySlugs: string[]) {
  revalidatePath("/");
  revalidatePath("/admin/products");
  for (const slug of new Set(categorySlugs)) {
    revalidatePath(`/categories/${slug}`);
  }
}

export async function createProductAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const badge = String(formData.get("badge") ?? "").trim();
  const highlights = parseHighlights(formData.get("highlights"));
  const mrp = parsePrice(formData.get("mrp"));
  const price = parsePrice(formData.get("price"));

  if (!name || !categorySlug || !description) {
    throw new Error("Name, category, and description are required.");
  }

  const [imageFile] = filesFrom(formData, "image");
  if (!imageFile) {
    throw new Error("A main image is required.");
  }

  const category = await prisma.category.findUniqueOrThrow({ where: { slug: categorySlug } });

  const mainImagePath = await saveUploadedImage(imageFile);
  const galleryPaths = await Promise.all(filesFrom(formData, "gallery").map(saveUploadedImage));
  const gallery = [mainImagePath, ...galleryPaths];

  const slug = await uniqueSlug(name);

  await prisma.product.create({
    data: {
      slug,
      name,
      description,
      image: mainImagePath,
      gallery: JSON.stringify(gallery),
      highlights: JSON.stringify(highlights),
      badge: badge || null,
      mrp,
      price,
      categoryId: category.id,
    },
  });

  revalidateCatalog(categorySlug);
  redirect("/admin/products");
}

export async function updateProductAction(id: string, formData: FormData) {
  const existing = await prisma.product.findUniqueOrThrow({
    where: { id },
    include: { category: true },
  });

  const name = String(formData.get("name") ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const badge = String(formData.get("badge") ?? "").trim();
  const highlights = parseHighlights(formData.get("highlights"));
  const mrp = parsePrice(formData.get("mrp"));
  const price = parsePrice(formData.get("price"));

  if (!name || !categorySlug || !description) {
    throw new Error("Name, category, and description are required.");
  }

  const category = await prisma.category.findUniqueOrThrow({ where: { slug: categorySlug } });

  const [imageFile] = filesFrom(formData, "image");
  const existingGallery: string[] = JSON.parse(existing.gallery);

  let mainImagePath = existing.image;
  let gallery = existingGallery;

  if (imageFile) {
    mainImagePath = await saveUploadedImage(imageFile);
    await deleteUploadedImage(existing.image);
    gallery = [mainImagePath, ...existingGallery.filter((g) => g !== existing.image)];
  }

  const newGalleryPaths = await Promise.all(filesFrom(formData, "gallery").map(saveUploadedImage));
  gallery = [...gallery, ...newGalleryPaths];

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      image: mainImagePath,
      gallery: JSON.stringify(gallery),
      highlights: JSON.stringify(highlights),
      badge: badge || null,
      mrp,
      price,
      categoryId: category.id,
    },
  });

  revalidatePath(`/products/${existing.slug}`);
  revalidateCatalog(existing.category.slug, categorySlug);
  redirect("/admin/products");
}

export async function deleteProductAction(id: string, _formData: FormData) {
  const existing = await prisma.product.findUniqueOrThrow({
    where: { id },
    include: { category: true },
  });
  const gallery: string[] = JSON.parse(existing.gallery);
  await Promise.all(gallery.map(deleteUploadedImage));

  await prisma.product.delete({ where: { id } });

  revalidatePath(`/products/${existing.slug}`);
  revalidateCatalog(existing.category.slug);
  redirect("/admin/products");
}
