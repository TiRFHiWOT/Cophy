"use client";

import { motion } from "framer-motion";
import { ChevronUp, X } from "lucide-react";
import { Product } from "@/types";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  isOpen: boolean;
  products: Product[];
  selectedCountry: string | null;
  selectedCategory: string | null;
  selectedProcess: string | null;
  onCountryChange: (country: string | null) => void;
  onCategoryChange: (category: string | null) => void;
  onProcessChange: (process: string | null) => void;
  onClose?: () => void;
}

export function FilterSidebar({
  isOpen,
  products,
  selectedCountry,
  selectedCategory,
  selectedProcess,
  onCountryChange,
  onCategoryChange,
  onProcessChange,
  onClose,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    country: true,
    category: true,
    process: true,
  });

  // Extract unique filter options
  const filterOptions = useMemo(() => {
    const countries = new Set<string>();
    const categories = new Set<string>();
    const processes = new Set<string>();

    products.forEach((product) => {
      // Extract country from origin (e.g., "Panama, Nueva Suiza" -> "Panama")
      const country = product.origin.split(",")[0].trim();
      if (country && country !== "Blend") {
        countries.add(country);
      }
      if (product.category) {
        categories.add(product.category);
      }
      if (product.process) {
        processes.add(product.process);
      }
    });

    return {
      countries: Array.from(countries).sort(),
      categories: Array.from(categories).sort(),
      processes: Array.from(processes).sort(),
    };
  }, [products]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Prevent body scroll when mobile filter is open (only on mobile)
  useEffect(() => {
    const handleScrollLock = () => {
      // Only prevent scroll on mobile (screen width < 1024px)
      const isMobile = window.innerWidth < 1024;
      if (isOpen && isMobile) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    };

    handleScrollLock();

    // Update on resize
    window.addEventListener("resize", handleScrollLock);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("resize", handleScrollLock);
    };
  }, [isOpen]);

  const sidebarVariants = {
    closed: {
      width: 0,
      opacity: 0,
      x: -20,
    },
    open: {
      width: "280px",
      opacity: 1,
      x: 0,
    },
  };

  const mobileSidebarVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar - Full screen slide in */}
      <motion.div
        variants={mobileSidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "lg:hidden fixed left-0 top-0 h-screen w-full bg-[#F5F1EB] overflow-y-auto z-50 shadow-2xl flex flex-col",
          isOpen
            ? "opacity-100 translate-x-0 visible pointer-events-auto"
            : "opacity-0 -translate-x-full invisible pointer-events-none"
        )}
        style={{
          width: "100vw",
        }}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col flex-1 px-4 py-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">FILTERS</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose || (() => {})}
              aria-label="Close filters"
            >
              <X className="h-5 w-5 text-foreground" />
            </Button>
          </div>

          {/* Mobile Filter Content */}
          <div className="flex-1">
            {/* Country of Origin */}
            <div className="mb-8">
              <button
                onClick={() => toggleSection("country")}
                className="flex items-center justify-between w-full mb-4 group"
              >
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  COUNTRY OF ORIGIN
                </h3>
                <ChevronUp
                  className={`h-4 w-4 text-gray-600 transition-transform ${
                    expandedSections.country ? "" : "rotate-180"
                  }`}
                />
              </button>
              {expandedSections.country && (
                <div className="space-y-3">
                  {filterOptions.countries.map((country) => {
                    const isSelected = selectedCountry === country;
                    return (
                      <button
                        key={country}
                        onClick={() => {
                          onCountryChange(isSelected ? null : country);
                          onClose?.();
                        }}
                        className="w-full flex items-center justify-between cursor-pointer group hover:bg-white/50 p-2 -ml-2 rounded transition-colors"
                      >
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {country.toUpperCase()}
                        </span>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-0 focus:outline-none cursor-pointer pointer-events-none"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="mb-8">
              <button
                onClick={() => toggleSection("category")}
                className="flex items-center justify-between w-full mb-4 group"
              >
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  CATEGORY
                </h3>
                <ChevronUp
                  className={`h-4 w-4 text-gray-600 transition-transform ${
                    expandedSections.category ? "" : "rotate-180"
                  }`}
                />
              </button>
              {expandedSections.category && (
                <div className="space-y-3">
                  {filterOptions.categories.map((category) => {
                    const isSelected = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          onCategoryChange(isSelected ? null : category);
                          onClose?.();
                        }}
                        className="w-full flex items-center justify-between cursor-pointer group hover:bg-white/50 p-2 -ml-2 rounded transition-colors"
                      >
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 capitalize">
                          {category.replace("-", " ")}
                        </span>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-0 focus:outline-none cursor-pointer pointer-events-none"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Process */}
            <div className="mb-8">
              <button
                onClick={() => toggleSection("process")}
                className="flex items-center justify-between w-full mb-4 group"
              >
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  PROCESS
                </h3>
                <ChevronUp
                  className={`h-4 w-4 text-gray-600 transition-transform ${
                    expandedSections.process ? "" : "rotate-180"
                  }`}
                />
              </button>
              {expandedSections.process && (
                <div className="space-y-3">
                  {filterOptions.processes.map((process) => {
                    const isSelected = selectedProcess === process;
                    return (
                      <button
                        key={process}
                        onClick={() => {
                          onProcessChange(isSelected ? null : process);
                          onClose?.();
                        }}
                        className="w-full flex items-center justify-between cursor-pointer group hover:bg-white/50 p-2 -ml-2 rounded transition-colors"
                      >
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {process.toUpperCase()}
                        </span>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-0 focus:outline-none cursor-pointer pointer-events-none"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Sidebar - Inline */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:block border-r border-gray-200 overflow-y-auto shrink-0"
        style={{ overflow: isOpen ? "auto" : "hidden" }}
      >
        <div className="p-6">
          {/* Country of Origin */}
          <div className="mb-8">
            <button
              onClick={() => toggleSection("country")}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                COUNTRY OF ORIGIN
              </h3>
              <ChevronUp
                className={`h-4 w-4 text-gray-600 transition-transform ${
                  expandedSections.country ? "" : "rotate-180"
                }`}
              />
            </button>
            {expandedSections.country && (
              <div className="space-y-3">
                {filterOptions.countries.map((country) => {
                  const isSelected = selectedCountry === country;
                  return (
                    <button
                      key={country}
                      onClick={() =>
                        onCountryChange(isSelected ? null : country)
                      }
                      className="w-full flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-2 -ml-2 rounded transition-colors"
                    >
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {country.toUpperCase()}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-0 focus:outline-none cursor-pointer pointer-events-none"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="mb-8">
            <button
              onClick={() => toggleSection("category")}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                CATEGORY
              </h3>
              <ChevronUp
                className={`h-4 w-4 text-gray-600 transition-transform ${
                  expandedSections.category ? "" : "rotate-180"
                }`}
              />
            </button>
            {expandedSections.category && (
              <div className="space-y-3">
                {filterOptions.categories.map((category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() =>
                        onCategoryChange(isSelected ? null : category)
                      }
                      className="w-full flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-2 -ml-2 rounded transition-colors"
                    >
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 capitalize">
                        {category.replace("-", " ")}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-0 focus:outline-none cursor-pointer pointer-events-none"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Process */}
          <div className="mb-8">
            <button
              onClick={() => toggleSection("process")}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                PROCESS
              </h3>
              <ChevronUp
                className={`h-4 w-4 text-gray-600 transition-transform ${
                  expandedSections.process ? "" : "rotate-180"
                }`}
              />
            </button>
            {expandedSections.process && (
              <div className="space-y-3">
                {filterOptions.processes.map((process) => {
                  const isSelected = selectedProcess === process;
                  return (
                    <button
                      key={process}
                      onClick={() =>
                        onProcessChange(isSelected ? null : process)
                      }
                      className="w-full flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-2 -ml-2 rounded transition-colors"
                    >
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {process.toUpperCase()}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-0 focus:outline-none cursor-pointer pointer-events-none"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
