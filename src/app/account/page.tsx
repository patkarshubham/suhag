import { redirect } from "next/navigation";
import Link from "next/link";
import { MapPin, Package, ShoppingBag, Heart } from "lucide-react";
import { getCurrentUser } from "@/lib/customerSession";
import { updateProfileAction, logoutAction } from "./actions";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login?from=/account");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
      <h1 className="font-display text-3xl text-charcoal">Your account</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Link
          href="/cart"
          className="flex flex-col items-center gap-2 rounded-2xl bg-ivory-deep p-5 text-center hover:bg-blush/40"
        >
          <ShoppingBag className="text-maroon" size={22} />
          <span className="text-sm font-medium text-charcoal">Cart</span>
        </Link>
        <Link
          href="/saved"
          className="flex flex-col items-center gap-2 rounded-2xl bg-ivory-deep p-5 text-center hover:bg-blush/40"
        >
          <Heart className="text-maroon" size={22} />
          <span className="text-sm font-medium text-charcoal">Saved</span>
        </Link>
        <Link
          href="/account/addresses"
          className="flex flex-col items-center gap-2 rounded-2xl bg-ivory-deep p-5 text-center hover:bg-blush/40"
        >
          <MapPin className="text-maroon" size={22} />
          <span className="text-sm font-medium text-charcoal">Addresses</span>
        </Link>
        <Link
          href="/account/orders"
          className="flex flex-col items-center gap-2 rounded-2xl bg-ivory-deep p-5 text-center hover:bg-blush/40"
        >
          <Package className="text-maroon" size={22} />
          <span className="text-sm font-medium text-charcoal">Orders</span>
        </Link>
      </div>

      <div className="mt-10 rounded-2xl border border-charcoal/10 p-6">
        <h2 className="font-display text-xl text-charcoal">Profile</h2>
        <form action={updateProfileAction} className="mt-4 space-y-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
            Name
            <input
              name="name"
              defaultValue={user.name ?? ""}
              className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
            />
          </label>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-charcoal-soft">Email</p>
              <p className="text-charcoal">{user.email ?? "—"}</p>
            </div>
            <div>
              <p className="text-charcoal-soft">Phone</p>
              <p className="text-charcoal">{user.phone ?? "—"}</p>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-full bg-maroon px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
          >
            Save changes
          </button>
        </form>
      </div>

      <form action={logoutAction} className="mt-6">
        <button type="submit" className="text-sm font-medium text-charcoal-soft hover:text-maroon">
          Log out
        </button>
      </form>
    </div>
  );
}
