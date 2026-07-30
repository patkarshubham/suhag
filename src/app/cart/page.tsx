import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Heart, X } from "lucide-react";
import { getCurrentUserId } from "@/lib/customerSession";
import { getCartItems, cartSubtotal } from "@/lib/cart";
import { formatPaise } from "@/lib/money";
import AnimatedButton from "@/components/AnimatedButton";
import {
  updateQuantityAction,
  removeFromCartAction,
  moveToSavedAction,
} from "./actions";

export default async function CartPage() {
  const userId = await getCurrentUserId();
  const items = userId ? await getCartItems(userId) : [];
  const subtotal = cartSubtotal(items);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
      <h1 className="font-display text-3xl text-charcoal">Your cart</h1>

      {!userId && (
        <p className="mt-6 text-sm text-charcoal-soft">
          <Link href="/account/login?from=/cart" className="font-medium text-maroon hover:underline">
            Sign in
          </Link>{" "}
          to see your cart.
        </p>
      )}

      {userId && items.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-charcoal-soft">Your cart is empty.</p>
          <AnimatedButton href="/categories" className="mt-6 inline-flex">
            Browse Categories
          </AnimatedButton>
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="mt-8 divide-y divide-charcoal/10">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-5">
                <Link href={`/products/${item.product.slug}`} className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-blush">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/products/${item.product.slug}`} className="font-medium text-charcoal hover:text-maroon">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-charcoal-soft">{formatPaise(item.product.price ?? 0)}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <form action={updateQuantityAction.bind(null, item.id)}>
                        <input type="hidden" name="quantity" value={item.quantity - 1} />
                        <button type="submit" className="flex size-7 items-center justify-center rounded-full border border-charcoal/20 text-charcoal-soft hover:border-maroon hover:text-maroon">
                          <Minus size={14} />
                        </button>
                      </form>
                      <span className="w-6 text-center text-sm text-charcoal">{item.quantity}</span>
                      <form action={updateQuantityAction.bind(null, item.id)}>
                        <input type="hidden" name="quantity" value={item.quantity + 1} />
                        <button type="submit" className="flex size-7 items-center justify-center rounded-full border border-charcoal/20 text-charcoal-soft hover:border-maroon hover:text-maroon">
                          <Plus size={14} />
                        </button>
                      </form>
                    </div>
                    <form action={moveToSavedAction.bind(null, item.id)}>
                      <button type="submit" className="flex items-center gap-1 text-xs font-medium text-charcoal-soft hover:text-maroon">
                        <Heart size={13} /> Save for later
                      </button>
                    </form>
                    <form action={removeFromCartAction.bind(null, item.id)}>
                      <button type="submit" className="flex items-center gap-1 text-xs font-medium text-charcoal-soft hover:text-red-700">
                        <X size={13} /> Remove
                      </button>
                    </form>
                  </div>
                </div>
                <p className="shrink-0 font-medium text-charcoal">
                  {formatPaise((item.product.price ?? 0) * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between rounded-2xl bg-ivory-deep p-6">
            <div>
              <p className="text-sm text-charcoal-soft">Subtotal</p>
              <p className="font-display text-2xl text-charcoal">{formatPaise(subtotal)}</p>
            </div>
            <AnimatedButton href="/checkout">Proceed to Checkout</AnimatedButton>
          </div>
        </>
      )}
    </div>
  );
}
