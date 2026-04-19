"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Filter,
  ChevronDown,
  Mail,
  Building2,
  Globe,
  Tag,
  Calendar,
  Layers,
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
  pending: "bg-amber-50 text-amber-900 border-amber-200",
  contacted: "bg-blue-50 text-blue-900 border-blue-200",
  sample_shipped: "bg-purple-50 text-purple-900 border-purple-200",
  quoted: "bg-emerald-50 text-emerald-900 border-emerald-200",
  closed: "bg-gray-100 text-gray-900 border-gray-200",
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
      if (!error) setInquiries(data || []);
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
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2px] w-8 bg-lot-amber" />
          <span className="text-[10px] font-bold tracking-[0.4em] text-lot-earth uppercase">
            Lead Management
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-black text-lot-forest tracking-tighter italic">
          B2B Inquiries
        </h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-stretch gap-0 mb-8 border border-lot-earth/20 bg-white shadow-sm">
        <div className="flex-1 min-w-[300px] relative border-r border-lot-earth/20">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-lot-earth opacity-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by company, contact, or lot identifier..."
            className="w-full pl-14 pr-6 h-14 text-xs font-bold uppercase tracking-widest placeholder:text-lot-earth/30 focus:bg-lot-paper focus:outline-none transition-colors border-none"
          />
        </div>
        <div className="flex items-center px-6 gap-3 border-r border-lot-earth/20 bg-lot-paper/30">
          <Filter className="h-4 w-4 text-lot-earth opacity-40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-full bg-transparent text-[10px] font-bold uppercase tracking-widest focus:outline-none cursor-pointer pr-4"
          >
            <option value="all">Every Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.replace("_", " ")}</option>
            ))}
          </select>
        </div>
        <div className="px-8 flex items-center bg-lot-forest text-white">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {filtered.length} Leads
          </span>
        </div>
      </div>

      {/* Database View */}
      <div className="border border-lot-earth/20 bg-white">
        {loading ? (
          <div className="p-32 text-center">
            <div className="inline-block w-8 h-8 border-2 border-lot-earth/10 border-t-lot-amber rounded-full animate-spin" />
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-lot-earth/40 animate-pulse">Syncing with Exchange</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-32 text-center">
            <Mail className="h-10 w-10 text-lot-earth/10 mx-auto mb-6" />
            <p className="text-xl font-serif text-lot-forest italic">No corresponding inquiries found.</p>
          </div>
        ) : (
          <div className="divide-y divide-lot-earth/10">
            {filtered.map((inq) => (
              <div key={inq.id} className="group">
                {/* Row */}
                <button
                  onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                  className="w-full px-8 py-6 flex items-center gap-8 text-left hover:bg-lot-paper transition-all group/row"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="h-3.5 w-3.5 text-lot-amber" />
                      <span className="font-serif font-black text-lot-forest text-lg leading-none tracking-tight">
                        {inq.company_name}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-lot-earth bg-lot-earth/10 px-1.5 py-0.5 uppercase tracking-widest">
                        {inq.company_country}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-lot-earth/60">
                      <span>{inq.contact_name}</span>
                      <div className="w-1 h-1 rounded-full bg-lot-earth/30" />
                      <span className="font-mono lowercase tracking-normal">{inq.contact_email}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-lot-earth opacity-40">Contract Type</span>
                    <span className="text-xs font-bold text-lot-forest">{inq.type === "sample_request" ? "SAMPLE EVALUATION" : "QUOTATION REQUEST"}</span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-lot-earth opacity-40">Identifier</span>
                    <span className="text-xs font-mono font-bold text-lot-amber">{inq.lot_number || "DIRECT-EX"}</span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-lot-earth opacity-40">Log Date</span>
                    <span className="text-xs font-mono font-bold text-lot-forest">
                      {new Date(inq.created_at).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" })}
                    </span>
                  </div>

                  <div className={`px-4 py-2 border border-lot-earth/20 transition-all ${expandedId === inq.id ? "bg-lot-forest text-white" : "bg-white text-lot-forest"}`}>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedId === inq.id ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {/* Expanded Detail */}
                {expandedId === inq.id && (
                  <div className="px-10 py-10 bg-lot-paper border-y border-lot-earth/10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] mb-3">Contact Dossier</p>
                          <p className="text-sm font-black text-lot-forest italic mb-1">{inq.contact_name}</p>
                          <p className="text-xs font-mono text-lot-earth">{inq.contact_email}</p>
                          {inq.contact_phone && <p className="text-xs font-mono text-lot-earth mt-1">{inq.contact_phone}</p>}
                        </div>
                        {inq.contact_role && (
                          <div>
                            <p className="text-[9px] font-bold text-lot-earth/40 uppercase tracking-widest mb-1">Position</p>
                            <p className="text-xs font-bold text-lot-forest uppercase tracking-widest">{inq.contact_role}</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] mb-3">Specifications</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[9px] font-bold text-lot-earth/40 uppercase tracking-widest mb-1">Volume</p>
                              <p className="text-xs font-bold text-lot-forest">{inq.quantity_bags || 0} BAGS</p>
                              <p className="text-[10px] font-mono text-lot-earth opacity-60">≈ {(inq.quantity_bags || 0) * 60}kg</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-lot-earth/40 uppercase tracking-widest mb-1">Incoterm</p>
                              <p className="text-xs font-bold text-lot-forest">{inq.incoterm || "TBD"}</p>
                              <p className="text-[10px] font-mono text-lot-earth opacity-60 uppercase">{inq.shipping_method || "TBD"}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] mb-3">Internal Memo</p>
                          <div className="bg-white p-6 border border-lot-earth/10 min-h-[100px] text-xs font-light leading-relaxed text-lot-earth italic">
                            {inq.notes || "No additional technical requirements logged for this inquiry."}
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-lot-earth/10 pt-6">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-lot-forest uppercase tracking-widest">Update State:</span>
                              <select
                                value={inq.status}
                                onChange={(e) => updateStatus(inq.id, e.target.value)}
                                className="h-10 px-4 border border-lot-earth/20 text-[10px] font-bold uppercase tracking-widest focus:border-lot-amber focus:outline-none bg-white min-w-[180px]"
                              >
                                {STATUS_OPTIONS.map((s) => (
                                  <option key={s} value={s}>{s.replace("_", " ")}</option>
                                ))}
                              </select>
                            </div>
                            <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-lot-earth/20 ${STATUS_STYLES[inq.status]}`}>
                              Current: {inq.status.replace("_", " ")}
                            </div>
                        </div>
                      </div>
                    </div>
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
