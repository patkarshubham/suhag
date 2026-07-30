/** All prices are stored in paise (1/100 INR), matching Stripe's smallest-unit convention. */

export function rupeesToPaise(rupees: string | number): number {
  const value = typeof rupees === "string" ? parseFloat(rupees) : rupees;
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 100);
}

export function paiseToRupees(paise: number): number {
  return paise / 100;
}

export function formatPaise(paise: number): string {
  return `₹${paiseToRupees(paise).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function discountPercent(mrp: number | null | undefined, price: number | null | undefined): number | null {
  if (!mrp || !price || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}
