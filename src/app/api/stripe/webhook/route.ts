import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { clearCart } from "@/lib/cart";

// Configure this URL as an endpoint in your Stripe dashboard (or via
// `stripe listen --forward-to localhost:3000/api/stripe/webhook` for local
// testing) once STRIPE_WEBHOOK_SECRET is set. This is the reliable path for
// marking orders paid — the /checkout/success page also does it as a
// same-request fallback, but a closed browser tab shouldn't lose the order.
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");

  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  const body = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const order = await prisma.order.findUnique({ where: { stripeSessionId: session.id } });
    if (order && order.status !== "paid") {
      await prisma.order.update({ where: { id: order.id }, data: { status: "paid" } });
      await clearCart(order.userId);
    }
  }

  return NextResponse.json({ received: true });
}
