"use client";

import { motion } from "framer-motion";
import { Ship, Shield, Leaf, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: Shield,
    title: "Identity Preserved",
    description:
      "Every lot is traceable to a specific washing station or smallholder group. No bulk blending. We preserve the distinct micro-terroir of each harvest.",
    highlights: ["SCA Grade 1 - 5", "Non-GMO Heirloom", "Zero Cross-Origin Blending"]
  },
  {
    icon: Leaf,
    title: "Direct-Source Equity",
    description:
      "A shorter supply chain means more equity for producers. We bypass bulk auctions to work directly with cooperatives and independent washing stations.",
    highlights: ["Fair Pre-Financing", "Direct Premium Payments", "EU/NOP Organic Ready"]
  },
  {
    icon: Ship,
    title: "Export Logistics",
    description:
      "Full stack logistics from dry mill to port. We manage SPS inspections, GrainPro vacuum sealing, and consolidated shipping for roasters of all sizes.",
    highlights: ["FOB Djibouti / FCA Addis", "GrainPro Documentation", "LCL & FCL Shipping"]
  },
];

export function WhyLot251() {
  return (
    <section className="w-full bg-lot-paper py-24 md:py-32 border-y border-lot-earth/10">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-end gap-8 mb-20">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-lot-amber" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-lot-forest uppercase">
                  Technical Excellence
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-lot-forest leading-[1.1] tracking-tighter">
                Sourcing Without <br />
                <span className="text-lot-amber">Obscurity.</span>
              </h2>
            </div>
            <p className="flex-1 text-sm md:text-base text-lot-earth leading-relaxed font-light md:mb-2">
              Lot 251 is built on the belief that a high-end specialty market requires high-end technical transparency. 
              We provide the data, documentation, and logistical reliability that global roasters need to scale their operations with confidence.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-lot-earth/10 border border-lot-earth/10">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-lot-paper p-10 md:p-12 hover:bg-white transition-all duration-500 group"
              >
                <div className="h-16 w-16 bg-lot-forest/5 flex items-center justify-center mb-10 border border-lot-forest/10 group-hover:bg-lot-amber/10 group-hover:border-lot-amber/20 transition-all duration-300">
                  <pillar.icon className="h-8 w-8 text-lot-forest group-hover:text-lot-amber" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-lot-forest mb-6 group-hover:text-lot-amber transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-lot-earth leading-relaxed font-light mb-8 h-20 overflow-hidden">
                  {pillar.description}
                </p>
                <ul className="space-y-3">
                  {pillar.highlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-3.5 w-3.5 text-lot-amber/40" />
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-lot-forest/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
