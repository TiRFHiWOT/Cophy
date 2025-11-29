import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/ProductDetail";
import productsData from "@/data/products.json";
import { Product } from "@/types";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = productsData as Product[];
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container px-4 py-12">
      <ProductDetail product={product} />
    </div>
  );
}
