export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: "espresso" | "pour-over" | "capsule" | "drip";
  collection?: string;
  origin: string;
  process: string;
  tastingNotes: string[];
  score?: number;
  producer?: string;
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
  product: Product;
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
