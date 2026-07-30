import { writeFile, unlink, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const PUBLIC_PREFIX = "/uploads";
const MAX_SIZE_BYTES = 8 * 1024 * 1024;

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Local filesystem storage for admin-uploaded images. Swap this file's
 * implementation for Vercel Blob (or S3, etc.) when deploying to a
 * serverless target — a local disk path won't persist there.
 */
export async function saveUploadedImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files can be uploaded.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Image is too large (max 8MB).");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = path.extname(file.name) || ".jpg";
  const base = sanitizeFilename(path.basename(file.name, ext)) || "image";
  const filename = `${base}-${randomUUID().slice(0, 8)}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `${PUBLIC_PREFIX}/${filename}`;
}

export async function deleteUploadedImage(publicPath: string | null | undefined): Promise<void> {
  if (!publicPath || !publicPath.startsWith(`${PUBLIC_PREFIX}/`)) return;
  const filename = publicPath.slice(PUBLIC_PREFIX.length + 1);
  if (!filename || filename.includes("..") || filename.includes("/")) return;
  try {
    await unlink(path.join(UPLOAD_DIR, filename));
  } catch {
    // already gone — fine
  }
}
