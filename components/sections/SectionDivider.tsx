"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export function SectionDivider() {
  return (
    <div className="relative w-full bg-[hsl(var(--dark-green))] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--dark-green))] via-[hsl(var(--dark-green))]/95 to-[hsl(var(--dark-green))]"></div>

      {/* Decorative elements */}
      <div className="relative py-8 md:py-12">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center gap-4 md:gap-8"
          >
            {/* Left decorative line */}
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-white/60"></div>

            {/* Coffee icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Coffee
                  className="h-6 w-6 md:h-8 md:w-8 text-white/80"
                  strokeWidth={1.5}
                />
              </motion.div>
            </div>

            {/* Center divider */}
            <div className="h-12 md:h-16 w-px bg-gradient-to-b from-white/60 via-white/40 to-white/60"></div>

            {/* Coffee icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Coffee
                  className="h-6 w-6 md:h-8 md:w-8 text-white/80"
                  strokeWidth={1.5}
                />
              </motion.div>
            </div>

            {/* Right decorative line */}
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/30 to-white/60"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
