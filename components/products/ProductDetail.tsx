"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import {
  ShoppingCart,
  Minus,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Package,
  MapPin,
  Leaf,
} from "lucide-react";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [grind, setGrind] = useState<"whole-bean" | "filter" | "espresso">(
    "whole-bean"
  );
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity, grind);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted border border-gray-200">
            <Image
              src={
                product.images[selectedImage] ||
                product.images[0] ||
                "https://via.placeholder.com/600x600?text=Coffee"
              }
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.featured && (
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border-2 border-white/20">
                Featured
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-background px-4 py-2 rounded-lg font-semibold text-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                    selectedImage === index
                      ? "border-primary scale-105"
                      : "border-transparent hover:border-primary/50"
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
                  />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="pt-6">
            <h2 className="font-semibold text-xl mb-3">Description</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {product.category && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase tracking-wide">
                  {product.category}
                </span>
              )}
              {product.score && (
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                  Score: {product.score}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl md:text-5xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
            </div>
          </div>

          {/* Tasting Notes */}
          <div>
            <h2 className="font-semibold mb-3 text-lg">Tasting Notes</h2>
            <div className="flex flex-wrap gap-2">
              {product.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="px-4 py-2 bg-muted hover:bg-primary/10 rounded-full text-sm font-medium transition-colors cursor-default"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Purchase Card */}
          <Card className="border-gray-300 shadow-none overflow-visible relative z-0">
            {/* Price Section */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
              </div>
              {product.inStock ? (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-sm text-muted-foreground">
                    In Stock • Ready to ship
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <p className="text-sm text-destructive">Out of Stock</p>
                </div>
              )}
            </div>

            <CardContent className="p-6 space-y-5">
              {/* Grind Type */}
              <div className="flex flex-col gap-2.5">
                <Label className="text-sm font-semibold text-foreground">
                  Grind Type
                </Label>
                <Select
                  value={grind}
                  onValueChange={(value) =>
                    setGrind(value as "whole-bean" | "filter" | "espresso")
                  }
                >
                  <SelectTrigger
                    className="w-full h-11 border-gray-300"
                    aria-label="Select grind type"
                  >
                    <SelectValue placeholder="Select grind type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whole-bean">Whole Bean</SelectItem>
                    <SelectItem value="filter">Filter Grind</SelectItem>
                    <SelectItem value="espresso">Espresso Grind</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity and Subtotal */}
              <div className="flex flex-col gap-2.5">
                <Label className="text-sm font-semibold text-foreground">
                  Quantity
                </Label>
                <div className="flex items-center gap-4 justify-between">
                  <div className="flex items-center gap-3 w-fit">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-11 w-11 hover:bg-gray-400/10 cursor-pointer"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-xl font-semibold min-w-[3rem] text-center">
                        {quantity}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= 99}
                      className="h-11 w-11 hover:bg-gray-400/10 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col items-end min-w-[120px]">
                    <span className="text-xs text-muted-foreground mb-1">
                      Subtotal
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full h-12 text-base font-semibold cursor-pointer"
                size="lg"
                disabled={!product.inStock}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </>
                )}
              </Button>

              {/* Shipping Info */}
              {product.inStock && (
                <div className="pt-2">
                  <p className="text-xs text-center text-muted-foreground">
                    <span className="font-medium">Free shipping</span> on orders
                    over {formatPrice(150)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Information */}
          <Card className="border-gray-300 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold block mb-1">Origin</span>
                  <span className="text-muted-foreground">
                    {product.origin}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Leaf className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold block mb-1">Process</span>
                  <span className="text-muted-foreground">
                    {product.process}
                  </span>
                </div>
              </div>
              {product.producer && (
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Producer</span>
                    <span className="text-muted-foreground">
                      {product.producer}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
