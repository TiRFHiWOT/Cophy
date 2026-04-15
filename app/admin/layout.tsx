import type { Metadata } from "next";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Inbox, 
  Package, 
  FileText, 
  ArrowLeft 
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin | Lot 251 Export Portal",
  description: "Manage coffee lots, inquiries, and trade documents.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-lot-paper paper-texture">
      {/* Admin Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-lot-forest text-white flex flex-col z-40 border-r border-white/5">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-white/10">
          <h1 className="text-xl font-serif font-black tracking-tight leading-none">
            Lot 251 <span className="text-lot-amber font-mono text-sm block mt-1 uppercase tracking-[0.2em] opacity-80">Admin</span>
          </h1>
          <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mt-3 font-bold">
            Export Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-0 py-6 space-y-0 overflow-y-auto">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all border-l-2 border-transparent"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all border-l-2 border-transparent"
          >
            <Inbox className="h-4 w-4" />
            Inquiries
          </Link>
          <Link
            href="/admin/inventory"
            className="flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all border-l-2 border-transparent"
          >
            <Package className="h-4 w-4" />
            Inventory
          </Link>
          <Link
            href="/admin/documents"
            className="flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all border-l-2 border-transparent"
          >
            <FileText className="h-4 w-4" />
            Documents
          </Link>
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
      <div className="ml-64 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
