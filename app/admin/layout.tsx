import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin | Hendi Coffee",
  description: "Manage coffee lots, inquiries, and trade documents.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}
