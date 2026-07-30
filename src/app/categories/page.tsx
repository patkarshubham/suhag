import type { Metadata } from "next";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import { getCategories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "All Categories",
  description:
    "Browse every wedding category Suhag curates — pooja samagri kits, invitations, wear, jewelry, decor, catering, photography, gifts, and venues.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Browse"
        title="All categories"
        subtitle="Eleven curated categories covering everything a wedding needs, from the first pooja to the final send-off."
      />
      <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <StaggerItem key={category.slug}>
            <CategoryCard category={category} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
