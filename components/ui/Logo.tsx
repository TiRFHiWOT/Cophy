"use client";

import { motion } from "framer-motion";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const isLight = variant === "light";

  const primary = isLight ? "#FFFFFF" : "#0A2A22";
  const accent = "#D97706";

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Mark */}
      <div className="relative">
        <svg
          width="32"
          height="32"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        >
          <path d="M22 2C12 2 4 10 4 22C4 34 12 42 22 42" stroke={primary} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M22 2C32 2 40 10 40 22C40 34 32 42 22 42" stroke={primary} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <motion.path
            d="M22 8C18 14 18 30 22 36"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <line x1="14" y1="22" x2="30" y2="22" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <line x1="14" y1="14" x2="14" y2="30" stroke={primary} strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="14" x2="30" y2="30" stroke={primary} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-0">
          <span className={`text-lg font-serif font-black tracking-[-0.04em] leading-none ${isLight ? "text-white" : "text-lot-forest"}`}>
            HENDI
          </span>
          <span className="text-lg font-serif font-black tracking-[-0.04em] leading-none text-lot-amber">
            COFFEE
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="h-px flex-1" style={{ backgroundColor: accent, opacity: 0.3 }} />
          <span className={`text-[6px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap ${isLight ? "text-white/50" : "text-lot-earth/60"}`}>
            Premium Ethiopian Coffee
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: accent, opacity: 0.3 }} />
        </div>
      </div>
    </div>
  );
}
