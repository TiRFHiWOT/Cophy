"use client";

import Image from "next/image";
import Link from "next/link";
import { CoffeeLot } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { InquiryModal } from "@/components/inquiry/InquiryModal";
import { ClipboardList, Star, FlaskConical, MapPin, Warehouse } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  product: CoffeeLot;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<"sample" | "quote">("sample");

  const openInquiry = (type: "sample" | "quote") => {
    setInquiryType(type);
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
            <div className="absolute top-3 left-3 bg-[#1B3022] text-white px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-widest uppercase shadow-lg border border-white/10">
              LOT: {product.lotNumber}
            </div>

            {/* SCA Score badge */}
            <div className="absolute top-3 right-3 bg-white/90 text-[#1B3022] px-2.5 py-1.5 rounded-sm text-xs font-bold backdrop-blur-sm border border-[#1B3022]/10 flex items-center gap-1">
              <Star className="h-3 w-3 fill-[#1B3022]" />
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
            <div className="flex flex-col border-l-2 border-[#D9C5B2] pl-2">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">Process</span>
              <span className="text-sm font-medium text-[#454848]">{product.processMethod}</span>
            </div>
            <div className="flex flex-col border-l-2 border-[#D9C5B2] pl-2">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">Moisture</span>
              <span className="text-sm font-medium text-[#454848]">{product.moistureContent}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4 text-xs font-medium text-[#454848]/80">
            <Warehouse className="h-3.5 w-3.5" />
            <span>Station: {product.washingStation}</span>
          </div>

          <div className="mt-auto">
            <p className="text-sm text-muted-foreground font-medium mb-1">Price (FOB)</p>
            <p className="text-2xl font-bold text-[#1B3022]">
              {formatPrice(product.fobPriceUsd)} <span className="text-xs font-normal text-muted-foreground italic">/ kg</span>
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 gap-2">
          <Button
            onClick={() => openInquiry("sample")}
            className="flex-1 h-10 text-xs font-bold uppercase tracking-wider bg-[#1B3022] hover:bg-[#2c4c36] text-white rounded-none cursor-pointer"
            variant="default"
          >
            Request Sample
          </Button>
          <Button
            onClick={() => openInquiry("quote")}
            variant="outline"
            className="flex-1 h-10 text-xs font-bold uppercase tracking-wider border-[#1B3022] text-[#1B3022] hover:bg-[#1B3022] hover:text-white rounded-none cursor-pointer"
          >
            Request Quote
          </Button>
        </CardFooter>
      </Card>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        product={product}
        type={inquiryType}
      />
    </motion.div>
  );
}
