import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, X } from "lucide-react";
import { getCurrentUserId } from "@/lib/customerSession";
import { getSavedItems } from "@/lib/cart";
import { formatPaise } from "@/lib/money";
import { moveToCartAction, removeSavedAction } from "@/app/cart/actions";

export default async function SavedPage() {
  const userId = await getCurrentUserId();
  const items = userId ? await getSavedItems(userId) : [];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
      <h1 className="font-display text-3xl text-charcoal">Saved for later</h1>

      {!userId && (
        <p className="mt-6 text-sm text-charcoal-soft">
          <Link href="/account/login?from=/saved" className="font-medium text-maroon hover:underline">
            Sign in
          </Link>{" "}
          to see items you&apos;ve saved.
        </p>
      )}

      {userId && items.length === 0 && (
        <p className="mt-10 text-center text-charcoal-soft">Nothing saved yet.</p>
      )}

      {items.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col">
              <Link href={`/products/${item.product.slug}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-blush">
                <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
              </Link>
              <Link href={`/products/${item.product.slug}`} className="mt-3 font-display text-lg text-charcoal hover:text-maroon">
                {item.product.name}
              </Link>
              {item.product.price != null && (
                <p className="text-sm text-charcoal-soft">{formatPaise(item.product.price)}</p>
              )}
              <div className="mt-2 flex items-center gap-4">
                <form action={moveToCartAction.bind(null, item.id)}>
                  <button type="submit" className="flex items-center gap-1 text-xs font-medium text-maroon hover:underline">
                    <ShoppingBag size={13} /> Move to cart
                  </button>
                </form>
                <form action={removeSavedAction.bind(null, item.id)}>
                  <button type="submit" className="flex items-center gap-1 text-xs font-medium text-charcoal-soft hover:text-red-700">
                    <X size={13} /> Remove
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
