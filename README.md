# Archers Coffee MVP - Next.js Clone

A frontend-only MVP clone of Archers Coffee website built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## Project Overview

This project replicates the core functionality of Archers Coffee website including:

- Product listings and details
- Shopping cart functionality
- Blog section
- Coffee Academy
- Responsive design with original styling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Data**: Static JSON files
- **Icons**: Lucide React

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/coffe
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer, etc.
│   ├── products/          # Product-related components
│   └── cart/              # Cart components
├── data/                  # Static JSON data files
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── context/               # React Context providers
```

## Features

- ✅ Product catalog with filtering
- ✅ Shopping cart with localStorage persistence
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Blog section
- ✅ Coffee Academy pages
- ✅ Original design with coffee-inspired color scheme

## Development Plan

See the implementation plan in the codebase for detailed development steps and todos.

## Notes

- All checkout/payment is mock (no real processing)
- Cart persists in localStorage
- Images sourced from Archers Coffee website
- Uses shadcn/ui for consistent, accessible components
