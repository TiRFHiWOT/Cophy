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

## Design System

### Theme: Warm Coffee-Inspired

The design system uses a warm, inviting coffee shop aesthetic with browns, creams, and amber tones that evoke freshly roasted coffee beans.

#### Color Palette

**Primary Colors:**

- Primary: `hsl(25, 95%, 53%)` - Rich amber/orange (coffee roast tones)
- Primary Dark: `hsl(25, 90%, 48%)` - Darker variant for hover states
- Primary Light: `hsl(25, 95%, 90%)` - Lightest for backgrounds

**Secondary Colors:**

- Secondary Light: `#A0826D` - Lighter warm brown
- Secondary Main: `#8B6F47` - Main warm brown
- Secondary Dark: `#6D4C41` - Darker brown

**Accent Colors:**

- Accent Light: `#6D4C41`
- Accent Main: `#5D4037` - Deep coffee brown
- Accent Dark: `#4E342E` - Darkest brown

**Background Colors:**

- Background Light: `#FAF8F5` - Lightest cream
- Background Main: `#F5F1EB` - Main cream background
- Background Dark: `#E8E3DB` - Slightly darker cream

**Text Colors:**

- Text Primary: `hsl(222.2, 84%, 4.9%)` - Dark brown/black for readability
- Text Secondary: `hsl(215.4, 16.3%, 46.9%)` - Muted brown
- Text Muted: `hsl(215.4, 16.3%, 46.9%)` - Muted text

#### Typography

- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Font Sizes**: 12px (xs) to 60px (6xl) with consistent scale
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Heights**: 1.25 (tight), 1.5 (normal), 1.75 (relaxed)

#### Spacing System

Based on 4px unit system:

- 4px (1), 8px (2), 12px (3), 16px (4), 24px (6), 32px (8), 48px (12), 64px (16)

#### Border Radius

- Small: 4px
- Base: 8px
- Large: 12px
- XL: 16px
- Full: 9999px

#### Breakpoints

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

#### Transitions

- Fast: 150ms
- Base: 300ms
- Slow: 500ms

#### Usage

Theme constants are defined in `lib/theme.ts` and can be imported for consistent styling:

```typescript
import { colors, spacing, typography } from "@/lib/theme";
```

CSS variables are available globally via `app/globals.css` and can be used with Tailwind's `hsl()` function or directly in CSS.

## Notes

- All checkout/payment is mock (no real processing)
- Cart persists in localStorage
- Images sourced from Archers Coffee website
- Uses shadcn/ui for consistent, accessible components
