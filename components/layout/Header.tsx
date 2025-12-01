"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Search, User, X, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useEffect, useRef, useState, useMemo } from "react";
import productsData from "@/data/products.json";
import { Product } from "@/types";

export function Header() {
  const { getItemCount } = useCart();
  const {
    mobileMenuOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
    searchOpen,
    setSearchOpen,
    toggleSearch,
    searchQuery,
    setSearchQuery,
  } = useUI();
  const pathname = usePathname();
  const router = useRouter();
  const itemCount = getItemCount();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const allProducts = productsData as Product[];

  const navLinks = [
    { href: "/products", label: "OUR COFFEE", hasSubmenu: true },
    { href: "/wholesale", label: "WHOLESALE", hasSubmenu: true },
    { href: "/blog", label: "BLOG", hasSubmenu: false },
    { href: "/about", label: "ABOUT US", hasSubmenu: false },
  ];
  const [scrollOffset, setScrollOffset] = useState(0);
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

      setCurrentScrollTop(scrollTop);

      // Check if we're at the very top - topbar should ONLY show at scrollTop === 0

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

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.origin,
        product.process,
        product.producer,
        ...product.tastingNotes,
      ]
        .join(" ")
        .toLowerCase();
      return searchableText.includes(query);
    });
  }, [searchQuery, allProducts]);

  // Focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [searchOpen]);

  // Handle search input keydown
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    } else if (e.key === "Escape") {
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchOpen &&
        searchOverlayRef.current &&
        !searchOverlayRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("button[aria-label='Search']")
      ) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen, setSearchOpen, setSearchQuery]);

  return (
    <>
      {/* Search Backdrop - Desktop */}
      {searchOpen && (
        <div
          className="hidden lg:block fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity duration-300"
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery("");
          }}
          aria-hidden="true"
        />
      )}
      {/* Mobile Menu Backdrop - Outside header container */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className="fixed top-0 left-0 right-0 z-50 w-full"
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
                onClick={toggleSearch}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Account Icon - Desktop */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden h-10 w-10 transition-all duration-300 hover:bg-primary/10 hover:scale-110"
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
              <div className="flex items-center justify-between mb-6 pl-2">
                {/* User Icon - Left Side */}
                <Logo />

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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      router.push(
                        `/search?q=${encodeURIComponent(searchQuery.trim())}`
                      );
                      setMobileMenuOpen(false);
                      setSearchQuery("");
                    }
                  }}
                  className="w-full border-none border-gray-300 text-foreground placeholder:text-gray-400 placeholder:italic"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5"
                  aria-label="Search"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      router.push(
                        `/search?q=${encodeURIComponent(searchQuery.trim())}`
                      );
                      setMobileMenuOpen(false);
                      setSearchQuery("");
                    }
                  }}
                >
                  <Search className="h-4 w-4 text-gray-400" />
                </Button>
              </div>

              {/* Mobile Search Results */}
              {searchQuery.trim() && (
                <div className="mt-3 max-h-[60vh] overflow-y-auto mb-4">
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide px-2">
                        Products ({searchResults.length})
                      </div>
                      <div className="space-y-1">
                        {searchResults.slice(0, 5).map((product) => {
                          // Highlight matching text
                          const highlightText = (
                            text: string,
                            query: string
                          ) => {
                            const parts = text.split(
                              new RegExp(`(${query})`, "gi")
                            );
                            return parts.map((part, i) =>
                              part.toLowerCase() === query.toLowerCase() ? (
                                <mark
                                  key={i}
                                  className="bg-primary/20 text-primary font-semibold px-0.5 rounded"
                                >
                                  {part}
                                </mark>
                              ) : (
                                part
                              )
                            );
                          };

                          return (
                            <Link
                              key={product.id}
                              href={`/products/${product.slug}`}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setSearchQuery("");
                              }}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/80 transition-colors border"
                            >
                              <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden bg-gray-100">
                                {product.images[0] && (
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                                  {highlightText(product.name, searchQuery)}
                                </h3>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  From ${product.price.toFixed(2)}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      {searchResults.length > 5 && (
                        <button
                          onClick={() => {
                            router.push(
                              `/search?q=${encodeURIComponent(
                                searchQuery.trim()
                              )}`
                            );
                            setMobileMenuOpen(false);
                            setSearchQuery("");
                          }}
                          className="w-full text-center py-2 text-sm text-primary hover:text-primary/80 font-medium"
                        >
                          View all {searchResults.length} results →
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-t">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                        <AlertCircle className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        No products found
                      </p>
                      <p className="text-xs text-gray-500">
                        Try searching for &quot;
                        <span className="font-semibold">{searchQuery}</span>
                        &quot; with different terms
                      </p>
                    </div>
                  )}
                </div>
              )}

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

      {/* Desktop Search Overlay - Outside header container for proper z-index */}
      <div
        ref={searchOverlayRef}
        className={cn(
          "hidden lg:block fixed top-0 left-0 right-0 bg-gradient-to-b from-[#F5F1EB] via-[#F5F1EB]/98 to-[#F5F1EB]/95 backdrop-blur-lg border-b border-gray-200/50 shadow-2xl z-[101] transition-all duration-500 ease-out overflow-hidden",
          searchOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-8 pointer-events-none"
        )}
        style={{
          maxHeight: searchOpen ? "100vh" : "0",
          paddingTop: searchOpen
            ? `${headerHeight + currentTopbarHeight}px`
            : "0",
        }}
        onClick={(e) => {
          // Prevent clicks inside the overlay from closing it
          e.stopPropagation();
        }}
      >
        <div className="container px-4 md:px-6 py-8">
          {/* Search Input */}
          <div className="relative mb-6 max-w-3xl mx-auto">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 z-10">
              <Search className="h-6 w-6" />
            </div>
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search for coffee, origin, tasting notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className={cn(
                "w-full pl-14 h-16 text-xl border border-gray-300 focus-visible:ring-0 focus-visible:outline-none rounded-xl bg-white/90 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-400",
                searchQuery ? "pr-12" : "pr-14"
              )}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  searchInputRef.current?.focus();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1.5 transition-all duration-200 z-20"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Search Results */}
          {searchQuery.trim() && (
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto max-w-5xl mx-auto">
              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Products ({searchResults.length})
                    </div>
                    {searchResults.length > 10 && (
                      <button
                        onClick={() => {
                          router.push(
                            `/search?q=${encodeURIComponent(
                              searchQuery.trim()
                            )}`
                          );
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        View all results →
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {searchResults.slice(0, 10).map((product, index) => {
                      // Highlight matching text
                      const highlightText = (text: string, query: string) => {
                        const parts = text.split(
                          new RegExp(`(${query})`, "gi")
                        );
                        return parts.map((part, i) =>
                          part.toLowerCase() === query.toLowerCase() ? (
                            <mark
                              key={i}
                              className="bg-primary/20 text-primary font-semibold px-0.5 rounded"
                            >
                              {part}
                            </mark>
                          ) : (
                            part
                          )
                        );
                      };

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/90 hover:shadow-md transition-all duration-200 group border border-transparent hover:border-gray-200"
                          style={{
                            animation: searchOpen
                              ? `fadeInUp 0.3s ease-out ${index * 0.05}s both`
                              : "none",
                          }}
                        >
                          <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                            {product.images[0] && (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            )}
                            {product.featured && (
                              <div className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                                FEATURED
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                              {highlightText(product.name, searchQuery)}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                              {product.origin}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-base font-bold text-primary">
                                From ${product.price.toFixed(2)}
                              </p>
                              {product.score && (
                                <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                                  <span className="text-xs font-semibold text-gray-700">
                                    ⭐ {product.score}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <AlertCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    No products found for &quot;
                    <span className="font-semibold">{searchQuery}</span>
                    &quot;
                  </p>
                  <p className="text-sm text-gray-500">
                    Try searching with different terms
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Empty State - No search query */}
          {!searchQuery.trim() && (
            <div className="text-center py-12 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/50 mb-6 shadow-inner">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Start typing to search
              </p>
              <p className="text-sm text-gray-500">
                Search by coffee name, origin, tasting notes, or producer
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
