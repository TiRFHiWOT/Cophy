"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  User,
  X,
  AlertCircle,
  LogOut,
  ChevronRight,
  Menu
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useEffect, useRef, useState, useMemo } from "react";
import productsData from "@/data/products.json";
import { CoffeeLot } from "@/types";
import Image from "next/image";

export function Header() {
  const {
    mobileMenuOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
    searchOpen,
    setSearchOpen,
    toggleSearch,
    searchQuery,
    setSearchQuery,
    toggleAuthModal,
  } = useUI();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const allProducts = productsData as unknown as CoffeeLot[];

  const navLinks = [
    { href: "/products", label: "CURRENT OFFERINGS" },
    { href: "/ordering-info", label: "HOW TO BUY" },
    { href: "/about", label: "ABOUT" },
    { href: "/blog", label: "INSIGHTS" },
    { href: "/contact", label: "CONTACT" },
  ];

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [currentScrollTop, setCurrentScrollTop] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);
  const [topbarHeight, setTopbarHeight] = useState(36);

  const topbarMessage = "PREMIUM ETHIOPIAN GREEN COFFEE · DIRECT FROM ORIGIN · SCA SCORED & EXPORT-READY";

  useEffect(() => {
    if (topbarRef.current) setTopbarHeight(topbarRef.current.scrollHeight);
    const handleScroll = () => setCurrentScrollTop(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter((product) => 
      [product.name, product.region, product.lotNumber].join(" ").toLowerCase().includes(query)
    );
  }, [searchQuery, allProducts]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300">
        {/* TopBar */}
        <div
          ref={topbarRef}
          className={cn(
            "w-full bg-lot-forest text-white text-[10px] md:text-xs overflow-hidden transition-all duration-500 ease-in-out",
            currentScrollTop > 50 ? "h-0 opacity-0" : "h-10 opacity-100 flex items-center"
          )}
        >
          <div className="container flex items-center justify-center h-full">
            <p className="font-bold tracking-[0.2em] whitespace-nowrap text-center opacity-80 uppercase">
              {topbarMessage}
            </p>
          </div>
        </div>

        {/* Header */}
        <header
          ref={headerRef}
          className={cn(
            "w-full transition-all duration-500 z-40 relative border-b",
            currentScrollTop > 20 
              ? "bg-white/80 backdrop-blur-md border-lot-earth/10 py-3 shadow-sm" 
              : "bg-transparent border-transparent py-5 md:py-8"
          )}
        >
          <div className="container flex items-center justify-between px-4 md:px-6">
            <div className="flex-1 lg:flex-none">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-[10px] font-bold tracking-[0.2em] transition-all duration-300 uppercase relative py-2",
                    pathname === link.href ? "text-lot-amber" : "text-lot-forest hover:text-lot-amber"
                  )}
                  onMouseEnter={() => setHoveredNav(link.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  {link.label}
                  <span className={cn(
                    "absolute bottom-0 left-0 h-px bg-lot-amber transition-all duration-300",
                    pathname === link.href || hoveredNav === link.label ? "w-full" : "w-0"
                  )} />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-lot-forest hover:bg-lot-amber/10"
                onClick={toggleSearch}
              >
                <Search className="h-5 w-5" />
              </Button>

              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/portal">
                    <Button
                      variant="ghost"
                      className="h-10 px-4 text-[10px] font-bold tracking-widest text-lot-forest hover:bg-lot-amber/10 border border-lot-forest/10 uppercase"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-lot-forest hover:text-red-600 hover:bg-red-50"
                    onClick={() => logout()}
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="hidden md:flex h-10 px-4 text-[10px] font-bold tracking-widest text-lot-forest hover:bg-lot-amber/10 border border-lot-forest/10 uppercase"
                  onClick={toggleAuthModal}
                >
                  <User className="mr-2 h-4 w-4" />
                  Partner Portal
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 text-lot-forest"
                onClick={toggleMobileMenu}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl animate-fade-in flex flex-col">
          <div className="p-6 md:p-12 flex justify-end">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
              <X className="h-8 w-8 text-lot-forest" />
            </Button>
          </div>
          <div className="container max-w-4xl px-6">
            <div className="space-y-8">
              <div className="border-b-2 border-lot-forest pb-4 flex items-center gap-4">
                <Search className="h-8 w-8 text-lot-amber" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="SEARCH LOTS BY REGION, SCA SCORE, OR ORIGIN..."
                  className="w-full bg-transparent border-none focus:outline-none text-2xl md:text-4xl font-serif font-bold text-lot-forest placeholder:text-lot-earth/30 uppercase"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {searchQuery && (
                <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[60vh]">
                  {searchResults.map(product => (
                    <Link 
                      key={product.id} 
                      href={`/products/${product.slug}`}
                      className="group flex items-center justify-between p-6 hover:bg-lot-paper border-b border-lot-earth/10"
                      onClick={() => setSearchOpen(false)}
                    >
                      <div>
                        <p className="text-[10px] font-mono font-bold text-lot-amber uppercase">{product.lotNumber}</p>
                        <h4 className="text-xl font-bold text-lot-forest">{product.name}</h4>
                      </div>
                      <ChevronRight className="h-6 w-6 text-lot-earth transform group-hover:translate-x-2 transition-transform" />
                    </Link>
                  ))}
                  {searchResults.length === 0 && (
                    <p className="text-center py-20 text-lot-earth uppercase tracking-widest font-bold">No results found for lot specifications.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-[60] bg-lot-forest transition-all duration-500 flex flex-col p-8",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center mb-20 text-white">
          <Logo />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-white hover:bg-white/10">
            <X className="h-8 w-8" />
          </Button>
        </div>
        <nav className="flex flex-col space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-3xl font-serif font-bold text-white hover:text-lot-amber transition-colors"
              onClick={toggleMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-10 border-t border-white/10 flex flex-col space-y-6">
            {user ? (
              <>
                <Link href="/portal" onClick={toggleMobileMenu}>
                  <Button variant="outline" className="w-full text-white border-white/20 hover:bg-white/10 uppercase font-bold tracking-widest py-6">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="text-white/60 hover:text-white uppercase font-bold tracking-widest"
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                className="text-white border-white/20 hover:bg-white/10 uppercase font-bold tracking-widest py-6"
                onClick={() => {
                  toggleAuthModal();
                  toggleMobileMenu();
                }}
              >
                Partner Login
              </Button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
