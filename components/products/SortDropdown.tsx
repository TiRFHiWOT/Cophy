"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type SortOption =
  | "featured"
  | "best-selling"
  | "alphabetical"
  | "alphabetical-desc"
  | "price-asc"
  | "price-desc"
  | "date-old"
  | "date-new";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "FEATURED" },
  { value: "best-selling", label: "BEST SELLING" },
  { value: "alphabetical", label: "ALPHABETICALLY, A-Z" },
  { value: "alphabetical-desc", label: "ALPHABETICALLY, Z-A" },
  { value: "price-asc", label: "PRICE, LOW TO HIGH" },
  { value: "price-desc", label: "PRICE, HIGH TO LOW" },
  { value: "date-old", label: "DATE, OLD TO NEW" },
  { value: "date-new", label: "DATE, NEW TO OLD" },
];

export function SortDropdown({
  value,
  onChange,
  className,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLabel =
    sortOptions.find((opt) => opt.value === value)?.label ||
    "ALPHABETICALLY, A-Z";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 w-auto lg:w-[240px] justify-between ${
          className || ""
        }`}
      >
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLabel}</span>
          <span className="sm:hidden">SORT</span>
        </div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-50 min-w-[240px]"
          >
            <div className="py-1">
              {sortOptions.map((option) => {
                const isSelected = value === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                      isSelected ? "underline" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
