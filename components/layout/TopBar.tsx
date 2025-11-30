"use client";

import { useEffect, useRef, useState } from "react";

export function TopBar() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const lastScrollY = useRef(0);
  const scrollOffsetRef = useRef(0);
  const topbarRef = useRef<HTMLDivElement>(null);
  const [topbarHeight, setTopbarHeight] = useState(36);

  const message =
    "PREMIUM SPECIALTY COFFEE • DIRECTLY SOURCED FROM PANAMA • ROASTED WITH CARE";

  // Measure actual topbar height
  useEffect(() => {
    if (topbarRef.current) {
      setTopbarHeight(topbarRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Direct 1:1 scroll following - hide exactly with scroll position
      let newOffset = 0;

      if (scrollTop <= 0) {
        // At top - show topbar
        newOffset = 0;
      } else {
        // Hide proportionally to scroll, following scroll exactly
        // Faster hide rate for smoother feel
        newOffset = Math.min(scrollTop * 1.0, topbarHeight + 2);
      }

      scrollOffsetRef.current = newOffset;
      setScrollOffset(newOffset);
      lastScrollY.current = scrollTop;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topbarHeight]);

  return (
    <div
      ref={topbarRef}
      className="fixed top-0 left-0 right-0 z-[60] w-full bg-[hsl(var(--dark-green))] text-white text-xs md:text-sm py-2 overflow-hidden"
      style={{
        transform: `translateY(-${Math.max(scrollOffset, 0)}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className="container mx-auto flex items-center justify-center">
        {/* Desktop: Centered static text */}
        <p className="font-medium hidden md:block whitespace-nowrap text-center">
          {message}
        </p>
        {/* Mobile: Scrolling text */}
        <div className="md:hidden relative w-full overflow-hidden">
          <div className="flex animate-scroll-left whitespace-nowrap">
            <span className="font-medium">{message}</span>
            <span className="font-medium">{message}</span>
            <span className="font-medium">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
