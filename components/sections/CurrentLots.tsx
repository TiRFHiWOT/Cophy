"use client";

import { CoffeeLot } from "@/types";
import { ProductGrid } from "@/components/products/ProductGrid";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ListFilter } from "lucide-react";

interface CurrentLotsProps {
  products: CoffeeLot[];
}

export function CurrentLots({ products }: CurrentLotsProps) {
  // Only show top 3 featured products for a balanced row
  const featuredLots = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 h-40 w-px bg-lot-earth/10 hidden lg:block" />

      <div className="container px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <ListFilter className="h-4 w-4 text-lot-amber" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-lot-forest uppercase">
                2026 Season
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black text-lot-forest tracking-tighter">
              Current Offerings.
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 text-left md:text-right"
          >
            <p className="text-sm text-lot-earth max-w-md font-light">
              Browse our active export catalog. Every lot is verified by our Addis-based lab and ready for consolidation.
            </p>
            <Link href="/products" className="text-xs font-bold uppercase tracking-widest text-lot-amber hover:text-lot-forest transition-colors flex items-center justify-start md:justify-end gap-2 group">
              View Full Offer List
              <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Using bento={false} to ensure equal height 3-column grid */}
          <ProductGrid products={featuredLots} bento={false} />
        </motion.div>

        <div className="mt-20 flex flex-col items-center border-t border-lot-paper pt-12">
          <p className="text-[10px] font-bold text-lot-earth uppercase tracking-[0.3em] mb-8">
            Reliable Supply Chain · Direct From Origin
          </p>
          <Link href="/products">
            <Button variant="outline" className="border-lot-forest/20 text-lot-forest hover:bg-lot-forest hover:text-white rounded-none px-12 py-7 uppercase font-bold tracking-widest text-xs transition-all">
              Request Full Product Specifications
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
