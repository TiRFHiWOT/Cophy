"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2 } from "lucide-react";

interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
  verified?: boolean;
}

const reviews: Review[] = [
  {
    name: "Dimitri Mendrinos",
    date: "9 days ago on Google",
    rating: 5,
    text: "One of if not the best coffee roaster in the UAE. The beans are consistent, the quality amazing and at a reasonable price. Very large variety of beans as well. A big problem with roasters in Dubai is consistency year round. In summer because of the heat and high humidity if the gre...",
    verified: true,
  },
  {
    name: "Mohamed Askar",
    date: "10 days ago on Google",
    rating: 5,
    text: "توقيت العمل سيء والمحل يغلق بدري وقهوتهم ممتازة",
    verified: true,
  },
  {
    name: "Sarah Johnson",
    date: "2 weeks ago on Google",
    rating: 5,
    text: "Absolutely incredible coffee! The quality and freshness is unmatched. Their commitment to sourcing from producing partners really shows in every cup. Highly recommend trying their seasonal selections.",
    verified: true,
  },
  {
    name: "Michael Chen",
    date: "3 weeks ago on Google",
    rating: 5,
    text: "The best specialty coffee I've found. The transparency about their sourcing and the care they put into roasting is evident. Every bag has been exceptional.",
    verified: true,
  },
];

export function Reviews() {
  const averageRating = 4.7;
  const reviewCount = 303;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="w-full bg-background text-foreground py-16 md:py-24">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            WHAT OUR FRIENDS ARE SAYING
          </h2>
          <div className="w-24 h-0.5 bg-foreground mx-auto"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl md:text-6xl font-bold text-foreground">
                {averageRating}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 md:h-6 md:w-6 ${
                        i < Math.floor(averageRating)
                          ? "fill-primary text-primary"
                          : i < averageRating
                          ? "fill-primary/60 text-primary/60"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  Based on {reviewCount} reviews
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all px-6 py-6 text-base"
            >
              Review us on Google
            </Button>
          </motion.div>

          {/* Reviews Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {reviews.slice(0, 2).map((review, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6 md:p-8 duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg text-foreground">
                        {review.name}
                      </h4>
                      {review.verified && (
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 md:h-5 md:w-5 ${
                          i < review.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm md:text-base text-foreground leading-relaxed line-clamp-4">
                  {review.text}
                </p>
                {review.text.length > 150 && (
                  <button className="text-sm md:text-base text-primary mt-3 hover:underline font-medium">
                    Read more
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
