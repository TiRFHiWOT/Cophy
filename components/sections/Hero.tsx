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

const heroContent = [
  {
    title: "Geishas with a View",
    subtitle: "Finca Sophia: Growing with the Forest",
    description:
      "In every cup from Finca Sophia, you're experiencing the land that grew the beans.",
    filters: {
      topLeft: "rgba(93, 64, 55, 0.35)", // Warm brown
      bottomRight: "rgba(76, 120, 71, 0.25)", // Green
    },
  },
  {
    title: "Premium Specialty Coffee",
    subtitle: "Sourced from the Finest Farms",
    description:
      "Discover exceptional Panamanian coffees roasted to perfection, honoring the producers' dedication.",
    filters: {
      topLeft: "rgba(139, 111, 71, 0.3)", // Lighter brown
      bottomRight: "rgba(101, 67, 33, 0.35)", // Darker brown
    },
  },
  {
    title: "Quality. Transparency. Sustainability.",
    subtitle: "Our Commitment to Excellence",
    description:
      "Every bean tells a story of passion, consistency, and generations of expertise.",
    filters: {
      topLeft: "rgba(76, 120, 71, 0.3)", // Green
      bottomRight: "rgba(93, 64, 55, 0.3)", // Warm brown
    },
  },
  {
    title: "Experience the Art of Coffee",
    subtitle: "From Farm to Your Cup",
    description:
      "Carefully roasted to bring out diversity of flavors, aromatics, and acidities.",
    filters: {
      topLeft: "rgba(101, 67, 33, 0.4)", // Dark brown
      bottomRight: "rgba(160, 130, 109, 0.25)", // Light cream
    },
  },
];

export function Hero() {
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

  const fadeVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
    },
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentContent = heroContent[currentIndex];

  return (
    <section className="relative w-full h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden">
      {/* Image Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8, ease: "easeInOut" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentIndex]}
            alt={currentContent.title}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1920&h=1080&fit=crop";
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5D4037]/80 via-[#8B6F47]/70 to-[#A0826D]/60"></div>
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Diagonal Divider with Different Filters - 45 degree split */}
          <div className="absolute inset-0">
            {/* Top-left side (dynamic filter based on current image) */}
            <motion.div
              key={`top-left-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                WebkitClipPath: "polygon(0 0, 100% 0, 100% 100%)",
                background: currentContent.filters.topLeft,
              }}
            />
            {/* Bottom-right side (dynamic filter based on current image) */}
            <motion.div
              key={`bottom-right-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                WebkitClipPath: "polygon(0 0, 100% 100%, 0 100%)",
                background: currentContent.filters.bottomRight,
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container px-4 text-center z-10 relative h-full flex items-center justify-center">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-2xl"
          >
            {currentContent.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 max-w-2xl mx-auto text-white/95 drop-shadow-lg font-medium"
          >
            {currentContent.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto text-white/90 drop-shadow-md"
          >
            {currentContent.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/products">
              <Button
                size="lg"
                className="bg-primary text-gray-300 hover:bg-primary/90 shadow-2xl text-base md:text-lg px-10 py-7 h-auto cursor-pointer font-semibold border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:shadow-primary/50 hover:border-white/40"
              >
                Explore Our Coffee
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
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
