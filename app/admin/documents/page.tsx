"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import {
  Upload,
  FileText,
  Trash2,
  Download,
  Search,
  FolderOpen,
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

      if (!error && data) {
        setDocuments(data);
      }
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
      // Upload to Supabase Storage
      const filePath = `${inquiryId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("trade-documents")
        .upload(filePath, file);

      if (uploadError) {
        alert("Upload failed: " + uploadError.message);
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("trade-documents")
        .getPublicUrl(filePath);

      // Record in DB
      const { error: dbError } = await supabase
        .from("shipment_documents")
        .insert({
          inquiry_id: inquiryId,
          doc_type: selectedDocType,
          file_url: urlData.publicUrl,
        });

      if (dbError) {
        alert("Failed to save record: " + dbError.message);
      } else {
        fetchDocuments();
        setInquiryId("");
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#1B3022]">
          Documents
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload and manage trade documents (Phytosanitary, COO, Bill of Lading)
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-sm font-bold text-[#1B3022] uppercase tracking-widest mb-4">
          Upload Document
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
              Inquiry ID
            </label>
            <input
              value={inquiryId}
              onChange={(e) => setInquiryId(e.target.value)}
              placeholder="Paste inquiry UUID"
              className="w-full h-10 px-3 border border-gray-200 rounded text-xs focus:border-[#1B3022] focus:outline-none font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
              Document Type
            </label>
            <select
              value={selectedDocType}
              onChange={(e) => setSelectedDocType(e.target.value)}
              className="w-full h-10 px-3 border border-gray-200 rounded text-xs focus:border-[#1B3022] focus:outline-none bg-white"
            >
              {DOC_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
              File (PDF, JPG, PNG — max 10MB)
            </label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleUpload}
                disabled={uploading || !inquiryId.trim()}
                className="text-xs file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-[#1B3022] file:text-white hover:file:bg-[#2c4c36] file:cursor-pointer disabled:opacity-40"
              />
              {uploading && (
                <span className="text-xs text-gray-500 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-200 border-t-[#1B3022] rounded-full animate-spin" />
                  Uploading...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-gray-400">
            <div className="inline-block w-8 h-8 border-2 border-gray-200 border-t-[#1B3022] rounded-full animate-spin" />
            <p className="mt-4 text-sm">Loading documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-16 text-center">
            <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No documents uploaded</p>
            <p className="text-xs text-gray-400 mt-1">
              Upload trade documents for your shipments above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Type
                  </th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Inquiry
                  </th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#1B3022]" />
                        <span className="font-medium text-sm">{doc.doc_type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-gray-500">
                        {doc.inquiry_id.slice(0, 8)}...
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(doc.uploaded_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-[#1B3022] transition-colors"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
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
