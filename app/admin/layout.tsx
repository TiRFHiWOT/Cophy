import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Cophy Export Portal",
  description: "Manage coffee lots, inquiries, and trade documents.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-[#1B3022] text-white flex flex-col z-40">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-lg font-serif font-bold tracking-tight">
            Cophy <span className="text-[#D9C5B2]">Admin</span>
          </h1>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">
            Export Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <a
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all rounded"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </a>
          <a
            href="/admin/inquiries"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all rounded"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            Inquiries
          </a>
          <a
            href="/admin/inventory"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all rounded"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Inventory
          </a>
          <a
            href="/admin/documents"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all rounded"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Documents
          </a>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <a
            href="/"
            className="text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            ← Back to Public Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
