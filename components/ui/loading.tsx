"use client";

import { motion } from "framer-motion";
import { Coffee, Cpu, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export function Loading({
  size = "md",
  text = "ESTABLISHING SECURE ORIGIN CHANNEL",
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center bg-lot-paper relative overflow-hidden",
      fullScreen ? "fixed inset-0 z-[100] h-screen w-screen" : "w-full py-20"
    )}>
      {/* Industrial Background Texture */}
      {fullScreen && (
        <>
          <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none flex items-center justify-center">
            <h2 className="text-[30vw] font-serif font-black italic tracking-tighter text-lot-forest uppercase">LOT251</h2>
          </div>
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('/grain.png')] bg-repeat" />
        </>
      )}

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-xs transition-all">
        {/* Main Spinner/Logo */}
        <div className="relative">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className={cn("border-t-2 border-lot-amber border-r-2 border-r-transparent rounded-full", sizeClasses[size])}
           />
           <div className="absolute inset-4 flex items-center justify-center">
             <Cpu className="h-6 w-6 text-lot-forest animate-pulse" />
           </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[10px] md:text-xs text-lot-forest font-black tracking-[0.4em] uppercase text-center"
            >
              {text}
            </motion.p>
            <div className="h-px w-12 bg-lot-amber mt-4" />
          </div>

          {/* Industrial Status Ticker */}
          <div className="flex flex-col gap-2 w-full text-center">
             {[
               "Drying Bed Data Sync...",
               "SCA Score Verification...",
               "Port Registry Access...",
             ].map((msg, i) => (
                <motion.div
                  key={msg}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 1,
                    ease: "easeInOut"
                  }}
                  className="text-[8px] font-mono text-lot-earth/40 uppercase tracking-widest whitespace-nowrap"
                >
                  {msg}
                </motion.div>
             ))}
          </div>
        </div>
      </div>

      {/* Footer Branding for Full Screen */}
      {fullScreen && (
        <div className="absolute bottom-12 flex flex-col items-center gap-2">
          <p className="text-[9px] font-bold text-lot-earth/20 uppercase tracking-[0.5em]">DIRECT TRACE ARCHIVE © 2026</p>
          <div className="flex gap-1">
             {[0, 1, 2].map(i => (
               <motion.div 
                 key={i}
                 animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                 transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                 className="h-1 w-1 bg-lot-amber rounded-full"
               />
             ))}
          </div>
        </div>
      )}
    </div>
  );
}
