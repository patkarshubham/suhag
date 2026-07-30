import { redirect } from "next/navigation";
import Image from "next/image";
import { getCurrentUserId } from "@/lib/customerSession";
import { prisma } from "@/lib/db";
import { formatPaise } from "@/lib/money";
import { cn } from "@/lib/utils";

export default async function OrdersPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login?from=/account/orders");

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <h1 className="font-display text-3xl text-charcoal">Your orders</h1>

      {orders.length === 0 && <p className="mt-8 text-charcoal-soft">No orders yet.</p>}

      <div className="mt-8 space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-charcoal/10 p-5">
            <div className="flex items-center justify-between">
              <p className="font-medium text-charcoal">Order #{order.id.slice(-8)}</p>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                  order.status === "paid"
                    ? "bg-maroon text-ivory"
                    : "bg-charcoal/10 text-charcoal-soft"
                )}
              >
                {order.status}
              </span>
            </div>
            <p className="text-xs text-charcoal-soft">{order.createdAt.toLocaleDateString()}</p>
            <div className="mt-3 divide-y divide-charcoal/10">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-blush">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="text-charcoal">{item.name}</p>
                    <p className="text-charcoal-soft">
                      Qty {item.quantity} · {formatPaise(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-right font-medium text-charcoal">
              Total {formatPaise(order.total)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
