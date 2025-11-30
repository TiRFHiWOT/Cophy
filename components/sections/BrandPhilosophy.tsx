"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const carouselImages = [
  "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1920&h=600&fit=crop",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&h=600&fit=crop",
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=600&fit=crop",
];

export function BrandPhilosophy() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      {/* Content Section */}
      <div className="w-full bg-[hsl(var(--dark-green))] text-white py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading - Each word on its own line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-wide leading-tight">
                QUALITY.
                <br />
                TRANSPARENCY.
                <br />
                SUSTAINABILITY.
              </h2>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="space-y-6 md:space-y-8"
            >
              <p className="text-lg md:text-xl leading-relaxed text-white/80 font-normal max-w-3xl mx-auto text-center">
                Our coffees are seasonally sourced and delicately roasted to
                showcase the hard work and dedication of our producing partners.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-white/80 max-w-3xl mx-auto text-center font-light">
                It&apos;s a product of passion and consistency passed down from
                several generations.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-white/80 max-w-3xl mx-auto text-center font-light">
                We want to honor that work by interfering as little as possible,
                roasting carefully to bring out diversity of flavors, aromatics,
                and acidities — allowing each coffee to tell its own story.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
