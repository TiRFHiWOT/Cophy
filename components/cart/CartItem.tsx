"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatters";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <Card className="border-gray-200 shadow-none hover:border-gray-300 transition-colors">
      <div className="flex gap-4 md:gap-6 p-4 md:p-6">
        <Link
          href={`/products/${product.slug}`}
          className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-colors"
        >
          <Image
            src={
              product.images[0] ||
              "https://via.placeholder.com/128x128?text=Coffee"
            }
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 128px"
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/128x128?text=Coffee";
            }}
          />
        </Link>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1">
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-semibold text-lg md:text-xl mb-1 hover:text-primary transition-colors cursor-pointer">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-2">
              {formatPrice(product.price)} each
            </p>
            {item.grind && (
              <div className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium mb-2">
                Grind: {item.grind.replace("-", " ")}
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 cursor-pointer hover:bg-gray-100"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold text-lg">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 cursor-pointer hover:bg-gray-100"
                onClick={() => updateQuantity(product.id, quantity + 1)}
                disabled={quantity >= 99}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold text-lg md:text-xl text-primary">
                {formatPrice(product.price * quantity)}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                onClick={() => removeItem(product.id)}
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
