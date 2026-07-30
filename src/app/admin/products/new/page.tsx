import { getCategories } from "@/lib/categories";
import ProductForm from "../ProductForm";
import { createProductAction } from "../actions";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal">Add Product</h1>
      <div className="mt-8">
        <ProductForm categories={categories} action={createProductAction} submitLabel="Add product" />
      </div>
    </div>
  );
}
