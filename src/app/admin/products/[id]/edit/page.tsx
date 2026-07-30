import { notFound } from "next/navigation";
import { getCategories } from "@/lib/categories";
import { getProductById } from "@/lib/products";
import ProductForm from "../../ProductForm";
import { updateProductAction } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, product] = await Promise.all([getCategories(), getProductById(id)]);

  if (!product) notFound();

  const boundAction = updateProductAction.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal">Edit {product.name}</h1>
      <div className="mt-8">
        <ProductForm
          categories={categories}
          product={product}
          action={boundAction}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
