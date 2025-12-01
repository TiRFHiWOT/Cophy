"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { SortDropdown } from "@/components/products/SortDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, X, AlertCircle } from "lucide-react";
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

function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const allProducts = productsData as Product[];
  const [sortBy, setSortBy] = useState<SortOption>("alphabetical");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // Calculate price range from products
  useEffect(() => {
    if (allProducts.length > 0) {
      const prices = allProducts.map((p) => p.price);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange([minPrice, maxPrice]);
    }
  }, [allProducts]);

  // Search products based on query
  const searchedProducts = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase().trim();
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
      return searchableText.includes(searchTerm);
    });
  }, [query, allProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return searchedProducts.filter((product) => {
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

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [
    searchedProducts,
    selectedCountries,
    selectedCategories,
    selectedProcesses,
    priceRange,
  ]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "featured":
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        case "best-selling":
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
          return parseInt(a.id) - parseInt(b.id);
        case "date-new":
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  return (
    <div className="container px-4 py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className={`w-full pl-12 h-12 text-base border-2 border-gray-300 focus:border-primary rounded-lg ${
              searchQuery ? "pr-24 md:pr-28" : "pr-24 md:pr-28"
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                router.push("/search");
              }}
              className="absolute right-20 md:right-24 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <Button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:block z-10"
          >
            SEARCH
          </Button>
        </form>
      </div>

      {/* Results Header */}
      {query && (
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Results for {query}
          </h1>
          <p className="text-sm text-gray-600 uppercase tracking-wide">
            Products ({filteredProducts.length})
          </p>
        </div>
      )}

      {/* Filter and Sort Bar */}
      <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-200 mb-6">
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
      </div>

      {/* Products Section with Sidebar */}
      <div className="flex relative">
        <FilterSidebar
          isOpen={showFilters}
          products={searchedProducts}
          selectedCountries={selectedCountries}
          selectedCategories={selectedCategories}
          selectedProcesses={selectedProcesses}
          onCountryChange={handleCountryChange}
          onCategoryChange={handleCategoryChange}
          onProcessChange={handleProcessChange}
        />
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <AlertCircle className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                {query
                  ? `No products found for "${query}"`
                  : "Enter a search term to find products"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
