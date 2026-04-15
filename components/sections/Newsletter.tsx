"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Info } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 5000);
  };

  return (
    <section className="py-24 md:py-32 bg-lot-paper border-t border-lot-earth/10">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto bg-lot-forest p-10 md:p-16 lg:p-20 relative overflow-hidden flex flex-col items-center text-center">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lot-amber/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="flex justify-center mb-8">
               <div className="h-14 w-14 bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-lot-amber" />
               </div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white mb-6 tracking-tighter">
              Stay Informed. <br /><span className="text-lot-amber">Market Intelligence.</span>
            </h2>
            
            <p className="text-sm md:text-base text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Receive seasonal lot availability, detailed FOB pricing guides, and Ethiopian coffee export news direct to your inbox. No spam, only data.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 border border-white/20 p-6 flex items-center gap-4 text-white"
              >
                <CheckCircle2 className="h-6 w-6 text-lot-amber" />
                <p className="text-sm font-bold uppercase tracking-widest text-left">
                  Subscription Confirmed. <br />
                  <span className="text-xs font-normal opacity-60">You are now on the export intelligence list.</span>
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto w-full group"
              >
                <div className="relative flex-1">
                   <Input
                    type="email"
                    placeholder="CORPORATE EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-16 w-full rounded-none bg-white text-lot-forest border-none focus-visible:ring-lot-amber placeholder:text-lot-earth/50 text-xs font-bold tracking-widest px-6"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-16 px-10 bg-lot-amber text-white hover:bg-white hover:text-lot-forest rounded-none font-bold uppercase tracking-widest text-[10px] transition-all duration-300"
                >
                  Join List
                </Button>
              </form>
            )}

            <div className="mt-10 flex items-center justify-center gap-3 text-white/30">
               <Info className="h-3 w-3" />
               <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Restricted to roasting & importing professionals</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
