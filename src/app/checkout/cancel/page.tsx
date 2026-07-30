import AnimatedButton from "@/components/AnimatedButton";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center sm:px-8">
      <h1 className="font-display text-3xl text-charcoal">Payment cancelled</h1>
      <p className="mt-2 text-charcoal-soft">
        Your cart is still saved — you can pick up checkout whenever you&apos;re ready.
      </p>
      <AnimatedButton href="/cart" className="mt-8 inline-flex">
        Back to Cart
      </AnimatedButton>
    </div>
  );
}
