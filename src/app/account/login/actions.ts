"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requestOtp, verifyOtp } from "@/lib/otp";
import { setCustomerSession } from "@/lib/customerSession";
import { verifyPassword } from "@/lib/passwords";

function redirectTarget(formData: FormData): string {
  const from = String(formData.get("from") ?? "");
  return from.startsWith("/") ? from : "/account";
}

export async function requestOtpAction(formData: FormData) {
  const phone = String(formData.get("phone") ?? "").trim();
  const from = String(formData.get("from") ?? "");

  if (!phone) {
    redirect(`/account/login?tab=phone&error=${encodeURIComponent("Enter a phone number")}`);
  }

  const { devCode } = await requestOtp(phone);
  const params = new URLSearchParams({ tab: "phone", step: "code", phone });
  if (from) params.set("from", from);
  if (devCode) params.set("devCode", devCode);
  redirect(`/account/login?${params.toString()}`);
}

export async function verifyOtpAction(formData: FormData) {
  const phone = String(formData.get("phone") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();
  const target = redirectTarget(formData);

  const valid = await verifyOtp(phone, code);
  if (!valid) {
    const params = new URLSearchParams({
      tab: "phone",
      step: "code",
      phone,
      error: "That code is invalid or expired.",
    });
    redirect(`/account/login?${params.toString()}`);
  }

  let user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    user = await prisma.user.create({ data: { phone } });
  }

  await setCustomerSession(user.id);
  redirect(target);
}

export async function loginWithEmailAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const target = redirectTarget(formData);

  const user = email ? await prisma.user.findUnique({ where: { email } }) : null;
  if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
    redirect(`/account/login?tab=email&error=${encodeURIComponent("Invalid email or password.")}`);
  }

  await setCustomerSession(user.id);
  redirect(target);
}
