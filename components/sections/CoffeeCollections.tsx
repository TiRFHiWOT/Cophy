"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import collectionsData from "@/data/collections.json";

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products: string[];
}

export function CoffeeCollections() {
  const collections = collectionsData as Collection[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="w-full bg-[hsl(var(--dark-green))] text-white py-16 md:py-24">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            COFFEE SELECTIONS
          </h2>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {collections.slice(0, 6).map((collection) => (
            <motion.div
              key={collection.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg"
            >
              <Link href={`/products?collection=${collection.slug}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm md:text-base text-white/90 mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                    <Button
                      variant="outline"
                      className="border-2 border-white/50 bg-transparent text-white hover:bg-white hover:text-[hsl(var(--dark-green))] transition-all"
                    >
                      VIEW ALL
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
