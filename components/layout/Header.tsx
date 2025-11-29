"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { Button } from "@/components/ui/button";
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
    { href: "/products", label: "Our Coffee" },
    { href: "/subscription", label: "Subscription" },
    { href: "/academy", label: "Coffee Academy" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About Us" },
  ];

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

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 transition-all duration-300",
        isScrolled ? "shadow-md shadow-primary/10" : ""
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
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
        <div className="flex items-center space-x-2 md:space-x-4">
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

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10 transition-all duration-300 hover:bg-primary/10 active:scale-95"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-6 h-6">
              <span
                className={cn(
                  "absolute top-0 left-0 w-6 h-0.5 bg-foreground rounded-full transition-all duration-300",
                  mobileMenuOpen ? "top-3 rotate-45" : "top-0 rotate-0"
                )}
              />
              <span
                className={cn(
                  "absolute top-3 left-0 w-6 h-0.5 bg-foreground rounded-full transition-all duration-300",
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute top-6 left-0 w-6 h-0.5 bg-foreground rounded-full transition-all duration-300",
                  mobileMenuOpen ? "top-3 -rotate-45" : "top-6 rotate-0"
                )}
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu - Slide in animation */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 bg-background/98 backdrop-blur-md border-t overflow-y-auto transition-all duration-300 ease-in-out z-40 shadow-2xl",
          mobileMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible"
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="container flex flex-col px-4 py-6 space-y-1">
          {navLinks.map((link, index) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-3 rounded-lg text-base font-medium transition-all duration-300",
                  "hover:bg-primary/10 active:bg-primary/20",
                  "transform hover:translate-x-1 active:scale-[0.98]",
                  isActive
                    ? "text-primary bg-primary/5 border-l-4 border-primary"
                    : "text-foreground"
                )}
                onClick={toggleMobileMenu}
                style={{
                  animation: mobileMenuOpen
                    ? `slideInFromTop 0.3s ease-out ${index * 50}ms both`
                    : "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Mobile Cart Link */}
          <Link
            href="/cart"
            className={cn(
              "relative px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 mt-4",
              "hover:bg-primary/10 active:bg-primary/20",
              "transform hover:translate-x-1 active:scale-[0.98]",
              pathname === "/cart"
                ? "text-primary bg-primary/5 border-l-4 border-primary"
                : "text-foreground"
            )}
            onClick={toggleMobileMenu}
            style={{
              animation: mobileMenuOpen
                ? `slideInFromTop 0.3s ease-out ${navLinks.length * 50}ms both`
                : "none",
            }}
          >
            <div className="flex items-center justify-between">
              <span>Shopping Cart</span>
              {itemCount > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
