"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { SortDropdown } from "@/components/products/SortDropdown";
import { Button } from "@/components/ui/button";
import { Filter, Grid2x2, Grid3x3, Square } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/types";

type SortOption =
  | "featured"
  | "best-selling"
  | "alphabetical"
  | "alphabetical-desc"
  | "price-asc"
  | "price-desc"
  | "date-old"
  | "date-new";
type GridSize = 2 | 3 | 4;

function ProductsPage() {
  const allProducts = productsData as Product[];
  const [sortBy, setSortBy] = useState<SortOption>("alphabetical");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Country filter
      if (selectedCountries.length > 0) {
        const productCountry = product.origin.split(",")[0].trim();
        if (!selectedCountries.includes(productCountry)) {
          return false;
        }
      }

      // Category filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) {
          return false;
        }
      }

      // Process filter
      if (selectedProcesses.length > 0) {
        if (!selectedProcesses.includes(product.process)) {
          return false;
        }
      }

      return true;
    });
  }, [allProducts, selectedCountries, selectedCategories, selectedProcesses]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "featured":
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        case "best-selling":
          // For now, we'll use featured as best-selling since we don't have sales data
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        case "alphabetical":
          return a.name.localeCompare(b.name);
        case "alphabetical-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "date-old":
          // Assuming products are ordered by ID for date, lower ID = older
          return parseInt(a.id) - parseInt(b.id);
        case "date-new":
          // Higher ID = newer
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const handleCountryChange = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleProcessChange = (process: string) => {
    setSelectedProcesses((prev) =>
      prev.includes(process)
        ? prev.filter((p) => p !== process)
        : [...prev, process]
    );
  };

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className="container px-4 py-12">
      {/* Header Section - Full Width */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl text-gray-800 font-bold mb-6">
          OUR COFFEE SELECTION
        </h1>

        {/* Description Paragraphs */}
        <div className="space-y-4 mb-8">
          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            Our coffees are sourced in season and roasted with care to honor the
            producers&apos; hard work and bring out the flavors, aromatics, and
            acidities allowing each coffee to tell its own story.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            Enjoy browsing our extensive selection featuring a broad range of
            flavor profiles and varieties. Find your perfect coffee among our
            catalog of different origins and according to your preferred drink
            method or roast profile.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            Our espresso roast coffee are recommended if you have an espresso
            machine or if you are using a Mokha Pot.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            Meanwhile, our filter roast coffees are recommended for pour-overs,
            AeroPress, Chemex, and other drip filter device that you have.
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-200">
          {/* Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "HIDE FILTERS" : "FILTER"}
          </Button>

          {/* Sort Dropdown */}
          <SortDropdown value={sortBy} onChange={setSortBy} />

          {/* Grid Size Selector */}
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setGridSize(2)}
              className={gridSize === 2 ? "bg-primary/10" : ""}
              aria-label="2 columns"
            >
              <Grid2x2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setGridSize(3)}
              className={gridSize === 3 ? "bg-primary/10" : ""}
              aria-label="3 columns"
            >
              <Grid3x3 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setGridSize(4)}
              className={gridSize === 4 ? "bg-primary/10" : ""}
              aria-label="4 columns"
            >
              <Square className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Section with Sidebar - Flex Layout */}
      <div className="flex relative">
        <FilterSidebar
          isOpen={showFilters}
          products={allProducts}
          selectedCountries={selectedCountries}
          selectedCategories={selectedCategories}
          selectedProcesses={selectedProcesses}
          onCountryChange={handleCountryChange}
          onCategoryChange={handleCategoryChange}
          onProcessChange={handleProcessChange}
        />
        <div className="flex-1">
          {/* Products Grid */}
          <div className={`grid ${gridCols[gridSize]} gap-6`}>
            {sortedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
