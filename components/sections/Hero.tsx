"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1920&h=1080&fit=crop", // Ethiopian drying beds
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop", // Jute sacks
  "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=1920&h=1080&fit=crop", // High-altitude coffee farm
  "https://images.unsplash.com/photo-1514432324607-a2c622d54ea9?w=1920&h=1080&fit=crop", // Green beans processing
];

const stats = [
  { icon: Award, value: "85+", label: "Avg SCA Score" },
  { icon: Globe, value: "32", label: "Countries" },
  { icon: Shield, value: "100%", label: "Traceable Lots" },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[750px] lg:h-[850px] overflow-hidden bg-lot-forest">
      {/* Image Carousel */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentIndex]}
            alt="Ethiopian Coffee Supply Chain"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Industrial Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-lot-forest/90 via-lot-forest/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-lot-forest via-transparent to-transparent opacity-40" />

      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-lot-amber" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-lot-amber uppercase">
                Green Coffee Export · Est. 2019
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black mb-8 text-white leading-[0.95] tracking-tighter">
              Ethiopian Specialty <br />
              <span className="text-lot-amber italic">for Global Roasters</span>
            </h1>

            <p className="text-lg md:text-xl mb-12 max-w-2xl text-white/70 leading-relaxed font-light">
              Single-origin microlots from Sidama, Yirgacheffe, and Guji. 
              Full identity preservation from drying bed to port. 
              Sample-to-bag consistency guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-lot-amber text-white hover:bg-white hover:text-lot-forest text-xs font-bold uppercase tracking-[0.2em] px-10 py-8 h-auto rounded-none shadow-2xl transition-all duration-500"
                >
                  Browse Current Lots
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-xs font-bold uppercase tracking-[0.2em] px-10 py-8 h-auto rounded-none backdrop-blur-md transition-all duration-500"
                >
                  Request a Sample
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-8 md:gap-16 items-center"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 border border-white/20 flex items-center justify-center">
                    <stat.icon className="h-4 w-4 text-lot-amber" />
                  </div>
                  <span className="text-3xl font-mono font-bold text-white">{stat.value}</span>
                </div>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Navigation Element */}
      <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-4">
         <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none">Scroll to Explore Lots</span>
         <div className="w-12 h-px bg-white/20" />
      </div>
    </section>
  );
}

export default Hero;
