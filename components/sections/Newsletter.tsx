"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="py-12 bg-muted">
      <div className="container px-4 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Newsletter</h2>
        <p className="text-muted-foreground mb-6">
          Join to get special offers, free giveaways, and once-in-a-lifetime
          deals.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={submitted}>
            {submitted ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}
