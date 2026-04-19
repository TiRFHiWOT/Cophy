"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Inbox, 
  Package, 
  FileText, 
  ArrowLeft,
  Menu,
  X
} from "lucide-react";
import AdminHeader from "./AdminHeader";
import { cn } from "@/lib/utils";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-lot-paper">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-lot-forest/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 bottom-0 w-64 bg-lot-forest text-white flex flex-col z-50 border-r border-white/5 transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="px-6 py-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-black tracking-tight leading-none text-white">
              Lot 251 <span className="text-lot-amber font-mono text-sm block mt-1 uppercase tracking-[0.2em] opacity-80">Admin</span>
            </h1>
            <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mt-3 font-bold">
              Export Management
            </p>
          </div>
          <button 
            className="lg:hidden text-white/40 hover:text-white p-2"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-0 py-6 space-y-0 overflow-y-auto">
          {[
            { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
            { href: "/admin/inquiries", icon: Inbox, label: "Inquiries" },
            { href: "/admin/inventory", icon: Package, label: "Inventory" },
            { href: "/admin/documents", icon: FileText, label: "Documents" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-l-2",
                pathname === item.href 
                  ? "text-white bg-white/5 border-lot-amber" 
                  : "text-white/60 hover:text-white hover:bg-white/5 border-transparent"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-lot-amber transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Public Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-lot-earth/10 bg-lot-paper/80 px-4 md:px-8 backdrop-blur-md">
          <button 
            className="lg:hidden p-2 mr-2 text-lot-forest hover:bg-lot-forest/5"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <AdminHeader hideTitleOnMobile />
        </header>

        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
