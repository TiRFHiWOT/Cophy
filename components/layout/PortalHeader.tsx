"use client";

import { useAuth } from "@/context/AuthContext";
import { User, Bell, ExternalLink, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function PortalHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/portal") return "Partner Dashboard";
    if (pathname.includes("/portal/samples")) return "Sample Tracking";
    if (pathname.includes("/portal/documents")) return "Technical Records";
    return "Partner Portal";
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-lot-earth/10 h-20">
      <div className="container h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left: Branding & Breadcrumb-style title */}
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:flex items-center gap-4 border-l border-lot-earth/10 pl-8">
            <h2 className="text-sm font-serif font-black text-lot-forest italic tracking-tight">
              {getPageTitle()}
            </h2>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-lot-earth hover:text-lot-forest transition-colors uppercase tracking-widest"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Public Exchange
          </Link>
          
          <div className="h-4 w-px bg-lot-earth/10 hidden lg:block" />
          
          <div className="flex items-center gap-4">
            <button className="relative text-lot-forest hover:text-lot-amber transition-colors p-2">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-lot-amber rounded-full border-2 border-white" />
            </button>
            
            <div className="flex items-center gap-3 pl-2 border-l border-lot-earth/10">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-lot-forest uppercase tracking-widest">
                  {user?.name || "Partner"}
                </span>
                <span className="text-[9px] text-lot-earth opacity-60 font-mono italic">
                  Authorized Access
                </span>
              </div>
              <div className="group relative">
                <div className="h-10 w-10 bg-lot-forest text-white flex items-center justify-center border border-white/10 overflow-hidden">
                  <User className="h-5 w-5" />
                </div>
                {/* Simple dropdown for logout would go here, but for now we have a direct button */}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => logout()}
                className="text-lot-forest hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
