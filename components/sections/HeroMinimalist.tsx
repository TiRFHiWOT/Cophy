"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroMinimalist() {
  return (
    <div className="w-full bg-lot-paper">
      {/* Main Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-var(--topbar-height,36px)-var(--header-height,112px))] lg:h-[calc(100vh-148px)] flex flex-col justify-center overflow-hidden">
        {/* Background Subtle Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none opacity-[0.02] z-0">
          <h2 className="text-[35vw] font-serif font-black leading-none text-lot-forest italic">LOT251</h2>
        </div>

        <div className="container relative z-10 px-4 md:px-6 py-12 lg:py-20 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Title Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                <Globe className="h-3.5 w-3.5 text-lot-amber" />
                <span className="text-[10px] font-black tracking-[0.4em] text-lot-forest uppercase">
                  Addis Ababa — Global Logistics
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[7.5vw] font-serif font-black text-lot-forest leading-[0.85] tracking-tighter uppercase italic mb-0">
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

              {/* Dynamic Image */}
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] bg-lot-forest overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop"
                  alt="Ethiopian Coffee Sacks"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Detail Row (Optimized for Mobile) */}
      <div className="w-full border-t border-b border-lot-earth/10 py-12 md:py-10 bg-lot-paper relative z-20">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24">
          {[
            { label: "SCA Score Range", value: "86.5 — 92.0" },
            { label: "Altitude Minimum", value: "1,950 MASL" },
            { label: "Region Focus", value: "Sidama // Guji" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col md:flex-row gap-3 md:gap-4 items-center text-center md:text-left">
              <ArrowDownRight className="h-4 w-4 text-lot-amber" />
              <div>
                <p className="text-[11px] md:text-[10px] font-black text-lot-forest uppercase tracking-widest">{item.value}</p>
                <p className="text-[9px] md:text-[8px] font-bold text-lot-earth/40 uppercase tracking-widest leading-none mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
