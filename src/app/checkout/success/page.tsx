import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { clearCart } from "@/lib/cart";
import AnimatedButton from "@/components/AnimatedButton";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let confirmed = false;
  let orderId: string | null = null;

  if (session_id) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(session_id);
      const order = await prisma.order.findUnique({ where: { stripeSessionId: session_id } });
      if (order) {
        orderId = order.id;
        if (session.payment_status === "paid" && order.status !== "paid") {
          await prisma.order.update({ where: { id: order.id }, data: { status: "paid" } });
          await clearCart(order.userId);
        }
        confirmed = session.payment_status === "paid";
      }
    } catch {
      confirmed = false;
    }
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center sm:px-8">
      <CheckCircle2
        className={confirmed ? "mx-auto text-maroon" : "mx-auto text-charcoal-soft"}
        size={48}
      />
      <h1 className="mt-4 font-display text-3xl text-charcoal">
        {confirmed ? "Order confirmed!" : "Thanks — we're confirming your payment"}
      </h1>
      <p className="mt-2 text-charcoal-soft">
        {confirmed
          ? `Your order${orderId ? ` #${orderId.slice(-8)}` : ""} has been placed. We'll be in touch about delivery.`
          : "This can take a moment. Check your order history shortly."}
      </p>
      <AnimatedButton href="/account/orders" className="mt-8 inline-flex">
        View Orders
      </AnimatedButton>
    </div>
  );
}
