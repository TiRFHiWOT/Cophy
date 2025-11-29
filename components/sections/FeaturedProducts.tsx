import { Product } from "@/types";
import { ProductGrid } from "@/components/products/ProductGrid";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="py-12 bg-background">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <ProductGrid products={featured} />
      </div>
    </section>
  );
}
