import Link from "next/link";
import { registerAction } from "./actions";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-6 py-20 sm:px-8">
      <h1 className="font-display text-3xl text-charcoal">Create an account</h1>
      <p className="mt-1 text-sm text-charcoal-soft">
        Or sign in by phone instead — no password needed.
      </p>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <form action={registerAction} className="mt-6 space-y-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          Name
          <input
            name="name"
            required
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          />
        </label>
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
            minLength={6}
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-maroon px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
        >
          Create account
        </button>
        <p className="text-center text-sm text-charcoal-soft">
          Already have an account?{" "}
          <Link href="/account/login?tab=email" className="font-medium text-maroon hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
