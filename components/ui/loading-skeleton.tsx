"use client";

import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({
  className = "",
  count = 1,
}: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`animate-pulse bg-muted rounded ${className}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </>
  );
}

// Pre-built skeleton components
export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="aspect-square w-full" />
      <LoadingSkeleton className="h-6 w-3/4" />
      <LoadingSkeleton className="h-4 w-1/2" />
      <LoadingSkeleton className="h-8 w-1/3" />
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="aspect-4/3 w-full rounded-lg" />
      <LoadingSkeleton className="h-4 w-1/4" />
      <LoadingSkeleton className="h-6 w-full" />
      <LoadingSkeleton className="h-4 w-3/4" />
      <LoadingSkeleton className="h-4 w-1/2" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
