import { CoffeeLot } from "@/types";
import { LotSpecificationCard } from "./LotSpecificationCard";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: CoffeeLot[];
  bento?: boolean;
}

export function ProductGrid({ products, bento = false }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No coffee lots found.</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "grid gap-6 md:gap-8",
      bento 
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" 
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    )}>
      {products.map((product, index) => (
        <LotSpecificationCard 
          key={product.id} 
          product={product} 
          index={index} 
          featured={bento && index === 0}
        />
      ))}
    </div>
  );
}
