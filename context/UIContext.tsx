"use client";

import React, { createContext, useContext, useState } from "react";

interface UIContextType {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (!searchOpen) {
      // Clear search when opening
      setSearchQuery("");
    }
  };

  return (
    <UIContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen,
        toggleMobileMenu,
        searchOpen,
        setSearchOpen,
        toggleSearch,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
