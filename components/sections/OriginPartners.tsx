"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import producersData from "@/data/producers.json";
import { Coffee } from "lucide-react";

interface Producer {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  location: string;
  products: string[];
}

export function OriginPartners() {
  const producers = producersData as Producer[];
  const duplicatedProducers = [...producers, ...producers, ...producers];

  return (
    <section className="w-full bg-lot-paper py-24 md:py-32 overflow-hidden border-t border-lot-earth/10">
      <div className="container px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
             <div className="h-px w-8 bg-lot-amber" />
             <Coffee className="h-5 w-5 text-lot-amber" />
             <div className="h-px w-8 bg-lot-amber" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-lot-forest mb-6 tracking-tighter">
            Origin Partners & <br /> <span className="text-lot-amber">Washing Stations.</span>
          </h2>
          <p className="text-sm md:text-base text-lot-earth font-light leading-relaxed">
            We operate directly at the source. From our own drying station in Guji Hambella to specialized cooperatives across Yirgacheffe and Sidama, these are the hands that guarantee our lot consistency.
          </p>
        </motion.div>
      </div>

      {/* Infinite scrolling slider */}
      <div className="relative w-full overflow-hidden py-10">
        <div className="flex animate-scroll-partners hover:[animation-play-state:paused] cursor-pointer">
          {duplicatedProducers.map((producer, index) => (
            <div
              key={`${producer.id}-${index}`}
              className="flex flex-col items-center justify-center group shrink-0 w-[250px] md:w-[350px] px-4"
            >
              <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-white border border-lot-earth/10 p-8 flex items-center justify-center group-hover:border-lot-amber/40 transition-all duration-500 shadow-sm">
                <Image
                  src={producer.image}
                  alt={producer.name}
                  fill
                  className="object-contain p-10 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  sizes="350px"
                />
                <div className="absolute inset-0 bg-lot-amber/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-lot-forest group-hover:text-lot-amber transition-colors mb-1">
                  {producer.name}
                </h3>
                <p className="text-[10px] font-mono font-bold text-lot-earth uppercase">
                  {producer.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
