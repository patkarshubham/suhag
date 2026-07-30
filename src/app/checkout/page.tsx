import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/customerSession";
import { getCartItems, cartSubtotal } from "@/lib/cart";
import { formatPaise } from "@/lib/money";
import { createCheckoutSessionAction } from "./actions";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login?from=/checkout");

  const [addresses, items] = await Promise.all([
    prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    }),
    getCartItems(userId),
  ]);

  if (items.length === 0) redirect("/cart");

  const subtotal = cartSubtotal(items);
  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <h1 className="font-display text-3xl text-charcoal">Checkout</h1>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {!process.env.STRIPE_SECRET_KEY && (
        <p className="mt-6 rounded-lg bg-gold/15 px-4 py-3 text-sm text-charcoal">
          Payments aren&apos;t live yet — add a Stripe secret key to <code>.env</code> to enable checkout.
        </p>
      )}

      <form action={createCheckoutSessionAction} className="mt-8 space-y-8">
        <div>
          <h2 className="font-display text-xl text-charcoal">Shipping address</h2>
          {addresses.length === 0 ? (
            <p className="mt-3 text-sm text-charcoal-soft">
              No saved addresses.{" "}
              <Link href="/account/addresses" className="font-medium text-maroon hover:underline">
                Add one
              </Link>{" "}
              to continue.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {addresses.map((address) => (
                <label
                  key={address.id}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-charcoal/10 p-4 has-[:checked]:border-maroon"
                >
                  <input
                    type="radio"
                    name="addressId"
                    value={address.id}
                    defaultChecked={address.id === defaultAddress?.id}
                    required
                    className="mt-1 accent-maroon"
                  />
                  <span className="text-sm text-charcoal">
                    <span className="font-medium">{address.label}</span> — {address.fullName},{" "}
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state}{" "}
                    {address.pincode} · {address.phone}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-xl text-charcoal">Order summary</h2>
          <div className="mt-4 divide-y divide-charcoal/10 rounded-2xl border border-charcoal/10">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 text-sm">
                <span className="text-charcoal">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="text-charcoal-soft">
                  {formatPaise((item.product.price ?? 0) * item.quantity)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 font-medium text-charcoal">
              <span>Total</span>
              <span>{formatPaise(subtotal)}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={addresses.length === 0}
          className="w-full rounded-full bg-maroon px-7 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep disabled:opacity-50"
        >
          Pay {formatPaise(subtotal)}
        </button>
      </form>
    </div>
  );
}
