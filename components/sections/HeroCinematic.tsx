"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroCinematic() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-lot-forest">
      {/* Immersive Background */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop"
          alt="Ethiopian Coffee Highlands"
          fill
          className="object-cover"
          priority
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-lot-forest via-transparent to-black/20" />
      </motion.div>

      {/* Centered Content */}
      <div className="container relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="max-w-4xl"
        >
          <span className="text-lot-amber text-[10px] md:text-sm font-bold tracking-[0.5em] uppercase mb-8 block">
            Directly from the Ethiopian Highlands
          </span>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-black text-white italic tracking-tighter leading-[0.9] mb-12">
            The Soul of<br />
            Single Origin.
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
            Uncompromising quality from origin to roaster. Access technical technical lot data and request samples from our latest 88+ SCA scoring harvest.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/products">
              <Button className="bg-white hover:bg-lot-amber text-lot-forest rounded-full px-12 h-16 text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 duration-300">
                Explore The Lots
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="text-white hover:text-lot-amber text-xs font-bold uppercase tracking-widest p-0 flex items-center gap-3">
                Request Private Access
                <div className="h-px w-8 bg-white/30" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.4em]">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-lot-amber h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
