"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Box, Cpu, History, Scale } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";

export function HeroV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[90vh] lg:h-screen flex flex-col lg:flex-row overflow-hidden bg-lot-paper"
    >
      {/* Left Content Column */}
      <div className="flex-1 w-full lg:w-1/2 flex flex-col justify-center p-6 md:p-12 lg:p-24 z-20 bg-lot-paper border-r border-lot-earth/10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          {/* Technical Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lot-forest text-lot-amber text-[9px] font-black tracking-[0.3em] uppercase mb-10">
            <Cpu className="h-3 w-3" />
            DIRECT EXPORT PROTOCOL V2.0
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-lot-forest mb-8 leading-[0.85] tracking-tighter italic">
            Direct <br />
            Trace <br />
            Origin.
          </h1>

          <div className="h-px w-24 bg-lot-amber mb-8" />

          <p className="text-sm md:text-base text-lot-earth/80 font-light leading-relaxed mb-12 max-w-md">
            Ethiopia&apos;s most transparent coffee commodity network. Access technical lot specifications, SCA scores, and logistics tracking for global importers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/products">
              <Button className="bg-lot-forest hover:bg-lot-forest/90 text-white rounded-none h-16 px-10 text-xs font-bold uppercase tracking-[0.3em] group shadow-xl">
                Explore Current Lots
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/portal">
              <Button variant="outline" className="border-lot-earth/20 hover:bg-lot-paper hover:border-lot-forest rounded-none h-16 px-10 text-xs font-bold uppercase tracking-[0.3em] transition-all">
                Partner Portal
              </Button>
            </Link>
          </div>

          {/* Quick Technical Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-lot-earth/10 pt-12">
            {[
              { icon: Scale, label: "Export Capacity", value: "2.4k Tons" },
              { icon: History, label: "Sourcing History", value: "30 Years" },
              { icon: Box, label: "Active Microlots", value: "142" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="flex items-center gap-2 text-lot-amber">
                  <stat.icon className="h-4 w-4" />
                  <span className="text-xs font-bold text-lot-forest uppercase">{stat.value}</span>
                </div>
                <p className="text-[9px] font-bold text-lot-earth/40 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Visual/Machinery Column */}
      <div className="flex-1 relative w-full lg:w-1/2 h-[50vh] lg:h-full bg-lot-forest overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image
             src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1920&h=1080&fit=crop"
             alt="Coffee drying beds"
             fill
             className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>

        {/* Dynamic Blueprint Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-12 text-white/10 italic">
          <div className="flex justify-between items-start">
             <span className="text-[120px] font-serif font-black leading-none select-none">LOT</span>
             <div className="text-right flex flex-col gap-2">
               <span className="block h-px w-32 bg-white/20" />
               <span className="block h-px w-48 bg-white/20" />
               <span className="block h-px w-24 bg-white/20" />
             </div>
          </div>
          <div className="flex justify-between items-end">
             <div className="space-y-2">
                <p className="text-[10px] font-mono tracking-widest uppercase text-lot-amber/40">Technical Coordinates</p>
                <p className="text-xs font-mono text-white/20">6.0142° N, 38.2120° E // YIRGACHEFFE</p>
             </div>
             <span className="text-[120px] font-serif font-black leading-none select-none">251</span>
          </div>
        </div>

        {/* Floating Technical Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-64 md:w-80 bg-lot-paper/10 backdrop-blur-xl border border-white/10 p-8 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-lot-amber animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-white">Live Availability Preview</span>
          </div>
          <div className="space-y-4">
            <div className="pb-4 border-b border-white/5">
              <p className="text-[9px] text-white/40 uppercase font-mono">Lot Identifier</p>
              <p className="text-sm font-bold text-white uppercase tracking-tighter">SDM-2026-B1-042</p>
            </div>
            <div className="pb-4 border-b border-white/5">
              <p className="text-[9px] text-white/40 uppercase font-mono">Sensory Analysis</p>
              <p className="text-sm font-bold text-white uppercase tracking-tighter">Bergamot, Jasmine, Honey</p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] text-white/40 uppercase font-mono">SCA Score</p>
                <p className="text-2xl font-serif font-black text-lot-amber italic">88.5</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-white/40 uppercase font-mono">Bags Available</p>
                <p className="text-xs font-bold text-white">42 of 100</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Industrial Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[url('/grain.png')] bg-repeat" />
      </div>
    </section>
  );
}
