import { CoffeeLot } from "@/types";
import { LotSpecificationCard } from "./LotSpecificationCard";

interface ProductGridProps {
  products: CoffeeLot[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No coffee lots found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <LotSpecificationCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
