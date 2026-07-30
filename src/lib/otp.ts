import { randomInt } from "node:crypto";
import { prisma } from "@/lib/db";

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * No SMS provider is configured yet (Twilio/MSG91/etc.). This stub logs the
 * code to the server console and returns it directly so the flow is fully
 * testable in dev. Replace the body of this function with a real SMS API
 * call once you have a provider — nothing else in the OTP flow needs to change.
 */
async function sendOtpSms(phone: string, code: string): Promise<void> {
  console.log(`[OTP] Would send SMS to ${phone}: your Suhag verification code is ${code}`);
}

export async function requestOtp(phone: string): Promise<{ devCode?: string }> {
  const code = randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await prisma.otpCode.create({ data: { phone, code, expiresAt } });
  await sendOtpSms(phone, code);

  // No SMS provider configured — surface the code so the dev/test flow works.
  const smsConfigured = Boolean(process.env.SMS_PROVIDER_API_KEY);
  return smsConfigured ? {} : { devCode: code };
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  const record = await prisma.otpCode.findFirst({
    where: { phone, code, consumed: false, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });
  if (!record) return false;

  await prisma.otpCode.update({ where: { id: record.id }, data: { consumed: true } });
  return true;
}
