import Image from "next/image";
import type { Category } from "@/lib/categories";
import type { Product } from "@/lib/products";
import { paiseToRupees } from "@/lib/money";

export default function ProductForm({
  categories,
  product,
  action,
  submitLabel,
}: {
  categories: Category[];
  product?: Product;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
        Product name
        <input
          name="name"
          required
          defaultValue={product?.name}
          className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          placeholder="Kundan Bridal Necklace Set"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
        Category
        <select
          name="categorySlug"
          required
          defaultValue={product?.categorySlug}
          className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
        >
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          MRP (₹, optional)
          <input
            name="mrp"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.mrp != null ? paiseToRupees(product.mrp) : ""}
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
            placeholder="1999"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          Selling price (₹, optional)
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price != null ? paiseToRupees(product.price) : ""}
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
            placeholder="1499"
          />
        </label>
      </div>
      <p className="-mt-4 text-xs text-charcoal-soft">
        Leave both blank to keep this product &quot;enquire only&quot; (no cart/buy button). Set a
        selling price to enable Add to Cart; add an MRP too if you want a struck-through discount price.
      </p>

      <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
        Description
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={product?.description}
          className="resize-none rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
        />
      </label>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-charcoal">
          Main image {product ? "(leave empty to keep current)" : ""}
        </label>
        {product && (
          <div className="relative size-24 overflow-hidden rounded-lg bg-blush">
            <Image src={product.image} alt="" fill className="object-cover" />
          </div>
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          required={!product}
          className="text-sm text-charcoal-soft file:mr-4 file:rounded-full file:border-0 file:bg-maroon file:px-4 file:py-2 file:text-sm file:font-medium file:text-ivory"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-charcoal">
          Additional gallery images (optional)
        </label>
        {product && product.gallery.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {product.gallery.slice(1).map((src) => (
              <div key={src} className="relative size-16 overflow-hidden rounded-lg bg-blush">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          name="gallery"
          accept="image/*"
          multiple
          className="text-sm text-charcoal-soft file:mr-4 file:rounded-full file:border-0 file:bg-charcoal/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-charcoal"
        />
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
        Highlights / what&apos;s included (one per line, optional)
        <textarea
          name="highlights"
          rows={4}
          defaultValue={product?.highlights.join("\n")}
          className="resize-none rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          placeholder={"Antique gold finish\nMatching earrings & tikka\nAdjustable back chain"}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
        Badge (optional, e.g. &quot;Bestseller&quot;)
        <input
          name="badge"
          defaultValue={product?.badge ?? ""}
          className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          placeholder="Bestseller"
        />
      </label>

      <button
        type="submit"
        className="rounded-full bg-maroon px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
      >
        {submitLabel}
      </button>
    </form>
  );
}
