import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/ProductDetail";
import productsData from "@/data/products.json";
import { Product } from "@/types";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const products = productsData as Product[];
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container px-4 py-8">
      <ProductDetail product={product} />
    </div>
  );
}
