import Hero from "@/components/sections/Hero";
import { BrandPhilosophy } from "@/components/sections/BrandPhilosophy";
import { LatestRelease } from "@/components/sections/LatestRelease";
import { CoffeeCollections } from "@/components/sections/CoffeeCollections";
import { SectionDivider } from "@/components/sections/SectionDivider";
import { ProducingPartners } from "@/components/sections/ProducingPartners";
import { Reviews } from "@/components/sections/Reviews";
import { Newsletter } from "@/components/sections/Newsletter";
import productsData from "@/data/products.json";
import { CoffeeLot } from "@/types";

export default function Home() {
  const products = productsData as unknown as CoffeeLot[];

  return (
    <div>
      <Hero />
      <BrandPhilosophy />
      <LatestRelease products={products} />
      <CoffeeCollections />
      <SectionDivider />
      <ProducingPartners />
      <Reviews />
      <Newsletter />
    </div>
  );
}
