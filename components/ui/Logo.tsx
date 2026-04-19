"use client";

import { motion } from "framer-motion";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const isLight = variant === "light";
  
  return (
    <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
      <div className="relative">
        {/* Technical Warehouse Mark */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform group-hover:rotate-90 transition-transform duration-500"
        >
          <path
            d="M4 12V28H28V12L16 4L4 12Z"
            stroke={isLight ? "#F8F7F3" : "#0A2A22"}
            strokeWidth="2.5"
            strokeLinejoin="bevel"
          />
          <path
            d="M16 12L16 28"
            stroke={isLight ? "#F8F7F3" : "#0A2A22"}
            strokeWidth="2.5"
          />
          <rect
            x="12"
            y="18"
            width="8"
            height="10"
            fill={isLight ? "#D97706" : "#D97706"}
          />
          <path
            d="M0 28H32"
            stroke={isLight ? "#F8F7F3" : "#0A2A22"}
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`text-xl font-serif font-black tracking-tighter italic ${isLight ? "text-white" : "text-lot-forest"}`}>
          LOT <span className="text-lot-amber">251</span>
        </span>
        <span className={`text-[7px] font-black uppercase tracking-[0.4em] ${isLight ? "text-white/40" : "text-lot-earth/60"}`}>
          Specialty Coffee
        </span>
      </div>
    </div>
  );
}
