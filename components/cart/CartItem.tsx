"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      <div className="relative w-24 h-24 shrink-0">
        <Image
          src={
            product.images[0] || "https://via.placeholder.com/96x96?text=Coffee"
          }
          alt={product.name}
          fill
          className="object-cover rounded-md"
          sizes="96px"
          unoptimized
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/96x96?text=Coffee";
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {formatPrice(product.price)} each
        </p>
        {item.grind && (
          <p className="text-xs text-muted-foreground">Grind: {item.grind}</p>
        )}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-semibold">
              {formatPrice(product.price * quantity)}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(product.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
