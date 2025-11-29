"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CartSummary() {
  const { items, getTotalPrice } = useCart();
  const total = getTotalPrice();
  const shipping = total > 150 ? 0 : 20; // Free shipping over 150 AED
  const finalTotal = total + shipping;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                formatPrice(shipping)
              )}
            </span>
          </div>
          {total < 150 && (
            <p className="text-xs text-muted-foreground">
              Add {formatPrice(150 - total)} more for free shipping!
            </p>
          )}
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
        </div>
        <Link href="/checkout" className="block">
          <Button className="w-full" disabled={items.length === 0}>
            Proceed to Checkout
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
