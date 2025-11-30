"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=1080&fit=crop",
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 1.1,
      x: direction > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.95,
      x: direction > 0 ? -100 : 100,
    }),
  };

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Image Carousel - Smooth crossfade with zoom */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
            x: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
          }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentIndex]}
            alt="Coffee hero"
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Coffee-themed Overlay - Static, doesn't fade */}
      {/* Base dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65" />
      {/* Warm coffee tones from sides */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5D4037]/40 via-transparent to-[#8B6F47]/40" />
      {/* Subtle amber glow in center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at center, rgba(255, 167, 38, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="container px-4 relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            PREMIUM SPECIALTY COFFEE
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/95 leading-relaxed">
            Discover exceptional coffees sourced with care and roasted to
            perfection
          </p>
          <Link href="/products">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 text-base md:text-lg px-10 py-7 h-auto font-semibold shadow-2xl border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:shadow-primary/50 hover:border-white/50"
              >
                VIEW PRODUCTS
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
