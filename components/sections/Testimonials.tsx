"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Quote, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Thomas Andersen",
    role: "Head of Sourcing",
    company: "Nordic Roast A/S",
    text: "Working with Lot 251 has transformed our Ethiopian portfolio. Their technical data—from water activity to precise screen sizing—is the most reliable we've seen from an Addis exporter. The sample accuracy is impeccable.",
  },
  {
    name: "Elena Rossi",
    role: "Quality Control",
    company: "Serena Specialty Coffee",
    text: "The consistency of the G1 Sidama lots we contracted this year was outstanding. Lot 251's direct connection to the washing stations is evident in the cup. They are our primary partner for identity-preserved Ethiopian coffee.",
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-white text-lot-forest py-24 md:py-32 border-t border-lot-paper">
      <div className="container px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Column - Sales Hook */}
          <div className="w-full lg:w-1/3">
             <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-lot-amber" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-lot-forest uppercase">Partnerships</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 tracking-tighter leading-tight">
               Built on <br /><span className="text-lot-amber">Trust & Data.</span>
             </h2>
             <p className="text-sm text-lot-earth font-light leading-relaxed mb-10">
               We don't just export coffee; we manage international supply chains for the world's most demanding specialty roasters.
             </p>
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                   <div className="bg-lot-paper p-2">
                       <CheckCircle2 className="h-5 w-5 text-lot-amber" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest">Fixed-Price Contracting</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="bg-lot-paper p-2">
                       <CheckCircle2 className="h-5 w-5 text-lot-amber" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest">Identity Preservation</span>
                </div>
             </div>
             <Link href="/contact">
                <Button className="mt-12 bg-lot-forest text-white rounded-none px-10 py-7 uppercase font-bold tracking-widest text-xs h-auto w-full sm:w-auto">
                    Partner With The Exchange
                </Button>
             </Link>
          </div>

          {/* Right Column - Testimonials Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-lot-paper p-10 relative group border-l-4 border-lot-amber/20 hover:border-lot-amber transition-all duration-500"
              >
                <Quote className="h-10 w-10 text-lot-amber/20 mb-6" />
                <p className="text-sm md:text-base text-lot-forest font-light leading-relaxed mb-10 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-lot-forest flex items-center justify-center text-white font-serif font-bold italic">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider">{t.name}</h4>
                    <p className="text-[10px] text-lot-amber font-mono font-bold uppercase">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
                
                {/* Visual Rating */}
                <div className="absolute top-10 right-10 flex gap-0.5 opacity-30">
                   {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-lot-forest" />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
