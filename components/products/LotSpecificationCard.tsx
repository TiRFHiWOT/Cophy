"use client";

import Image from "next/image";
import Link from "next/link";
import { CoffeeLot } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { SampleRequestModal } from "@/components/inquiry/SampleRequestModal";
import { Star, MapPin, Warehouse } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface LotSpecificationCardProps {
  product: CoffeeLot;
  index?: number;
}

export function LotSpecificationCard({ product, index = 0 }: LotSpecificationCardProps) {
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
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-[#D9C5B2]/30 shadow-none hover:border-[#D9C5B2] h-full flex flex-col bg-white">
        <Link href={`/products/${product.slug}`} className="relative block">
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            <Image
              src={
                product.images[0] ||
                "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop"
              }
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Lot Number badge */}
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-export text-xs font-mono font-bold tracking-widest uppercase shadow-lg backdrop-blur-md border border-white/10">
              LOT: {product.lotNumber}
            </div>

            {/* SCA Score badge */}
            <div className="absolute top-3 right-3 bg-background/90 text-foreground px-2.5 py-1.5 rounded-export text-xs font-bold backdrop-blur-md border border-border/40 flex items-center gap-1">
              <Star className="h-3 w-3 text-primary" />
              {product.scaScore}
            </div>
          </div>
        </Link>

        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-[#454848] font-medium mb-2 uppercase tracking-tight">
            <MapPin className="h-3 w-3" />
            {product.region}
          </div>
          
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif font-bold text-xl mb-3 line-clamp-2 hover:text-[#1B3022] transition-colors cursor-pointer text-[#1B3022]">
              {product.name}
            </h3>
          </Link>

          {/* Technical Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex flex-col border-l-2 border-primary/50 pl-2">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">Process</span>
              <span className="text-sm font-medium text-foreground">{product.processMethod}</span>
            </div>
            <div className="flex flex-col border-l-2 border-primary/50 pl-2">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">Moisture</span>
              <span className="text-sm font-medium text-foreground">{product.moistureContent || "11"}%</span>
            </div>
            <div className="flex flex-col border-l-2 border-primary/50 pl-2">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">SCA Score</span>
              <span className="text-sm font-medium text-foreground">{product.scaScore}</span>
            </div>
            <div className="flex flex-col border-l-2 border-primary/50 pl-2">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">Altitude</span>
              <span className="text-sm font-medium text-foreground">{product.altitude || "1800m"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4 text-xs font-medium text-muted-foreground">
            <Warehouse className="h-3.5 w-3.5" />
            <span>Station: {product.washingStation}</span>
          </div>

          <div className="mt-auto">
            <p className="text-sm text-muted-foreground font-medium mb-1">Price (FOB)</p>
            <p className="text-2xl font-bold text-foreground">
              {formatPrice(product.fobPriceUsd)} <span className="text-xs font-normal text-muted-foreground italic">/ kg</span>
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 gap-2">
          <Button
            onClick={openInquiry}
            className="w-full h-10 text-xs font-bold uppercase tracking-wider bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-export cursor-pointer"
            variant="default"
          >
            Request Sample
          </Button>
        </CardFooter>
      </Card>

      {/* Inquiry Modal */}
      <SampleRequestModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        product={product}
      />
    </motion.div>
  );
}
