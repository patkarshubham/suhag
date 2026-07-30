"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { clearCustomerSession, getCurrentUserId } from "@/lib/customerSession";

export async function logoutAction() {
  await clearCustomerSession();
  redirect("/");
}

export async function updateProfileAction(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  const name = String(formData.get("name") ?? "").trim();

  await prisma.user.update({ where: { id: userId }, data: { name } });
  revalidatePath("/account");
}
