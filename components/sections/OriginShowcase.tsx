"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";

const regions = [
  {
    name: "Sidama",
    desc: "Vibrant acidity and profound berry sweetness. Home to the Bombe mountains.",
    altitude: "1900 - 2400m",
    profile: "Fruit-forward, Lively, Sweet",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&h=1000&fit=crop"
  },
  {
    name: "Yirgacheffe",
    desc: "The world's most distinctive floral and citrus profiles. Elegant tea-like clarity.",
    altitude: "1800 - 2100m",
    profile: "Jasmine, Bergamot, Lemon",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&h=1000&fit=crop"
  },
  {
    name: "Guji",
    desc: "Dense forests producing complex, rose-scented naturals and structured washed lots.",
    altitude: "1900 - 2300m",
    profile: "Floral, Stone Fruit, Balanced",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=1000&fit=crop"
  },
  {
    name: "Harar",
    desc: "Traditional dry-processed lots with a unique 'winey' body and wild blueberry character.",
    altitude: "1600 - 1800m",
    profile: "Winey, Moka, Earthy",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=1000&fit=crop"
  },
  {
    name: "Limu",
    desc: "Spicy and distinctly complex washed lots with winey acidity and rounded body.",
    altitude: "1400 - 2200m",
    profile: "Spicy, Winey, Sweet",
    image: "https://images.unsplash.com/photo-1514432324607-a2c622d54ea9?w=800&h=1000&fit=crop"
  }
];

export function OriginShowcase() {
  return (
    <section className="py-24 md:py-32 bg-lot-forest text-white">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <Map className="h-4 w-4 text-lot-amber" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">
                Regional Micro-Terroirs
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black tracking-tighter leading-tight">
              Rooted in <span className="text-lot-amber">Origin.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-white/50 leading-relaxed font-light md:mb-2">
            Ethiopia is the genetic birthplace of Arabica. Our sourcing network covers 30+ micro-regions, each offering a distinct profile dictated by altitude and traditional processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {regions.map((region, idx) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative h-[450px] overflow-hidden"
            >
              <Image
                src={region.image}
                alt={region.name}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lot-forest/90 via-lot-forest/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs font-bold text-lot-amber font-mono uppercase tracking-widest">{region.altitude}</span>
                  <h3 className="text-3xl font-serif font-bold mb-4">{region.name}</h3>
                  <p className="text-sm text-white/60 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light">
                    {region.desc}
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex-1">{region.profile}</span>
                    <Link href={`/products?region=${region.name}`} className="h-10 w-10 flex items-center justify-center bg-white/10 hover:bg-lot-amber transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
