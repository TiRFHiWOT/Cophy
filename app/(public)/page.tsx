import { HeroMinimalist as Hero } from "@/components/sections/HeroMinimalist";
import { WhyLot251 } from "@/components/sections/WhyLot251";
import { CurrentLots } from "@/components/sections/CurrentLots";
import { OriginShowcase } from "@/components/sections/OriginShowcase";
import { SectionDivider } from "@/components/sections/SectionDivider";
import { OriginPartners } from "@/components/sections/OriginPartners";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import productsData from "@/data/products.json";
import { CoffeeLot } from "@/types";

export default function Home() {
  const products = productsData as unknown as CoffeeLot[];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Industrial Hero Section */}
      <Hero />
      
      {/* 2. Technical Excellence & Logistics (Why Us) */}
      <WhyLot251 />
      
      {/* 3. Current Offerings (Bento Grid) */}
      <CurrentLots products={products} />
      
      {/* 4. Genetic Origins (Regions Showcase) */}
      <OriginShowcase />
      
      {/* 5. Section Divider with Industrial Motion */}
      <SectionDivider />
      
      {/* 6. Washing Stations & Partners */}
      <OriginPartners />
      
      {/* 7. B2B Testimonials (Importers/Roasters) */}
      <Testimonials />
      
      {/* 8. Market Intelligence (Newsletter) */}
      <Newsletter />
    </div>
  );
}
