"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { ShoppingCart, Star, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addItem(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 shadow-none hover:border-gray-300 h-full flex flex-col">
        <Link href={`/products/${product.slug}`} className="relative block">
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            <Image
              src={
                product.images[0] ||
                "https://via.placeholder.com/400x400?text=Coffee"
              }
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Featured badge */}
            {product.featured && (
              <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border-2 border-white/20">
                Featured
              </div>
            )}

            {/* Stock status badge */}
            {!product.inStock && (
              <div className="absolute top-3 right-3 bg-gray-800/90 text-white px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
                Out of Stock
              </div>
            )}
          </div>
        </Link>

        <CardContent className="p-5 flex-1 flex flex-col">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-lg md:text-xl mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer min-h-[3.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Price and Score */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <p className="text-sm text-muted-foreground line-through mt-0.5">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
            </div>
            {product.score && (
              <div className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-full">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="text-sm font-semibold">{product.score}</span>
              </div>
            )}
          </div>

          {/* Tasting Notes */}
          {product.tastingNotes && product.tastingNotes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.tastingNotes.slice(0, 3).map((note) => (
                <span
                  key={note}
                  className="text-xs px-2.5 py-1 bg-primary/10 text-gray-600 font-medium"
                >
                  {note}
                </span>
              ))}
              {product.tastingNotes.length > 3 && (
                <span className="text-xs px-2.5 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                  +{product.tastingNotes.length - 3}
                </span>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full h-11 text-base font-semibold cursor-pointer"
            disabled={!product.inStock}
            size="lg"
          >
            {addedToCart ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
