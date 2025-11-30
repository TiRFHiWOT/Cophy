"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import producersData from "@/data/producers.json";

interface Producer {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  location: string;
  products: string[];
}

export function ProducingPartners() {
  const producers = producersData as Producer[];

  // Duplicate producers for seamless infinite scroll
  const duplicatedProducers = [...producers, ...producers, ...producers];

  return (
    <section className="w-full bg-[hsl(var(--dark-green))] text-white py-16 md:py-24 overflow-hidden">
      <div className="container px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            OUR PRODUCING PARTNERS
          </h2>
          <div className="w-24 h-0.5 bg-white mx-auto"></div>
        </motion.div>
      </div>

      {/* Infinite scrolling slider */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-partners">
          {duplicatedProducers.map((producer, index) => (
            <div
              key={`${producer.id}-${index}`}
              className="flex flex-col items-center justify-center group shrink-0 w-[200px] md:w-[250px]"
            >
              <div className="relative w-[150px] h-[150px] mb-4 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm p-4 flex items-center justify-center">
                <Image
                  src={producer.image}
                  alt={producer.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  sizes="150px"
                />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-center text-white/90 px-4">
                {producer.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
