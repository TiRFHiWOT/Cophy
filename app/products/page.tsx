import { ProductGrid } from "@/components/products/ProductGrid";
import productsData from "@/data/products.json";
import { Product } from "@/types";

export default function ProductsPage() {
  const products = productsData as Product[];

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Coffee</h1>
        <p className="text-muted-foreground text-lg">
          Sourced in season and roasted with care to honor the producers' hard
          work
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
