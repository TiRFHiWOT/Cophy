"use client";

import { usePathname } from "next/navigation";
import { User, Bell, Settings, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminHeader() {
  const pathname = usePathname();
  
  // Dynamic title based on pathname
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.includes("/admin/inquiries")) return "Lead Management";
    if (pathname.includes("/admin/inventory")) return "Inventory Archive";
    if (pathname.includes("/admin/documents")) return "Trade Documents";
    return "Admin Portal";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-lot-earth/10 bg-lot-paper/80 px-8 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-serif font-black text-lot-forest tracking-tighter italic">
          {getPageTitle()}
        </h2>
        <div className="h-4 w-px bg-lot-earth/20 mx-2" />
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-black text-lot-forest uppercase tracking-[0.2em]">
            System Live
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center gap-2 text-[10px] font-bold text-lot-earth hover:text-lot-forest transition-colors uppercase tracking-widest"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Live Exchange
        </Link>
        
        <div className="h-4 w-px bg-lot-earth/20" />
        
        <div className="flex items-center gap-4">
          <button className="text-lot-earth hover:text-lot-forest transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <button className="text-lot-earth hover:text-lot-forest transition-colors">
            <Settings className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-lot-forest uppercase tracking-widest">Trade Desk</span>
              <span className="text-[9px] text-lot-earth opacity-60 font-mono italic">Head Officer</span>
            </div>
            <div className="h-8 w-8 bg-lot-forest text-white flex items-center justify-center border border-white/10 group-hover:bg-lot-amber transition-colors">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
