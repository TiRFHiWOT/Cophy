"use client";

import { usePathname } from "next/navigation";
import { User, Bell, Settings, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminHeader({ hideTitleOnMobile = false }: { hideTitleOnMobile?: boolean }) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.includes("/admin/inquiries")) return "Lead Management";
    if (pathname.includes("/admin/inventory")) return "Inventory Archive";
    if (pathname.includes("/admin/documents")) return "Trade Documents";
    return "Admin Portal";
  };

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className={cn(
          "text-xl font-serif font-black text-lot-forest tracking-tighter italic",
          hideTitleOnMobile && "hidden sm:block"
        )}>
          {getPageTitle()}
        </h2>
        <div className="h-4 w-px bg-lot-earth/20 mx-2 hidden md:block" />
        <div className="hidden md:flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-black text-lot-forest uppercase tracking-[0.2em]">
            System Live
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Link 
          href="/" 
          target="_blank"
          className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-lot-earth hover:text-lot-forest transition-colors uppercase tracking-widest"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Live Exchange
        </Link>
        
        <div className="h-4 w-px bg-lot-earth/20 hidden sm:block" />
        
        <div className="flex items-center gap-2 md:gap-4">
          <button className="text-lot-earth hover:text-lot-forest transition-colors p-2">
            <Bell className="h-4 w-4" />
          </button>
          <button className="hidden sm:block text-lot-earth hover:text-lot-forest transition-colors p-2">
            <Settings className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 pl-2 group cursor-pointer border-l border-lot-earth/10">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] font-black text-lot-forest uppercase tracking-widest">Trade Desk</span>
              <span className="text-[9px] text-lot-earth opacity-60 font-mono italic">Head Officer</span>
            </div>
            <div className="h-8 w-8 bg-lot-forest text-white flex items-center justify-center border border-white/10 group-hover:bg-lot-amber transition-colors">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
