"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import {
  Upload,
  FileText,
  Trash2,
  Download,
  FolderOpen,
  Database,
  Calendar,
} from "lucide-react";

interface DocRow {
  id: string;
  inquiry_id: string;
  doc_type: string;
  file_url: string;
  uploaded_at: string;
}

const DOC_TYPES = [
  "Phytosanitary Certificate",
  "Certificate of Origin",
  "Bill of Lading",
  "ICO Export Permit",
  "Quality/Cupping Report",
  "Commercial Invoice",
  "Packing List",
  "Other",
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState(DOC_TYPES[0]);
  const [inquiryId, setInquiryId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("shipment_documents")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (!error && data) setDocuments(data);
    } catch (e) {
      console.warn("Failed to fetch documents:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !inquiryId.trim()) return;

    setUploading(true);

    try {
      const filePath = `${inquiryId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("trade-documents")
        .upload(filePath, file);

      if (uploadError) {
        alert("Upload failed: " + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("trade-documents")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from("shipment_documents")
        .insert({
          inquiry_id: inquiryId,
          doc_type: selectedDocType,
          file_url: urlData.publicUrl,
        });

      if (!dbError) {
        fetchDocuments();
        setInquiryId("");
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function deleteDocument(id: string) {
    if (!confirm("Delete this document?")) return;

    const { error } = await supabase
      .from("shipment_documents")
      .delete()
      .eq("id", id);

    if (!error) {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    }
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2px] w-8 bg-lot-amber" />
          <span className="text-[10px] font-bold tracking-[0.4em] text-lot-earth uppercase">
            Trade Compliance
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-black text-lot-forest tracking-tighter italic">
          Shipment Documents
        </h1>
      </div>

      {/* Upload Form */}
      <div className="bg-white border-2 border-lot-forest p-10 mb-12 shadow-xl">
        <h2 className="text-2xl font-serif font-black text-lot-forest tracking-tight italic mb-10 border-b border-lot-earth/10 pb-6">
          File Ingestion
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
          <div>
            <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
              Inquiry ID (UUID)
            </label>
            <input
              value={inquiryId}
              onChange={(e) => setInquiryId(e.target.value)}
              placeholder="Paste unique identifier..."
              className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper font-mono text-xs focus:border-lot-amber focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
              Document Category
            </label>
            <select
              value={selectedDocType}
              onChange={(e) => setSelectedDocType(e.target.value)}
              className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper text-xs font-bold uppercase tracking-widest focus:border-lot-amber focus:outline-none cursor-pointer"
            >
              {DOC_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
              Technical File (Max 10MB)
            </label>
            <div className="flex items-center gap-6">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleUpload}
                disabled={uploading || !inquiryId.trim()}
                className="text-xs font-bold font-mono file:mr-6 file:py-4 file:px-8 file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-[0.2em] file:bg-lot-forest file:text-white hover:file:bg-lot-forest/90 file:cursor-pointer disabled:opacity-40"
              />
              {uploading && (
                <span className="text-[10px] font-black text-lot-forest uppercase tracking-widest flex items-center gap-3 animate-pulse">
                  <div className="w-4 h-4 border-2 border-lot-earth/10 border-t-lot-amber rounded-full animate-spin" />
                  Ingesting Data...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Database Grid */}
      <div className="bg-white border border-lot-earth/20 overflow-hidden">
        {loading ? (
          <div className="p-32 text-center">
            <div className="inline-block w-8 h-8 border-2 border-lot-earth/10 border-t-lot-amber rounded-full animate-spin" />
          </div>
        ) : documents.length === 0 ? (
          <div className="p-32 text-center">
            <FolderOpen className="h-10 w-10 text-lot-earth/10 mx-auto mb-6" />
            <p className="text-xl font-serif text-lot-forest italic">No corresponding records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-lot-forest text-white text-left">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Document Identity
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Source Inquiry
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Ingestion Date
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">
                    Terminal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lot-earth/10">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-lot-paper transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-lot-forest/5 text-lot-forest border border-lot-forest/10 group-hover:bg-lot-amber group-hover:text-lot-forest transition-colors">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-serif font-black text-lot-forest text-base leading-none group-hover:italic transition-all">
                             {doc.doc_type}
                          </p>
                          <p className="text-[9px] font-bold text-lot-earth/40 uppercase tracking-[0.2em] mt-1">Technical Record</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-mono text-xs font-bold text-lot-amber tracking-tighter bg-lot-amber/5 px-2 py-1 border border-lot-amber/10">
                        {doc.inquiry_id.slice(0, 13)}...
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-lot-forest uppercase tracking-widest">
                        <Calendar className="h-3 w-3 opacity-40" />
                        {new Date(doc.uploaded_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center gap-3 justify-end">
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-lot-earth/20 text-[10px] font-black text-lot-forest uppercase tracking-widest hover:bg-lot-forest hover:text-white transition-all"
                          title="Download Entry"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </a>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="px-4 py-2 border border-lot-earth/20 text-[10px] font-black text-red-600 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
                          title="Purge Record"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
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
