"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export function Loading({
  size = "md",
  text,
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={sizeClasses[size]}
        >
          <Coffee className="h-full w-full text-primary" />
        </motion.div>
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground font-medium"
          >
            {text}
          </motion.p>
        )}
        {/* Animated dots */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
