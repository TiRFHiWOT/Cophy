"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Package,
  Inbox,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react";

interface DashboardStats {
  totalInquiries: number;
  pendingInquiries: number;
  totalLots: number;
  recentInquiries: Array<{
    id: string;
    company_name: string;
    contact_email: string;
    type: string;
    lot_number: string | null;
    status: string;
    created_at: string;
  }>;
}

const STAT_CARDS = [
  {
    label: "Total Inquiries",
    key: "totalInquiries" as const,
    icon: Inbox,
    color: "bg-blue-50 text-blue-600",
    iconColor: "text-blue-500",
  },
  {
    label: "Pending",
    key: "pendingInquiries" as const,
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
    iconColor: "text-amber-500",
  },
  {
    label: "Active Lots",
    key: "totalLots" as const,
    icon: Package,
    color: "bg-emerald-50 text-emerald-600",
    iconColor: "text-emerald-500",
  },
];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  contacted: "bg-blue-100 text-blue-800",
  sample_shipped: "bg-purple-100 text-purple-800",
  quoted: "bg-emerald-100 text-emerald-800",
  closed: "bg-gray-100 text-gray-700",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInquiries: 0,
    pendingInquiries: 0,
    totalLots: 0,
    recentInquiries: [],
  });
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { count: totalInquiries, error: err1 } = await supabase
          .from("inquiries")
          .select("*", { count: "exact", head: true });

        const { count: pendingInquiries, error: err2 } = await supabase
          .from("inquiries")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");

        const { count: totalLots, error: err3 } = await supabase
          .from("coffee_lots")
          .select("*", { count: "exact", head: true });

        const { data: recentInquiries, error: err4 } = await supabase
          .from("inquiries")
          .select("id, company_name, contact_email, type, lot_number, status, created_at")
          .order("created_at", { ascending: false })
          .limit(10);

        if (err1 || err2 || err3 || err4) setDbConnected(false);

        setStats({
          totalInquiries: totalInquiries || 0,
          pendingInquiries: pendingInquiries || 0,
          totalLots: totalLots || 0,
          recentInquiries: recentInquiries || [],
        });
      } catch (e) {
        setDbConnected(false);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2px] w-8 bg-lot-amber" />
          <span className="text-[10px] font-bold tracking-[0.4em] text-lot-earth uppercase">
            System Overview
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-black text-lot-forest tracking-tighter italic">
          Dashboard
        </h1>
      </div>

      {/* Connection Warning */}
      {!dbConnected && !loading && (
        <div className="mb-8 border border-lot-amber/30 bg-lot-amber/5 p-6 flex items-start gap-4">
          <Clock className="h-5 w-5 text-lot-amber shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-lot-forest uppercase tracking-widest">
              Database Offline
            </p>
            <p className="text-xs text-lot-earth mt-2 font-light leading-relaxed">
              Connection to Supabase could not be established. Ensure your <code className="bg-lot-forest/10 px-1 py-0.5 text-lot-forest">.env.local</code> 
              contains valid <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="font-mono">ANON_KEY</code> credentials. 
              Running in read-only mock mode.
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-12 border border-lot-earth/20 bg-white">
        {STAT_CARDS.map((card, idx) => (
          <div
            key={card.key}
            className={`p-10 border-lot-earth/20 hover:bg-lot-paper transition-colors ${
              idx !== STAT_CARDS.length - 1 ? "md:border-r border-b md:border-b-0" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black text-lot-earth uppercase tracking-[0.2em]">
                {card.label}
              </span>
              <card.icon className="h-5 w-5 text-lot-amber opacity-40" />
            </div>
            <p className="text-5xl font-serif font-black text-lot-forest tracking-tighter">
              {loading ? "..." : stats[card.key]}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white border border-lot-earth/20 overflow-hidden">
        <div className="px-8 py-6 border-b border-lot-earth/20 flex items-center justify-between bg-lot-forest/5">
          <div>
            <h2 className="text-xl font-serif font-bold text-lot-forest tracking-tight">
              Recent Inquiries
            </h2>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-[10px] font-black text-lot-forest hover:text-lot-amber flex items-center gap-2 uppercase tracking-[0.2em] transition-colors"
          >
            Manage All
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        {loading ? (
          <div className="p-24 text-center">
            <div className="inline-block w-8 h-8 border-2 border-lot-earth/10 border-t-lot-amber rounded-full animate-spin" />
          </div>
        ) : stats.recentInquiries.length === 0 ? (
          <div className="p-24 text-center">
            <Inbox className="h-10 w-10 text-lot-earth/20 mx-auto mb-4" />
            <p className="text-lot-earth font-light text-sm italic">
              No active leads found in the exchange log.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-lot-forest text-white text-left">
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Entity
                  </th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Type
                  </th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Lot Identifier
                  </th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Exchange Status
                  </th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-right">
                    Log Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lot-earth/10">
                {stats.recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-lot-paper transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-lot-forest text-base leading-none mb-1">
                        {inquiry.company_name}
                      </p>
                      <p className="text-[10px] font-mono text-lot-earth uppercase tracking-widest opacity-60">
                        {inquiry.contact_email}
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-lot-forest bg-lot-forest/5 px-2 py-1">
                        {inquiry.type === "sample_request" ? "Sample" : "Quote"}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-mono font-bold text-lot-amber">
                        {inquiry.lot_number || "DIRECT TRADE"}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-lot-earth/20 ${
                          STATUS_STYLES[inquiry.status] || STATUS_STYLES.pending
                        }`}
                      >
                        {inquiry.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-[10px] font-mono font-bold text-lot-earth/60 text-right">
                      {new Date(inquiry.created_at).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
