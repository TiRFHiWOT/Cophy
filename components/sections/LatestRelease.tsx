"use client";

import { Product } from "@/types";
import { ProductGrid } from "@/components/products/ProductGrid";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LatestReleaseProps {
  products: Product[];
}

export function LatestRelease({ products }: LatestReleaseProps) {
  // Get the 4 most recent featured products
  const latest = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            LATEST RELEASE
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto"></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProductGrid products={latest} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link href="/products">
            <Button
              variant="outline"
              className="border-2 border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all"
            >
              VIEW ALL
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
