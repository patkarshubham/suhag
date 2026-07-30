"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/passwords";
import { setCustomerSession } from "@/lib/customerSession";

export async function registerAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || password.length < 6) {
    redirect(
      `/account/register?error=${encodeURIComponent("Fill in your name, email, and a password of at least 6 characters.")}`
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    redirect(
      `/account/register?error=${encodeURIComponent("An account with that email already exists — try signing in instead.")}`
    );
  }

  const user = await prisma.user.create({
    data: { name, email, passwordHash: hashPassword(password) },
  });

  await setCustomerSession(user.id);
  redirect("/account");
}
