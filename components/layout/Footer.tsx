"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Clock } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lot-forest text-white pt-20 pb-10">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Logo variant="light" />
            <p className="text-sm text-white/60 leading-relaxed font-light mt-4">
              Lot 251 is a global commodity exchange specializing in the direct export of the finest Ethiopian green coffee. Built on 30 years of sourcing heritage.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center border border-white/10 hover:border-lot-amber transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center border border-white/10 hover:border-lot-amber transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center border border-white/10 hover:border-lot-amber transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8 opacity-40">Exchange</h4>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-sm hover:text-lot-amber transition-colors">Current Offerings</Link></li>
              <li><Link href="/logistics" className="text-sm hover:text-lot-amber transition-colors">Logistics Services</Link></li>
              <li><Link href="/ordering-info" className="text-sm hover:text-lot-amber transition-colors">Contract Terms</Link></li>
              <li><Link href="/about" className="text-sm hover:text-lot-amber transition-colors">Sourcing Standards</Link></li>
            </ul>
          </div>

          {/* Coffee Origins */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8 opacity-40">Origins</h4>
            <ul className="space-y-4">
              <li><Link href="/products?region=Sidama" className="text-sm hover:text-lot-amber transition-colors">Sidama (G1 - G4)</Link></li>
              <li><Link href="/products?region=Yirgacheffe" className="text-sm hover:text-lot-amber transition-colors">Yirgacheffe (G1 - G2)</Link></li>
              <li><Link href="/products?region=Guji" className="text-sm hover:text-lot-amber transition-colors">Guji & Hambella</Link></li>
              <li><Link href="/products?region=Harar" className="text-sm hover:text-lot-amber transition-colors">Harar & Jimma</Link></li>
            </ul>
          </div>

          {/* Global Contact */}
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-40">Headquarters</h4>
              <div className="flex gap-4 items-start">
                 <MapPin className="h-4 w-4 text-lot-amber shrink-0 mt-1" />
                 <p className="text-xs text-white/60 leading-normal">
                   Yesak Building, 3rd Floor<br />
                   Lideta, Addis Ababa<br />
                   Ethiopia
                 </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-40">Business Hours</h4>
              <div className="flex gap-4 items-start mb-4">
                 <Clock className="h-4 w-4 text-lot-amber shrink-0 mt-1" />
                 <p className="text-xs text-white/60 leading-normal">
                   Mon - Fri: 09:00 - 17:00<br />
                   EAT (UTC+3)
                 </p>
              </div>
              <div className="flex gap-4 items-center">
                 <Mail className="h-4 w-4 text-lot-amber shrink-0" />
                 <a href="mailto:contact@lot251.coffee" className="text-xs text-white hover:text-lot-amber transition-colors">contact@lot251.coffee</a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-white/40 font-mono tracking-widest uppercase text-center md:text-left">
            &copy; {currentYear} Lot 251 Import & Export PLC. Licensed Exporter.
          </div>
          <div className="flex gap-8">
            <Link href="/terms" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase font-bold tracking-widest">Terms</Link>
            <Link href="/privacy" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase font-bold tracking-widest">Privacy</Link>
            <Link href="/contact" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase font-bold tracking-widest">Global Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
