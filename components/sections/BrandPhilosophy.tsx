"use client";

import { motion } from "framer-motion";
import { Ship, Shield, Leaf } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Full Traceability",
    description:
      "Every lot is traceable from the washing station to your roastery. We provide full documentation: phytosanitary certificates, certificates of origin, and ICO export permits.",
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    description:
      "We work directly with smallholder cooperatives. Fair premiums go to farmers, not middlemen. Every lot meets NOP/EU organic and Fair Trade standards.",
  },
  {
    icon: Ship,
    title: "Export-Ready Logistics",
    description:
      "From dry mill processing to FOB Djibouti or Addis port. We handle SPS inspection, warehousing, and container loading. FCL and LCL options available.",
  },
];

export function BrandPhilosophy() {
  return (
    <section className="w-full">
      <div className="w-full bg-[#1B3022] text-white py-24">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-20"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#D9C5B2]/40" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#D9C5B2] uppercase">
                  Why Partner With Us
                </span>
                <div className="h-px w-12 bg-[#D9C5B2]/40" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight mb-6">
                Reliability at
                <br />
                <span className="text-[#D9C5B2]">Every Stage</span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
                From cherry to container, we manage the entire chain with
                precision. Our export infrastructure ensures your coffee arrives
                on spec, on time, every time.
              </p>
            </motion.div>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="border border-white/10 p-10 hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="h-14 w-14 bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-[#D9C5B2]/10 group-hover:border-[#D9C5B2]/30 transition-all duration-300">
                    <pillar.icon className="h-7 w-7 text-[#D9C5B2]" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
