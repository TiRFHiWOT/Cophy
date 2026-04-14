export interface CoffeeLot {
  id: string;
  lotNumber: string;
  slug: string;
  name: string;
  description: string;
  region: string;
  washingStation: string;
  altitudeRange: string;
  processMethod: "Washed" | "Natural" | "Honey" | "Anaerobic";
  scaScore: number;
  moistureContent: number;
  harvestYear: number;
  bagsAvailable: number;
  bagWeightKg: number;
  fobPriceUsd: number;
  images: string[];
  category: "espresso" | "pour-over" | "capsule" | "drip";
  inStock: boolean;
  featured?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface CartItem {
  product: CoffeeLot;
  quantity: number;
  grind?: "whole-bean" | "filter" | "espresso";
  brewMethod?: string;
  espressoMachine?: string;
}

export interface Producer {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  location: string;
  products: string[];
}

export interface AcademyCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  type: "sca" | "cqi" | "workshop";
  price: number;
  image: string;
}
