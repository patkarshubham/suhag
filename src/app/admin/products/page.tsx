import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/products";
import { deleteProductAction } from "./actions";
import DeleteButton from "./DeleteButton";

export default async function AdminProductsPage() {
  const products = await getAllProducts();
  const sorted = [...products].reverse(); // newest first

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-charcoal">Products ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-maroon px-5 py-2 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
        >
          + Add Product
        </Link>
      </div>

      <div className="mt-8 divide-y divide-charcoal/10 rounded-2xl border border-charcoal/10 bg-white">
        {sorted.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-blush">
              <Image src={p.image} alt={p.name} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-charcoal">{p.name}</p>
              <p className="text-xs text-charcoal-soft">
                {p.categoryName}
                {p.badge ? ` · ${p.badge}` : ""}
              </p>
            </div>
            <Link
              href={`/admin/products/${p.id}/edit`}
              className="text-sm font-medium text-maroon hover:underline"
            >
              Edit
            </Link>
            <form action={deleteProductAction.bind(null, p.id)}>
              <DeleteButton productName={p.name} />
            </form>
          </div>
        ))}
        {sorted.length === 0 && (
          <p className="p-6 text-sm text-charcoal-soft">No products yet.</p>
        )}
      </div>
    </div>
  );
}
