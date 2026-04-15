"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=1920&h=1080&fit=crop", // drying beds / coffee farms
  "https://images.unsplash.com/photo-1514432324607-a2c622d54ea9?w=1920&h=1080&fit=crop", // green beans close up
  "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1524350876685-274059332603?w=1920&h=1080&fit=crop",
];

const stats = [
  { icon: Award, value: "85+", label: "SCA Score Average" },
  { icon: Globe, value: "32", label: "Countries Served" },
  { icon: Shield, value: "100%", label: "Traceable Lots" },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 1.08,
      x: direction > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.97,
      x: direction > 0 ? -60 : 60,
    }),
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Image Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
            x: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
          }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentIndex]}
            alt="Coffee export supply chain"
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay — deep, industrial feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/55 to-secondary/85 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 via-transparent to-secondary/30" />

      {/* Content */}
      <div className="container px-4 relative z-10 h-full flex items-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
                Direct-Trade Specialty Coffee
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-white leading-[1.1] tracking-tight">
              Scalable Supply Chains
              <br />
              <span className="text-primary">for Global Roasters</span>
            </h1>

            <p className="text-lg md:text-xl mb-10 max-w-2xl text-white/80 leading-relaxed font-light">
              Single-origin lots from Ethiopia, Panama, and Colombia.
              Full traceability from washing station to port. SCA-scored
              and export-ready.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/products">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white text-secondary hover:bg-primary hover:text-white text-sm md:text-base px-10 py-7 h-auto font-bold uppercase tracking-widest rounded-export shadow-2xl transition-all duration-300"
                  >
                    Browse Catalog
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white text-sm md:text-base px-10 py-7 h-auto font-bold uppercase tracking-widest rounded-export backdrop-blur-md transition-all duration-300"
                >
                  Request a Sample
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-8 md:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white leading-none">{stat.value}</p>
                  <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-widest font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "w-10 bg-primary"
                : "w-4 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
