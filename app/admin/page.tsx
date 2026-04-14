"use client";

import { useEffect, useState } from "react";
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
        // Fetch inquiry counts
        const { count: totalInquiries, error: err1 } = await supabase
          .from("inquiries")
          .select("*", { count: "exact", head: true });

        const { count: pendingInquiries, error: err2 } = await supabase
          .from("inquiries")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");

        // Fetch lot count
        const { count: totalLots, error: err3 } = await supabase
          .from("coffee_lots")
          .select("*", { count: "exact", head: true });

        // Fetch recent inquiries
        const { data: recentInquiries, error: err4 } = await supabase
          .from("inquiries")
          .select("id, company_name, contact_email, type, lot_number, status, created_at")
          .order("created_at", { ascending: false })
          .limit(10);

        if (err1 || err2 || err3 || err4) {
          console.warn("Supabase query errors:", { err1, err2, err3, err4 });
          setDbConnected(false);
        }

        setStats({
          totalInquiries: totalInquiries || 0,
          pendingInquiries: pendingInquiries || 0,
          totalLots: totalLots || 0,
          recentInquiries: recentInquiries || [],
        });
      } catch (e) {
        console.warn("Failed to fetch dashboard stats:", e);
        setDbConnected(false);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#1B3022]">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your coffee export operations
        </p>
      </div>

      {/* Connection Warning */}
      {!dbConnected && !loading && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Database not connected
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Update your <code className="bg-amber-100 px-1 py-0.5 rounded">.env.local</code> with
              your Supabase URL and anon key, then run the SQL migration in{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded">supabase/migrations/001_initial_schema.sql</code>.
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {STAT_CARDS.map((card) => (
          <div
            key={card.key}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                {card.label}
              </span>
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1B3022]">
              {loading ? (
                <span className="inline-block w-12 h-8 bg-gray-100 rounded animate-pulse" />
              ) : (
                stats[card.key]
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#1B3022]">
              Recent Inquiries
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Latest sample and quote requests
            </p>
          </div>
          <a
            href="/admin/inquiries"
            className="text-xs font-bold text-[#1B3022] hover:text-[#2c4c36] flex items-center gap-1 uppercase tracking-widest"
          >
            View All
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400">
            <div className="inline-block w-8 h-8 border-2 border-gray-200 border-t-[#1B3022] rounded-full animate-spin" />
            <p className="mt-4 text-sm">Loading...</p>
          </div>
        ) : stats.recentInquiries.length === 0 ? (
          <div className="p-12 text-center">
            <Inbox className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No inquiries yet</p>
            <p className="text-xs text-gray-400 mt-1">
              {dbConnected
                ? "Inquiries from the public site will appear here."
                : "Connect your Supabase database to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Company
                  </th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Type
                  </th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Lot
                  </th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#1B3022]">
                        {inquiry.company_name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {inquiry.contact_email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {inquiry.type === "sample_request" ? "Sample" : "Quote"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-gray-600">
                        {inquiry.lot_number || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${
                          STATUS_STYLES[inquiry.status] || STATUS_STYLES.pending
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(inquiry.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
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
