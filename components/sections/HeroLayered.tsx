"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Coffee, Layers, MousePointer2, Target } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";

export function HeroLayered() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["10deg", "-10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-lot-forest overflow-hidden flex items-center justify-center perspective-[1000px]"
    >
      {/* Deep Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1514432324607-a2c622d54ea9?w=1920&h=1080&fit=crop"
          alt="Coffee Processing"
          fill
          className="object-cover opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-lot-forest via-transparent to-lot-forest" />
      </div>

      {/* Interactive Layered Container */}
      <motion.div 
        style={{ rotateX, rotateY }}
        className="relative z-10 w-full max-w-6xl aspect-[16/10] md:aspect-[21/9] flex items-center justify-center"
      >
        {/* Main Central Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-[300px] md:w-[500px] h-[400px] md:h-[600px] bg-lot-paper overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] z-20 group"
        >
          <Image
            src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1200&h=1600&fit=crop"
            alt="Ethiopian Highlands"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lot-forest/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
             <p className="text-lot-amber text-[10px] font-black tracking-widest uppercase mb-2">Primary Origin</p>
             <h3 className="text-2xl font-serif font-black text-white italic">Yirgacheffe G1</h3>
          </div>
        </motion.div>

        {/* Floating Data Card 1 (Top Left) */}
        <motion.div 
          style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], ["-40px", "40px"]), y: useTransform(mouseYSpring, [-0.5, 0.5], ["-40px", "40px"]) }}
          className="absolute -top-10 -left-10 md:top-20 md:-left-20 z-30 bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl w-48 md:w-64"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-4 w-4 text-lot-amber" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">SCA Precision</span>
          </div>
          <p className="text-4xl font-serif font-black text-white italic mb-2">89.25</p>
          <p className="text-[10px] text-white/50 uppercase tracking-widest">Verified 2026 Harvest</p>
        </motion.div>

        {/* Floating Data Card 2 (Bottom Right) */}
        <motion.div 
          style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], ["20px", "-20px"]), y: useTransform(mouseYSpring, [-0.5, 0.5], ["60px", "-60px"]) }}
          className="absolute -bottom-10 -right-10 md:bottom-20 md:-right-20 z-30 bg-lot-forest border border-white/10 p-6 shadow-2xl w-48 md:w-72"
        >
          <div className="flex items-center gap-3 mb-6">
            <Layers className="h-4 w-4 text-lot-amber" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Traceability Layer</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
               <span className="text-[9px] text-white/40 uppercase">Altitude</span>
               <span className="text-xs font-bold text-white">2100m</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
               <span className="text-[9px] text-white/40 uppercase">Variety</span>
               <span className="text-xs font-bold text-white">Heirloom</span>
            </div>
          </div>
        </motion.div>

        {/* Text Overlay (Offset) */}
        <motion.div 
           style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], ["10px", "-10px"]), y: useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]) }}
           className="absolute z-40 lg:-left-20 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
           <h2 className="text-6xl md:text-9xl font-serif font-black text-white leading-[0.8] tracking-tighter italic select-none drop-shadow-2xl">
             Deep <br />
             Access.
           </h2>
           <p className="mt-8 text-sm md:text-base text-white/60 font-light max-w-xs mb-10 hidden md:block">
             Explore the layers of the Ethiopian coffee supply chain. Technical data meets high-altitude sourcing.
           </p>
           <Link href="/products">
             <Button className="bg-lot-amber hover:bg-white text-lot-forest rounded-none px-12 h-16 text-xs font-bold uppercase tracking-widest hidden md:flex">
               Enter The Exchange
             </Button>
           </Link>
        </motion.div>
      </motion.div>

      {/* Decorative Interactive Elements */}
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white/20">
        <MousePointer2 className="h-4 w-4" />
        <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Interactive Perspective Active</span>
      </div>

      <div className="absolute bottom-10 right-10 flex items-center gap-4">
         <div className="flex flex-col items-end">
           <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Protocol 251</p>
           <p className="text-[8px] font-mono text-lot-amber/40 uppercase">V3.0 // LAYERED DEPTH</p>
         </div>
      </div>
    </section>
  );
}
