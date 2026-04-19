"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1200&h=800&fit=crop"
];

const SLIDE_DURATION = 5000;

export function HeroMinimalist() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-lot-paper">
      <section className="relative w-full min-h-[calc(100vh-148px)] flex flex-col justify-between overflow-hidden lg:pt-20">
        {/* Background Subtle Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none opacity-[0.02] z-0">
          <h2 className="text-[35vw] font-serif font-black leading-none text-lot-forest italic">LOT251</h2>
        </div>

        <div className="container relative z-10 px-4 md:px-6 py-12 lg:py-0 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-24 items-center">
            {/* Title Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 text-center lg:text-left xl:max-w-4xl"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                <Globe className="h-3.5 w-3.5 text-lot-amber" />
                <span className="text-[10px] font-black tracking-[0.4em] text-lot-forest uppercase">
                  Addis Ababa — Global Logistics
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[7vw] xl:text-[6.5vw] 2xl:text-9xl font-serif font-black text-lot-forest leading-[0.85] tracking-tighter uppercase italic mb-0">
                Legacy <br />
                <span className="text-lot-amber">Sourcing.</span>
              </h1>
            </motion.div>

            {/* Right Column: Description & Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-10"
            >
              <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                <p className="text-sm md:text-base text-lot-earth font-medium leading-relaxed max-w-sm border-l-0 lg:border-l-2 border-lot-amber/30 lg:pl-6">
                  Ethiopian specialty coffee export system optimized for the modern roaster. Traceable, technical, and uncompromising.
                </p>
                <Link href="/products" className="w-full sm:w-max">
                  <Button className="bg-lot-forest hover:bg-lot-forest/90 text-white rounded-none h-14 md:h-16 px-10 text-[10px] font-bold uppercase tracking-[0.3em] w-full sm:w-auto shadow-xl">
                    Explore Archives
                  </Button>
                </Link>
              </div>

              {/* Dynamic Image with Synchronized Progress Bar */}
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] bg-lot-forest overflow-hidden shadow-2xl">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{
                      x: { type: "spring", stiffness: 200, damping: 25 },
                      opacity: { duration: 0.5 }
                    }}
                    className="absolute inset-0 group/hero-img"
                  >
                    <Image
                      src={heroImages[currentImageIndex]}
                      alt="Specialty Coffee Origin"
                      fill
                      priority
                      className="object-cover grayscale group-hover/hero-img:grayscale-0 transition-all duration-700 scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover/hero-img:opacity-0" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 left-6 flex gap-2 z-20">
                  {heroImages.map((_, idx) => (
                    <div key={idx} className="h-1 w-12 bg-white/20 relative overflow-hidden rounded-full">
                      {idx === currentImageIndex && (
                        <motion.div
                          key={`progress-${currentImageIndex}`}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                          className="absolute inset-0 bg-lot-amber"
                        />
                      )}
                      {idx < currentImageIndex && (
                        <div className="absolute inset-0 bg-white/50" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Technical Detail Row - Now Centered */}
        <div className="w-full border-t border-lot-earth/10 py-8 lg:py-10 bg-lot-paper relative z-20 mt-12 lg:mt-0">
          <div className="container px-4 md:px-6 flex flex-col md:flex-row flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24">
            {[
              { label: "SCA Score Range", value: "88.5 — 92.0" },
              { label: "Altitude Minimum", value: "1,950 MASL" },
              { label: "Region Focus", value: "Sidama / Guji" },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (idx * 0.1) }}
                className="flex flex-col md:flex-row gap-3 md:gap-4 items-center text-center md:text-left"
              >
                <ArrowDownRight className="h-4 w-4 text-lot-amber" />
                <div>
                  <p className="text-[11px] md:text-[10px] font-black text-lot-forest uppercase tracking-widest">{item.value}</p>
                  <p className="text-[9px] md:text-[8px] font-bold text-lot-earth/40 uppercase tracking-widest leading-none mt-1">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
