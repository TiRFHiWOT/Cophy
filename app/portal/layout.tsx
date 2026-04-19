import type { Metadata } from "next";
import PortalHeader from "@/components/layout/PortalHeader";

export const metadata: Metadata = {
  title: "Partner Portal | Lot 251 Export Exchange",
  description: "Authorized access to coffee lots, technical records, and logistics tracking.",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-lot-paper">
      <PortalHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
