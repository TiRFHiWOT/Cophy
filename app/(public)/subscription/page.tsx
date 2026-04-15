"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { Check, CheckCircle } from "lucide-react";

export default function SubscriptionPage() {
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null);

  const handleSubscribe = (planId: string) => {
    // Mock subscription
    setSubscribedPlan(planId);
    // In a real app, this would make an API call
  };

  const plans = [
    {
      id: "casual",
      name: "CASUAL",
      description: "Capsule Box of 12",
      price: 45,
      features: ["12 capsules", "Flexible delivery", "Cancel anytime"],
    },
    {
      id: "daily",
      name: "DAILY HABIT",
      description: "Capsule Box of 52",
      price: 180,
      features: [
        "52 capsules",
        "Weekly delivery",
        "Best value",
        "Cancel anytime",
      ],
    },
  ];

  return (
    <div className="container px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Subscription</h1>
        <p className="text-lg text-muted-foreground">
          Never run out of your favorite coffee. Choose a subscription plan that
          fits your lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <p className="text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {formatPrice(plan.price)}
                </span>
                <span className="text-muted-foreground"> / box</span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {subscribedPlan === plan.id ? (
                <Button className="w-full" size="lg" variant="outline" disabled>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Subscribed
                </Button>
              ) : (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleSubscribe(plan.id)}
                >
                  Subscribe Now
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
