import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="w-full max-w-sm rounded-2xl bg-ivory-deep p-8">
        <h1 className="font-display text-2xl text-charcoal">Suhag Admin</h1>
        <p className="mt-1 text-sm text-charcoal-soft">Sign in to manage the catalog.</p>

        <form action={login} className="mt-6 space-y-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
            Password
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
            />
          </label>

          {error && (
            <p className="text-sm text-red-700">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-maroon px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
