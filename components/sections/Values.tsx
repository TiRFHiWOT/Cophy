"use client";

import { motion } from "framer-motion";
import { Coffee, Heart, Leaf, Award } from "lucide-react";

const values = [
  {
    icon: Coffee,
    title: "Quality",
    description:
      "Seasonally sourced and delicately roasted to showcase the hard work of our producing partners.",
  },
  {
    icon: Heart,
    title: "Transparency",
    description:
      "Full transparency about our sourcing, pricing, and relationships with producers.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Working with producers committed to sustainable farming practices and environmental stewardship.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Roasting carefully to bring out diversity of flavors, aromatics, and acidities.",
  },
];

export function Values() {
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
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Values
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quality. Transparency. Sustainability. The principles that guide
            every cup we serve.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              className="text-center p-6 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
