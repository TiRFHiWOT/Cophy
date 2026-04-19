"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const isLight = variant === "light";
  
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform group-hover:rotate-12 transition-transform duration-700 ease-in-out"
        >
          {/* Industrial Warehouse / Silo Mark */}
          <path
            d="M5 15V35H35V15L20 5L5 15Z"
            stroke={isLight ? "#F8F7F3" : "#0A2A22"}
            strokeWidth="3"
            strokeLinejoin="bevel"
          />
          <path
            d="M20 15L20 35"
            stroke={isLight ? "#F8F7F3" : "#0A2A22"}
            strokeWidth="3"
          />
          <rect
            x="16"
            y="24"
            width="8"
            height="11"
            fill="#D97706"
          />
          <path
            d="M0 35H40"
            stroke={isLight ? "#F8F7F3" : "#0A2A22"}
            strokeWidth="2"
          />
          {/* Subtle Accent Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            d="M10 10L30 10"
            stroke="#D97706"
            strokeWidth="1"
            className="opacity-40"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className={`text-2xl md:text-3xl font-serif font-black tracking-tighter italic ${isLight ? "text-white" : "text-lot-forest"}`}>
            LOT 
          </span>
          <span className="text-2xl md:text-3xl font-mono font-black text-lot-amber">
            251
          </span>
        </div>
        <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] mt-1 ${isLight ? "text-white/40" : "text-lot-earth/60"}`}>
          Identity Preserved
        </span>
      </div>
    </Link>
  );
}
