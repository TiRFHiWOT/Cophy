"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { ShoppingCart, Minus, Plus } from "lucide-react";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [grind, setGrind] = useState<"whole-bean" | "filter" | "espresso">(
    "whole-bean"
  );
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity, grind);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Images */}
      <div className="space-y-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={
              product.images[selectedImage] ||
              product.images[0] ||
              "https://via.placeholder.com/600x600?text=Coffee"
            }
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/600x600?text=Coffee";
            }}
          />
        </div>
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-md border-2 ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={
                    image || "https://via.placeholder.com/150x150?text=Coffee"
                  }
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 25vw, 12.5vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/150x150?text=Coffee";
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          {product.score && (
            <p className="text-lg text-muted-foreground mb-4">
              Score: {product.score}
            </p>
          )}
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-4xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Tasting Notes</h2>
          <div className="flex flex-wrap gap-2">
            {product.tastingNotes.map((note) => (
              <span
                key={note}
                className="px-3 py-1 bg-muted rounded-full text-sm"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Grind Type
              </label>
              <Select
                value={grind}
                onChange={(e) => setGrind(e.target.value as typeof grind)}
              >
                <option value="whole-bean">Whole Bean</option>
                <option value="filter">Filter Grind</option>
                <option value="espresso">Espresso Grind</option>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="lg"
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4 text-sm">
          <div>
            <span className="font-semibold">Origin:</span> {product.origin}
          </div>
          <div>
            <span className="font-semibold">Process:</span> {product.process}
          </div>
          {product.producer && (
            <div>
              <span className="font-semibold">Producer:</span>{" "}
              {product.producer}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
