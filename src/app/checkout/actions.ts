"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/customerSession";
import { getCartItems, cartSubtotal } from "@/lib/cart";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function createCheckoutSessionAction(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login?from=/checkout");

  const addressId = String(formData.get("addressId") ?? "");
  const address = await prisma.address.findFirst({ where: { id: addressId, userId } });
  if (!address) {
    revalidatePath("/checkout");
    redirect(`/checkout?error=${encodeURIComponent("Please select a shipping address.")}`);
  }

  const items = await getCartItems(userId);
  if (items.length === 0) redirect("/cart");

  const subtotal = cartSubtotal(items);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  let session: Stripe.Checkout.Session;
  try {
    const stripe = getStripe();
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.product.name },
          unit_amount: item.product.price ?? 0,
        },
        quantity: item.quantity,
      })),
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Payment isn't available right now.";
    revalidatePath("/checkout");
    redirect(`/checkout?error=${encodeURIComponent(message)}`);
  }

  await prisma.order.create({
    data: {
      userId,
      addressSnapshot: JSON.stringify(address),
      subtotal,
      total: subtotal,
      status: "pending",
      stripeSessionId: session.id,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price ?? 0,
          quantity: item.quantity,
        })),
      },
    },
  });

  redirect(session.url!);
}
