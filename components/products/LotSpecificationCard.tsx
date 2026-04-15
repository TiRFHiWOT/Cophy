"use client";

import Image from "next/image";
import Link from "next/link";
import { CoffeeLot } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SampleRequestModal } from "@/components/inquiry/SampleRequestModal";
import { MapPin, Warehouse, Beaker, Thermometer, Box, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LotSpecificationCardProps {
  product: CoffeeLot;
  index?: number;
  featured?: boolean;
}

export function LotSpecificationCard({ product, index = 0, featured = false }: LotSpecificationCardProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const openInquiry = () => {
    setInquiryOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("h-full", featured ? "lg:col-span-2 lg:row-span-2" : "")}
    >
      <Card className="group overflow-hidden transition-all duration-500 border-lot-earth/20 shadow-none hover:border-lot-amber/40 h-full flex flex-col bg-white rounded-export group">
        <div className={cn("relative overflow-hidden bg-muted", featured ? "aspect-[16/9]" : "aspect-square")}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lot-forest/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="bg-lot-forest text-white px-3 py-1 rounded-[2px] text-[10px] font-mono font-bold tracking-widest uppercase border border-white/10 backdrop-blur-md">
              {product.lotNumber}
            </div>
            <div className="bg-white/90 text-lot-forest px-2 py-1 rounded-[2px] text-[10px] font-bold tracking-wider uppercase border border-lot-earth/20 backdrop-blur-md flex items-center gap-1">
              <MapPin className="h-3 w-3 text-lot-amber" />
              {product.region}
            </div>
          </div>

          {/* SCA Score Hero Badge */}
          <div className="absolute top-4 right-4 flex flex-col items-center">
            <div className="bg-lot-amber text-white p-3 md:p-4 rounded-full shadow-xl flex flex-col items-center justify-center border-2 border-white/20 transform group-hover:rotate-12 transition-transform duration-500">
              <span className="text-[10px] uppercase font-bold tracking-tighter leading-none opacity-80">SCA</span>
              <span className="text-xl md:text-2xl font-serif font-black leading-none">{product.scaScore}</span>
            </div>
          </div>
          
          {/* Featured Label */}
          {featured && (
            <div className="absolute bottom-4 left-4 bg-lot-amber text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg animate-pulse">
              Premium Lot
            </div>
          )}
        </div>

        <CardContent className="p-6 md:p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-serif font-bold text-xl md:text-2xl lg:text-3xl text-lot-forest leading-tight group-hover:text-lot-amber transition-colors">
              {product.name}
            </h3>
            <Link href={`/products/${product.slug}`} className="p-2 border border-lot-earth/20 rounded-full hover:bg-lot-paper transition-colors hidden sm:flex">
              <ArrowUpRight className="h-4 w-4 text-lot-earth" />
            </Link>
          </div>

          <p className="text-sm text-lot-earth mb-8 line-clamp-2 md:line-clamp-3 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Technical Specs Grid 2x2 */}
          <div className="grid grid-cols-2 gap-px bg-lot-earth/20 border border-lot-earth/20 mb-8 overflow-hidden rounded-sm">
            <div className="bg-white p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[10px] uppercase text-lot-earth font-bold tracking-widest">
                <Box className="h-3 w-3" />
                Process
              </div>
              <span className="text-sm font-semibold text-lot-forest">{product.processMethod}</span>
            </div>
            <div className="bg-white p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[10px] uppercase text-lot-earth font-bold tracking-widest">
                <Thermometer className="h-3 w-3" />
                Moisture
              </div>
              <span className="text-sm font-semibold text-lot-forest">{product.moistureContent}%</span>
            </div>
            <div className="bg-white p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[10px] uppercase text-lot-earth font-bold tracking-widest">
                <Warehouse className="h-3 w-3" />
                Altitude
              </div>
              <span className="text-sm font-semibold text-lot-forest truncate">{product.altitudeRange}</span>
            </div>
            <div className="bg-white p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[10px] uppercase text-lot-earth font-bold tracking-widest">
                <Box className="h-3 w-3" />
                Screen Size
              </div>
              <span className="text-sm font-semibold text-lot-forest truncate">{product.screenSize || "14/15"}</span>
            </div>
          </div>

          {/* Pricing Info (FOB Range) */}
          <div className="mb-8 flex items-end justify-between border-b border-lot-paper pb-4">
             <div>
                <p className="text-[10px] uppercase text-lot-earth font-bold tracking-widest mb-1">Indicative FOB Pricing</p>
                <p className="text-xl font-mono font-bold text-lot-forest">{product.fobPriceRange || `$${product.fobPriceUsd.toFixed(2)}/kg`}</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] uppercase text-lot-earth font-bold tracking-widest mb-1">Available</p>
                <p className="text-sm font-semibold text-lot-amber">{product.bagsAvailable} Bags (60kg)</p>
             </div>
          </div>

          {/* CTAs */}
          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={openInquiry}
              className="w-full h-12 text-xs font-bold uppercase tracking-widest bg-lot-forest hover:bg-lot-forest/90 text-white rounded-none border border-lot-forest shadow-md transition-all hover:translate-y-[-2px]"
            >
              Request Quote
            </Button>
            <Button
              onClick={openInquiry}
              variant="outline"
              className="w-full h-12 text-xs font-bold uppercase tracking-widest border-lot-forest/30 text-lot-forest hover:bg-lot-forest hover:text-white rounded-none transition-all"
            >
              Order Sample
            </Button>
          </div>
        </CardContent>
      </Card>

      <SampleRequestModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        product={product}
      />
    </motion.div>
  );
}
