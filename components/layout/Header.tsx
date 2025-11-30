"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, User, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const { getItemCount } = useCart();
  const { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUI();
  const pathname = usePathname();
  const itemCount = getItemCount();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { href: "/products", label: "OUR COFFEE", hasSubmenu: true },
    { href: "/wholesale", label: "WHOLESALE", hasSubmenu: true },
    { href: "/blog", label: "BLOG", hasSubmenu: false },
    { href: "/about", label: "ABOUT US", hasSubmenu: false },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [topbarHeight, setTopbarHeight] = useState(36);
  const [currentScrollTop, setCurrentScrollTop] = useState(0);
  const lastScrollY = useRef(0);
  const scrollOffsetRef = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(64);

  const topbarMessage =
    "PREMIUM SPECIALTY COFFEE • DIRECTLY SOURCED FROM PANAMA • ROASTED WITH CARE";

  // Measure actual header and topbar heights
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    if (topbarRef.current) {
      setTopbarHeight(topbarRef.current.scrollHeight);
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("button[aria-label*='menu']")
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen, setMobileMenuOpen]);

  // Track scroll position for seamless hide/show animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollDelta = scrollTop - lastScrollY.current;

      setIsScrolled(scrollTop > 0);
      setCurrentScrollTop(scrollTop);

      // Check if we're at the very top - topbar should ONLY show at scrollTop === 0
      const isAtTopPosition = scrollTop <= 0;
      setIsAtTop(isAtTopPosition);

      // Calculate total height to hide - always use header + topbar for max height
      // This ensures complete hide regardless of topbar visibility
      const maxTotalHeight = headerHeight + topbarHeight;

      // Threshold before header hides completely (in pixels)
      const scrollThreshold = 100;

      // Calculate scroll offset based on scroll direction
      let newOffset = scrollOffsetRef.current;

      if (scrollTop <= 0) {
        // At exact top - show header and topbar
        newOffset = 0;
      } else if (scrollDelta > 0) {
        // Scrolling down - hide completely after threshold
        if (scrollTop > scrollThreshold) {
          // Past threshold - hide completely (use max height to ensure full hide)
          newOffset = maxTotalHeight + 10;
        } else {
          // Before threshold - keep visible
          newOffset = 0;
        }
      } else if (scrollDelta < 0) {
        // Scrolling up - show header quickly
        if (scrollTop <= scrollThreshold) {
          // If scrolling back up within threshold, show immediately
          newOffset = 0;
        } else {
          // Otherwise reduce offset smoothly
          newOffset = Math.max(
            0,
            scrollOffsetRef.current - Math.abs(scrollDelta) * 2.5
          );
        }
        // If scrolled up enough, show immediately
        if (scrollDelta < -10) {
          newOffset = 0;
        }
      }

      scrollOffsetRef.current = newOffset;
      setScrollOffset(newOffset);
      lastScrollY.current = scrollTop;
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerHeight, topbarHeight]);

  // Calculate topbar height - ONLY show at the exact top (scrollTop === 0)
  // Hide immediately on any scroll, but with smooth transition
  const currentTopbarHeight = currentScrollTop === 0 ? topbarHeight : 0;

  return (
    <>
      {/* Mobile Menu Backdrop - Outside header container */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className="fixed top-0 left-0 right-0 z-60 w-full"
        style={{
          transform: `translateY(-${Math.max(scrollOffset, 0)}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {/* TopBar - Animated height */}
        <div
          ref={topbarRef}
          className={cn(
            "w-full bg-[hsl(var(--dark-green))] text-white text-xs md:text-sm overflow-hidden transition-all duration-300 ease-in-out",
            currentTopbarHeight > 0 ? "h-full" : "h-0"
          )}
          style={{
            height: currentTopbarHeight > 0 ? `${topbarHeight}px` : "0px",
            paddingTop: currentTopbarHeight > 0 ? "0.5rem" : "0",
            paddingBottom: currentTopbarHeight > 0 ? "0.5rem" : "0",
            transition:
              "height 0.3s ease-in-out, padding-top 0.3s ease-in-out, padding-bottom 0.3s ease-in-out",
          }}
        >
          <div className="w-full flex items-center justify-center h-full">
            {/* Desktop: Centered static text */}
            <p className="font-medium hidden md:block whitespace-nowrap text-center">
              {topbarMessage}
            </p>
            {/* Mobile: Scrolling text */}
            <div className="md:hidden relative w-full overflow-hidden h-full flex items-center">
              <div className="flex animate-scroll-left whitespace-nowrap">
                <span className="font-medium">{topbarMessage}</span>
                <span className="font-medium">{topbarMessage}</span>
                <span className="font-medium">{topbarMessage}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <header
          ref={headerRef}
          className={cn("w-full bg-background transition-all duration-300")}
          style={{
            backgroundColor:
              currentScrollTop > 0
                ? "rgba(255, 255, 255, 0.8)"
                : "hsl(var(--background))",
            backdropFilter:
              currentScrollTop > 0 ? "blur(10px) saturate(180%)" : "none",
            WebkitBackdropFilter:
              currentScrollTop > 0 ? "blur(10px) saturate(180%)" : "none",
          }}
        >
          <div className="container flex h-16 md:h-28 items-center px-4 md:px-6 relative">
            {/* Left side - Mobile Menu Button / Logo on Desktop */}
            <div className="flex items-center lg:hidden min-w-[40px]">
              <button
                type="button"
                className="flex lg:hidden h-10 w-10 items-center justify-center transition-all duration-300 hover:bg-primary/10 active:scale-95 z-50 relative rounded-md"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                style={{ display: "flex" }}
              >
                <div className="relative w-6 h-5 flex items-center justify-center">
                  <span
                    className={cn(
                      "absolute left-0 w-6 h-0.5 bg-foreground rounded-full transition-all duration-300",
                      mobileMenuOpen ? "top-2 rotate-45" : "top-0 rotate-0"
                    )}
                    style={{ backgroundColor: "currentColor" }}
                  />
                  <span
                    className={cn(
                      "absolute top-2 left-0 w-6 h-0.5 bg-foreground rounded-full transition-all duration-300",
                      mobileMenuOpen ? "opacity-0" : "opacity-100"
                    )}
                    style={{ backgroundColor: "currentColor" }}
                  />
                  <span
                    className={cn(
                      "absolute left-0 w-6 h-0.5 bg-foreground rounded-full transition-all duration-300",
                      mobileMenuOpen ? "top-2 -rotate-45" : "top-4 rotate-0"
                    )}
                    style={{ backgroundColor: "currentColor" }}
                  />
                </div>
              </button>
            </div>

            {/* Logo - Left side on Desktop */}
            <div className="hidden lg:flex items-center">
              <Logo />
            </div>

            {/* Mobile Logo - Centered */}
            <div className="flex-1 flex justify-center lg:hidden">
              <Logo />
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "relative text-sm font-medium transition-all duration-300 py-2",
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full scale-x-0 origin-center transition-transform duration-300 hover:scale-x-100" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
              {/* Search Icon - Desktop */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex h-10 w-10 transition-all duration-300 hover:bg-primary/10 hover:scale-110"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Account Icon - Desktop */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex h-10 w-10 transition-all duration-300 hover:bg-primary/10 hover:scale-110"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Cart Icon */}
              <Link href="/cart" className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 transition-all duration-300 hover:bg-primary/10 hover:scale-110"
                  aria-label={`Shopping cart with ${itemCount} items`}
                >
                  <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex min-w-[20px] h-5 items-center justify-center rounded-full bg-[#5D4037] text-xs font-bold text-white shadow-lg animate-in fade-in zoom-in duration-300 px-1">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu - Slide in animation */}
          <div
            ref={mobileMenuRef}
            className={cn(
              "lg:hidden fixed left-0 top-0 h-screen w-full bg-[#F5F1EB] overflow-y-auto transition-all duration-300 ease-in-out z-60 shadow-2xl flex flex-col",
              mobileMenuOpen
                ? "opacity-100 translate-x-0 visible pointer-events-auto"
                : "opacity-0 -translate-x-full invisible pointer-events-none"
            )}
            aria-hidden={!mobileMenuOpen}
            style={{
              width: "100vw",
              transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div className="flex flex-col flex-1 px-4 py-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-6">
                {/* User Icon - Left Side */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Account"
                >
                  <User className="h-5 w-5 text-foreground" />
                </Button>

                {/* Right Side - Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleMobileMenu}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-foreground" />
                </Button>
              </div>

              {/* Search Input */}
              <div className="mb-2 relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-none border-gray-300 text-foreground placeholder:text-gray-400 placeholder:italic"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-0 border-t border-gray-300 pt-4 flex-1">
                {navLinks.map((link, index) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "relative px-4 py-3 text-base font-light transition-all duration-300 flex items-center border-b border-gray-300 uppercase",
                        "hover:bg-white/50 active:bg-white/70",
                        isActive ? "text-primary" : "text-black"
                      )}
                      onClick={toggleMobileMenu}
                      style={{
                        animation: mobileMenuOpen
                          ? `slideInFromTop 0.3s ease-out ${index * 50}ms both`
                          : "none",
                      }}
                    >
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Logo at Bottom */}
              <div className="mt-auto pt-6 pb-4">
                <Link
                  href="/"
                  className="inline-flex items-center"
                  onClick={toggleMobileMenu}
                >
                  <div className="flex items-center">
                    <span
                      className="text-xl text-foreground leading-none"
                      style={{
                        fontFamily:
                          "var(--font-cursive), 'Dancing Script', cursive",
                        fontWeight: 800,
                        letterSpacing: "0.02em",
                      }}
                    >
                      Cophy
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
