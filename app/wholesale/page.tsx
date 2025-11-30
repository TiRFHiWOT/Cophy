"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Coffee, Package, Users, ArrowRight } from "lucide-react";

export default function WholesalePage() {
  const handleContact = () => {
    window.location.href = "mailto:wholesale@cophy.com";
  };

  const offerings = [
    {
      icon: Coffee,
      title: "Roasted Coffee",
      description:
        "Freshly roasted specialty coffee beans for your cafe or restaurant.",
    },
    {
      icon: Package,
      title: "Green Coffee",
      description:
        "Premium green coffee beans for your own roasting operation.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description:
        "Ongoing support and training for your team to ensure success.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&h=1080&fit=crop"
          alt="Wholesale coffee partnership"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[hsl(var(--dark-green))]/80" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="container px-4 relative z-10 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-2xl">
                WHOLESALE
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 font-light leading-relaxed max-w-2xl mx-auto mb-8 drop-shadow-lg">
                Partner with us to bring exceptional specialty coffee to your
                business.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button
                  size="lg"
                  onClick={handleContact}
                  className="bg-white text-[hsl(var(--dark-green))] hover:bg-white/90 shadow-2xl text-base md:text-lg px-10 py-7 h-auto font-semibold"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            >
              {offerings.map((offering, index) => (
                <motion.div
                  key={offering.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <offering.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {offering.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {offering.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-[#F5F1EB]">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get Started
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Contact us to discuss wholesale pricing and partnership
                opportunities. We&apos;d love to work with you.
              </p>
              <Button
                size="lg"
                onClick={handleContact}
                className="text-base md:text-lg px-10 py-7 h-auto font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Wholesale Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
