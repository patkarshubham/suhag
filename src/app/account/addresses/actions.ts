"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/customerSession";

function readAddressForm(formData: FormData) {
  return {
    label: String(formData.get("label") ?? "Home").trim(),
    fullName: String(formData.get("fullName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    line1: String(formData.get("line1") ?? "").trim(),
    line2: String(formData.get("line2") ?? "").trim() || null,
    city: String(formData.get("city") ?? "").trim(),
    state: String(formData.get("state") ?? "").trim(),
    pincode: String(formData.get("pincode") ?? "").trim(),
    isDefault: formData.get("isDefault") === "on",
  };
}

async function clearOtherDefaults(userId: string, exceptId?: string) {
  await prisma.address.updateMany({
    where: { userId, id: exceptId ? { not: exceptId } : undefined },
    data: { isDefault: false },
  });
}

export async function createAddressAction(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  const data = readAddressForm(formData);
  const isFirst = (await prisma.address.count({ where: { userId } })) === 0;

  const address = await prisma.address.create({
    data: { ...data, userId, isDefault: data.isDefault || isFirst },
  });

  if (address.isDefault) await clearOtherDefaults(userId, address.id);

  revalidatePath("/account/addresses");
  revalidatePath("/checkout");
  redirect("/account/addresses");
}

export async function updateAddressAction(id: string, formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  const data = readAddressForm(formData);
  await prisma.address.updateMany({ where: { id, userId }, data });
  if (data.isDefault) await clearOtherDefaults(userId, id);

  revalidatePath("/account/addresses");
  revalidatePath("/checkout");
  redirect("/account/addresses");
}

export async function deleteAddressAction(id: string, _formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  await prisma.address.deleteMany({ where: { id, userId } });

  revalidatePath("/account/addresses");
  revalidatePath("/checkout");
}

export async function setDefaultAddressAction(id: string, _formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  await prisma.address.updateMany({ where: { id, userId }, data: { isDefault: true } });
  await clearOtherDefaults(userId, id);

  revalidatePath("/account/addresses");
  revalidatePath("/checkout");
}
