"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Filter,
  ChevronDown,
  Mail,
  Clock,
  Building2,
} from "lucide-react";

type InquiryStatus = "pending" | "contacted" | "sample_shipped" | "quoted" | "closed";

interface Inquiry {
  id: string;
  company_name: string;
  company_country: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  contact_role: string | null;
  lot_number: string | null;
  type: string;
  quantity_bags: number | null;
  shipping_method: string | null;
  incoterm: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS: InquiryStatus[] = [
  "pending",
  "contacted",
  "sample_shipped",
  "quoted",
  "closed",
];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  sample_shipped: "bg-purple-100 text-purple-800 border-purple-200",
  quoted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  closed: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  async function fetchInquiries() {
    setLoading(true);
    try {
      let query = supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.warn("Failed to fetch inquiries:", error);
      } else {
        setInquiries(data || []);
      }
    } catch (e) {
      console.warn("Inquiry fetch error:", e);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from("inquiries")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === id ? { ...inq, status: newStatus } : inq
        )
      );
    }
  }

  const filtered = inquiries.filter((inq) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      inq.company_name.toLowerCase().includes(q) ||
      inq.contact_name.toLowerCase().includes(q) ||
      inq.contact_email.toLowerCase().includes(q) ||
      (inq.lot_number && inq.lot_number.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#1B3022]">
          Inquiries
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage sample and quote requests from buyers
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, contact, lot..."
            className="w-full pl-10 pr-4 h-10 border border-gray-200 rounded-lg text-sm focus:border-[#1B3022] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 border border-gray-200 rounded-lg text-sm focus:border-[#1B3022] focus:outline-none appearance-none bg-white pr-8"
          >
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <span className="text-xs text-gray-400 font-medium">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-gray-400">
            <div className="inline-block w-8 h-8 border-2 border-gray-200 border-t-[#1B3022] rounded-full animate-spin" />
            <p className="mt-4 text-sm">Loading inquiries...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No inquiries found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((inq) => (
              <div key={inq.id}>
                {/* Row */}
                <button
                  onClick={() =>
                    setExpandedId(expandedId === inq.id ? null : inq.id)
                  }
                  className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="h-3.5 w-3.5 text-gray-400" />
                      <span className="font-medium text-[#1B3022] text-sm">
                        {inq.company_name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        ({inq.company_country})
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {inq.contact_name} • {inq.contact_email}
                    </p>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                    {inq.type === "sample_request" ? "Sample" : "Quote"}
                  </span>

                  <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
                    {inq.lot_number || "General"}
                  </span>

                  <span
                    className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border whitespace-nowrap ${
                      STATUS_STYLES[inq.status] || STATUS_STYLES.pending
                    }`}
                  >
                    {inq.status.replace("_", " ")}
                  </span>

                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(inq.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      expandedId === inq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded Detail */}
                {expandedId === inq.id && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Contact
                        </p>
                        <p className="text-sm font-medium">{inq.contact_name}</p>
                        <p className="text-xs text-gray-500">{inq.contact_email}</p>
                        {inq.contact_phone && (
                          <p className="text-xs text-gray-500">{inq.contact_phone}</p>
                        )}
                        {inq.contact_role && (
                          <p className="text-xs text-gray-400 capitalize mt-1">{inq.contact_role}</p>
                        )}
                      </div>
                      {inq.quantity_bags && (
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Quantity
                          </p>
                          <p className="text-sm font-medium">{inq.quantity_bags} bags</p>
                          <p className="text-xs text-gray-500">
                            ≈ {inq.quantity_bags * 60}kg
                          </p>
                        </div>
                      )}
                      {inq.shipping_method && (
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Shipping
                          </p>
                          <p className="text-sm font-medium uppercase">{inq.shipping_method}</p>
                          {inq.incoterm && (
                            <p className="text-xs text-gray-500">Incoterm: {inq.incoterm}</p>
                          )}
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Update Status
                        </p>
                        <select
                          value={inq.status}
                          onChange={(e) => updateStatus(inq.id, e.target.value)}
                          className="h-9 px-3 border border-gray-200 rounded text-xs font-medium focus:border-[#1B3022] focus:outline-none bg-white w-full"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s.replace("_", " ")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {inq.notes && (
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Notes
                        </p>
                        <p className="text-sm text-gray-600 bg-white p-3 border border-gray-200 rounded">
                          {inq.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
