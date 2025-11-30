"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { CheckCircle, Loader2, ArrowLeft, Package, Truck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const total = getTotalPrice();
  const shipping = total > 150 ? 0 : 20;
  const finalTotal = total + shipping;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setOrderPlaced(true);
    clearCart();
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  if (orderPlaced) {
    return (
      <div className="container px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-6">
              <CheckCircle className="h-20 w-20 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Placed!</h1>
          <p className="text-muted-foreground mb-10 text-lg">
            Thank you for your order. You will receive a confirmation email
            shortly with your order details.
          </p>
          <Link href="/products">
            <Button size="lg" className="cursor-pointer">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Add items to your cart to proceed to checkout
          </p>
          <Link href="/products">
            <Button size="lg" className="cursor-pointer">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-2">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Checkout
          </h1>
        </div>
        <p className="text-muted-foreground ml-14">Complete your order below</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="border-gray-200 shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 font-medium mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 font-medium mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+251 9XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 font-medium mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-semibold">
                    Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="Street address, apartment, suite, etc."
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600 font-medium mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-semibold">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="Addis Ababa"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-600 font-medium mt-1">
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-sm font-semibold">
                      ZIP Code <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="zipCode"
                      placeholder="1000"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      className={errors.zipCode ? "border-destructive" : ""}
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-red-600 font-medium mt-1">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold cursor-pointer"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Package className="mr-2 h-5 w-5" />
                      Place Order
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-gray-200 shadow-none sticky top-24">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 pb-4 border-b last:border-b-0"
                  >
                    <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={
                          item.product.images[0] ||
                          "https://via.placeholder.com/64x64?text=Coffee"
                        }
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                        {item.product.name}
                      </h4>
                      {item.grind && (
                        <p className="text-xs text-muted-foreground mb-1">
                          {item.grind.replace("-", " ")}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-primary">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground pt-2">
                Secure checkout • Free returns
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
