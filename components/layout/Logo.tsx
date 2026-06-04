"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const isLight = variant === "light";

  // Colors
  const primary = isLight ? "#FFFFFF" : "#0A2A22";    // forest green / white
  const accent = "#A66A3F";                            // coffee brown
  const subtle = isLight ? "rgba(255,255,255,0.15)" : "rgba(10,42,34,0.08)";

  return (
    <Link href="/" className={`flex items-center gap-4 group select-none ${className}`}>
      {/* ── Mark: Stylized coffee bean with "H" negative space ── */}
      <div className="relative">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        >
          {/* Outer bean shape (left half) */}
          <path
            d="M22 2C12 2 4 10 4 22C4 34 12 42 22 42"
            stroke={primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Outer bean shape (right half) */}
          <path
            d="M22 2C32 2 40 10 40 22C40 34 32 42 22 42"
            stroke={primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Center crease — the signature coffee bean line */}
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

          {/* "H" crossbar — embedded in the bean */}
          <line
            x1="14"
            y1="22"
            x2="30"
            y2="22"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Left vertical of H */}
          <line
            x1="14"
            y1="14"
            x2="14"
            y2="30"
            stroke={primary}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Right vertical of H */}
          <line
            x1="30"
            y1="14"
            x2="30"
            y2="30"
            stroke={primary}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Decorative dots — coffee cherry cluster */}
          <circle cx="8" cy="8" r="1.5" fill={accent} opacity="0.3" />
          <circle cx="36" cy="8" r="1.5" fill={accent} opacity="0.2" />
          <circle cx="8" cy="36" r="1.5" fill={accent} opacity="0.2" />
          <circle cx="36" cy="36" r="1.5" fill={accent} opacity="0.3" />

          {/* Animated glow ring on hover — via CSS */}
          <circle
            cx="22"
            cy="22"
            r="21"
            stroke={accent}
            strokeWidth="0.5"
            fill="none"
            className="opacity-0 group-hover:opacity-30 transition-opacity duration-700"
          />
        </svg>

        {/* Subtle ambient glow behind the mark */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 -z-10"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* ── Wordmark ── */}
      <div className="flex flex-col">
        {/* Primary text */}
        <div className="flex items-baseline gap-0">
          <span
            className={`text-[22px] md:text-[26px] font-serif font-black tracking-[-0.04em] leading-none ${
              isLight ? "text-white" : "text-lot-forest"
            }`}
          >
            HENDI
          </span>
          <span className="text-[22px] md:text-[26px] font-serif font-black tracking-[-0.04em] leading-none text-lot-amber">
            COFFEE
          </span>
        </div>

        {/* Separator line + tagline */}
        <div className="flex items-center gap-2 mt-1.5">
          <div className="h-px flex-1" style={{ backgroundColor: accent, opacity: 0.4 }} />
          <span
            className={`text-[7px] md:text-[8px] font-semibold uppercase tracking-[0.25em] whitespace-nowrap ${
              isLight ? "text-white/50" : "text-lot-earth/60"
            }`}
          >
            Premium Ethiopian Coffee
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: accent, opacity: 0.4 }} />
        </div>
      </div>
    </Link>
  );
}
