"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CoffeeLot } from "@/types";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { InquiryModal } from "@/components/inquiry/InquiryModal";
import {
  ArrowLeft,
  Leaf,
  Star,
  FlaskConical,
  Warehouse,
  Scale,
  Calendar,
  FileText
} from "lucide-react";

interface ProductDetailProps {
  product: CoffeeLot;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<"sample" | "quote">("sample");

  const openInquiry = (type: "sample" | "quote") => {
    setInquiryType(type);
    setInquiryOpen(true);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-[#1B3022]/60 hover:text-[#1B3022] transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden bg-white border border-[#D9C5B2]/30 shadow-sm">
              <Image
                src={
                  product.images[selectedImage] ||
                  product.images[0] ||
                  "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop"
                }
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Lot Label */}
              <div className="absolute top-4 left-4 bg-[#1B3022] text-white px-4 py-2 font-bold tracking-widest text-xs uppercase shadow-xl">
                LOT: {product.lotNumber}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      selectedImage === index
                        ? "border-[#1B3022] scale-105"
                        : "border-transparent hover:border-[#D9C5B2]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-[#454848] uppercase bg-[#D9C5B2]/20 px-2.5 py-1">
                {product.region}
              </span>
              <div className="flex items-center gap-1 bg-[#1B3022]/5 px-2.5 py-1 border border-[#1B3022]/10">
                <Star className="h-3 w-3 fill-[#1B3022] text-[#1B3022]" />
                <span className="text-xs font-bold text-[#1B3022]">SCA: {product.scaScore}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1B3022] mb-6 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="mb-8">
              <p className="text-[#454848] leading-relaxed text-lg italic border-l-4 border-[#D9C5B2] pl-6 py-2 bg-gray-50/50">
                {product.description}
              </p>
            </div>

            {/* Technical Data Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 border-y border-[#D9C5B2]/30 py-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#454848]/60 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <FlaskConical className="h-3 w-3" /> Process
                </span>
                <span className="text-lg font-bold text-[#1B3022]">{product.processMethod}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#454848]/60 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Scale className="h-3 w-3" /> Moisture
                </span>
                <span className="text-lg font-bold text-[#1B3022]">{product.moistureContent}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#454848]/60 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Leaf className="h-3 w-3" /> Density
                </span>
                <span className="text-lg font-bold text-[#1B3022]">Grade 1</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#454848]/60 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> Crop Year
                </span>
                <span className="text-lg font-bold text-[#1B3022]">{product.harvestYear}/{product.harvestYear + 1}</span>
              </div>
            </div>

            {/* Purchase Details */}
            <div className="bg-[#1B3022]/5 p-8 border border-[#1B3022]/10 mb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <p className="text-xs font-bold text-[#454848]/60 uppercase tracking-widest mb-2">Target FOB Price (USD)</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[#1B3022]">{formatPrice(product.fobPriceUsd)}</span>
                    <span className="text-sm font-medium text-[#454848]/60 uppercase tracking-tighter">per kg</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#454848]/60 uppercase tracking-widest mb-2">Available Quantity</p>
                  <span className="text-xl font-bold text-[#1B3022]">{product.bagsAvailable} Bags</span>
                  <p className="text-[10px] text-[#454848]/60 mt-1 italic">Approx. {product.bagsAvailable * product.bagWeightKg}kg total</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => openInquiry("sample")}
                  className="flex-1 h-14 bg-[#1B3022] hover:bg-[#2c4c36] text-white rounded-none font-bold uppercase tracking-widest text-xs cursor-pointer"
                >
                  Request 200g Sample
                </Button>
                <Button
                  onClick={() => openInquiry("quote")}
                  variant="outline"
                  className="flex-1 h-14 border-2 border-[#1B3022] text-[#1B3022] hover:bg-[#1B3022] hover:text-white rounded-none font-bold uppercase tracking-widest text-xs transition-all cursor-pointer"
                >
                  Request Quote (FCL/LCL)
                </Button>
              </div>
            </div>

            {/* Production Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-[#D9C5B2]/20 flex items-center justify-center shrink-0">
                  <Warehouse className="h-5 w-5 text-[#1B3022]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-1.5">Washing Station</h3>
                  <p className="text-sm text-[#454848]">{product.washingStation}</p>
                  <p className="text-xs text-[#454848]/60 mt-1">{product.altitudeRange} • {product.region}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-[#D9C5B2]/20 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-[#1B3022]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-1.5">Compliance</h3>
                  <p className="text-sm text-[#454848]">Fair Trade, Organic (NOP/EU)</p>
                  <button className="text-[10px] text-[#1B3022] font-bold underline mt-1 uppercase tracking-tighter">View Certificates</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        product={product}
        type={inquiryType}
      />
    </>
  );
}
