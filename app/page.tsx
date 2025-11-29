import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Newsletter } from "@/components/sections/Newsletter";
import { Values } from "@/components/sections/Values";
import productsData from "@/data/products.json";
import { Product } from "@/types";

export default function Home() {
  const products = productsData as Product[];

  return (
    <div>
      <Hero />
      <Values />
      <FeaturedProducts products={products} />
      <Newsletter />
    </div>
  );
}
