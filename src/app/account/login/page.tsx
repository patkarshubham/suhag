import Link from "next/link";
import { cn } from "@/lib/utils";
import { requestOtpAction, verifyOtpAction, loginWithEmailAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string;
    step?: string;
    phone?: string;
    devCode?: string;
    error?: string;
    from?: string;
  }>;
}) {
  const { tab = "phone", step = "phone", phone = "", devCode, error, from = "" } = await searchParams;
  const isPhone = tab !== "email";

  return (
    <div className="mx-auto max-w-sm px-6 py-20 sm:px-8">
      <h1 className="font-display text-3xl text-charcoal">Sign in</h1>
      <p className="mt-1 text-sm text-charcoal-soft">
        Access your cart, saved items, addresses, and orders.
      </p>

      <div className="mt-8 flex gap-1 rounded-full bg-ivory-deep p-1">
        <Link
          href={`/account/login?tab=phone${from ? `&from=${encodeURIComponent(from)}` : ""}`}
          className={cn(
            "flex-1 rounded-full px-4 py-2 text-center text-sm font-medium transition-colors",
            isPhone ? "bg-maroon text-ivory" : "text-charcoal-soft"
          )}
        >
          Phone
        </Link>
        <Link
          href={`/account/login?tab=email${from ? `&from=${encodeURIComponent(from)}` : ""}`}
          className={cn(
            "flex-1 rounded-full px-4 py-2 text-center text-sm font-medium transition-colors",
            !isPhone ? "bg-maroon text-ivory" : "text-charcoal-soft"
          )}
        >
          Email
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {isPhone && step !== "code" && (
        <form action={requestOtpAction} className="mt-6 space-y-4">
          <input type="hidden" name="from" value={from} />
          <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
            Phone number
            <input
              type="tel"
              name="phone"
              required
              placeholder="+91 98765 43210"
              className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-maroon px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
          >
            Send code
          </button>
        </form>
      )}

      {isPhone && step === "code" && (
        <form action={verifyOtpAction} className="mt-6 space-y-4">
          <input type="hidden" name="from" value={from} />
          <input type="hidden" name="phone" value={phone} />
          <p className="text-sm text-charcoal-soft">
            Enter the code sent to <span className="font-medium text-charcoal">{phone}</span>.
          </p>
          {devCode && (
            <p className="rounded-lg bg-gold/15 px-4 py-3 text-sm text-charcoal">
              No SMS provider configured yet — your test code is{" "}
              <span className="font-display text-lg text-maroon">{devCode}</span>.
            </p>
          )}
          <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
            Verification code
            <input
              name="code"
              required
              maxLength={6}
              inputMode="numeric"
              className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-center text-lg tracking-[0.5em] text-charcoal outline-none focus:border-maroon"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-maroon px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
          >
            Verify & sign in
          </button>
          <Link
            href={`/account/login?tab=phone${from ? `&from=${encodeURIComponent(from)}` : ""}`}
            className="block text-center text-sm text-charcoal-soft hover:text-maroon"
          >
            Use a different number
          </Link>
        </form>
      )}

      {!isPhone && (
        <form action={loginWithEmailAction} className="mt-6 space-y-4">
          <input type="hidden" name="from" value={from} />
          <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
            Email
            <input
              type="email"
              name="email"
              required
              className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
            Password
            <input
              type="password"
              name="password"
              required
              className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-maroon px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
          >
            Sign in
          </button>
          <p className="text-center text-sm text-charcoal-soft">
            New here?{" "}
            <Link href="/account/register" className="font-medium text-maroon hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
