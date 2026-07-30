import Stripe from "stripe";

let client: Stripe | null = null;

/** Throws with a clear message if STRIPE_SECRET_KEY isn't set yet, rather than a cryptic Stripe SDK error. */
export function getStripe(): Stripe {
  if (client) return client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add your Stripe test-mode secret key to .env to enable checkout."
    );
  }
  client = new Stripe(key);
  return client;
}
