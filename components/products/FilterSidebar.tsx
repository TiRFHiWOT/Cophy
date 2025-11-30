"use client";

import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { Product } from "@/types";
import { useState, useMemo } from "react";

interface FilterSidebarProps {
  isOpen: boolean;
  products: Product[];
  selectedCountries: string[];
  selectedCategories: string[];
  selectedProcesses: string[];
  onCountryChange: (country: string) => void;
  onCategoryChange: (category: string) => void;
  onProcessChange: (process: string) => void;
}

export function FilterSidebar({
  isOpen,
  products,
  selectedCountries,
  selectedCategories,
  selectedProcesses,
  onCountryChange,
  onCategoryChange,
  onProcessChange,
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

  const sidebarVariants = {
    closed: {
      width: 0,
      opacity: 0,
      x: -20,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      width: "280px",
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="border-r border-gray-200 overflow-y-auto shrink-0"
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
                const isSelected = selectedCountries.includes(country);
                return (
                  <div key={country} className="relative">
                    <label className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-2 -ml-2 rounded transition-colors">
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {country.toUpperCase()}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onCountryChange(country)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                      />
                    </label>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded shadow-md pointer-events-none z-10"
                      >
                        + {country.toLowerCase()}
                      </motion.div>
                    )}
                  </div>
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
                const isSelected = selectedCategories.includes(category);
                return (
                  <div key={category} className="relative">
                    <label className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-2 -ml-2 rounded transition-colors">
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 capitalize">
                        {category.replace("-", " ")}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onCategoryChange(category)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                      />
                    </label>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded shadow-md pointer-events-none z-10"
                      >
                        + {category.replace("-", " ").toLowerCase()}
                      </motion.div>
                    )}
                  </div>
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
                const isSelected = selectedProcesses.includes(process);
                return (
                  <div key={process} className="relative">
                    <label className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-2 -ml-2 rounded transition-colors">
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {process.toUpperCase()}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onProcessChange(process)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                      />
                    </label>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded shadow-md pointer-events-none z-10"
                      >
                        + {process.toLowerCase()}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
