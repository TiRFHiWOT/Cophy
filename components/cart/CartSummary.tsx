"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, CheckCircle2 } from "lucide-react";

export function CartSummary() {
  const { items, getTotalPrice } = useCart();
  const total = getTotalPrice();
  const freeShippingThreshold = 150;
  const shipping = total > freeShippingThreshold ? 0 : 20;
  const finalTotal = total + shipping;
  const amountNeeded = freeShippingThreshold - total;

  return (
    <Card className="border-gray-200 shadow-none sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between text-base">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-muted-foreground">Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-primary font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Free
                </span>
              ) : (
                formatPrice(shipping)
              )}
            </span>
          </div>
          {total < freeShippingThreshold && (
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-2">
                <Truck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="text-xs">
                  <p className="font-medium text-primary mb-1">
                    Add {formatPrice(amountNeeded)} more for free shipping!
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          (total / freeShippingThreshold) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>
        <Link href="/checkout" className="block">
          <Button
            className="w-full h-12 text-base font-semibold cursor-pointer"
            disabled={items.length === 0}
            size="lg"
          >
            Proceed to Checkout
          </Button>
        </Link>
        {items.length > 0 && (
          <p className="text-xs text-center text-muted-foreground">
            Secure checkout • Free returns
          </p>
        )}
      </CardContent>
    </Card>
  );
}
