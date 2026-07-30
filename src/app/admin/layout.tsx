import { cookies } from "next/headers";
import Link from "next/link";
import { SESSION_COOKIE_NAME, isValidSessionToken } from "@/lib/auth";
import { logout } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const authed = await isValidSessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);

  if (!authed) {
    return <div className="min-h-screen bg-ivory">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-charcoal/10 bg-ivory-deep">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin/products" className="font-display text-xl text-charcoal">
            Suhag Admin
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/admin/products"
              className="text-sm font-medium text-charcoal-soft hover:text-maroon"
            >
              Products
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-sm font-medium text-charcoal-soft hover:text-maroon"
            >
              View site
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm font-medium text-charcoal-soft hover:text-maroon"
              >
                Log out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
