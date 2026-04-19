"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Plus,
  Save,
  X,
  Package,
  Search,
  AlertTriangle,
  Layers,
} from "lucide-react";

interface CoffeeLotRow {
  id: string;
  lot_number: string;
  name: string;
  region: string;
  washing_station: string;
  altitude_range: string;
  process_method: string;
  sca_score: number;
  moisture_content: number;
  harvest_year: number;
  bags_available: number;
  bag_weight_kg: number;
  fob_price_usd: number;
  is_published: boolean;
  created_at: string;
}

const EMPTY_LOT: Omit<CoffeeLotRow, "id" | "created_at"> = {
  lot_number: "",
  name: "",
  region: "",
  washing_station: "",
  altitude_range: "",
  process_method: "Washed",
  sca_score: 0,
  moisture_content: 0,
  harvest_year: new Date().getFullYear(),
  bags_available: 0,
  bag_weight_kg: 60,
  fob_price_usd: 0,
  is_published: false,
};

export default function InventoryPage() {
  const [lots, setLots] = useState<CoffeeLotRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLot, setNewLot] = useState(EMPTY_LOT);
  const [saving, setSaving] = useState(false);
  const [editingBags, setEditingBags] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchLots();
  }, []);

  async function fetchLots() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("coffee_lots")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setLots(data);
    } catch (e) {
      console.warn("Failed to fetch lots:", e);
    } finally {
      setLoading(false);
    }
  }

  async function addLot() {
    setSaving(true);
    const { error } = await supabase.from("coffee_lots").insert(newLot);
    if (!error) {
      setNewLot(EMPTY_LOT);
      setShowAddForm(false);
      fetchLots();
    }
    setSaving(false);
  }

  async function updateBags(id: string, bags: number) {
    const { error } = await supabase
      .from("coffee_lots")
      .update({ bags_available: bags })
      .eq("id", id);

    if (!error) {
      setLots((prev) =>
        prev.map((lot) =>
          lot.id === id ? { ...lot, bags_available: bags } : lot
        )
      );
      setEditingBags((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  }

  async function togglePublished(id: string, current: boolean) {
    const { error } = await supabase
      .from("coffee_lots")
      .update({ is_published: !current })
      .eq("id", id);

    if (!error) {
      setLots((prev) =>
        prev.map((lot) =>
          lot.id === id ? { ...lot, is_published: !current } : lot
        )
      );
    }
  }

  const filtered = lots.filter((lot) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      lot.name.toLowerCase().includes(q) ||
      lot.lot_number.toLowerCase().includes(q) ||
      lot.region.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-lot-amber" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-lot-earth uppercase">
              Operational Database
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-lot-forest tracking-tighter italic">
            Lot Inventory
          </h1>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`flex items-center gap-3 px-8 py-4 transition-all uppercase tracking-[0.2em] text-[10px] font-black border ${
            showAddForm 
              ? "bg-white text-lot-forest border-lot-forest shadow-sm" 
              : "bg-lot-forest text-white border-lot-forest hover:bg-lot-forest/90"
          }`}
        >
          {showAddForm ? (
            <>
              <X className="h-4 w-4" /> Cancel Entry
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Register New Lot
            </>
          )}
        </button>
      </div>

      {/* Add Lot Form */}
      {showAddForm && (
        <div className="bg-white border-2 border-lot-forest p-10 mb-12 shadow-xl">
          <h2 className="text-2xl font-serif font-black text-lot-forest tracking-tight italic mb-10 border-b border-lot-earth/10 pb-6">
            Log New Technical Lot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 mb-12">
            <div className="md:col-span-1">
              <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
                Lot Identifier *
              </label>
              <input
                value={newLot.lot_number}
                onChange={(e) => setNewLot({ ...newLot, lot_number: e.target.value })}
                placeholder="ETH-2026-XXXX-000"
                className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper font-mono text-xs focus:border-lot-amber focus:outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
                Commercial Designation *
              </label>
              <input
                value={newLot.name}
                onChange={(e) => setNewLot({ ...newLot, name: e.target.value })}
                placeholder="e.g. Sidama Grade 1 Natural"
                className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper font-bold text-xs uppercase tracking-widest focus:border-lot-amber focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
                Origin Region
              </label>
              <input
                value={newLot.region}
                onChange={(e) => setNewLot({ ...newLot, region: e.target.value })}
                placeholder="Ethiopia"
                className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper text-xs font-bold uppercase tracking-widest focus:border-lot-amber focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
                Washing Station / Co-Op
              </label>
              <input
                value={newLot.washing_station}
                onChange={(e) => setNewLot({ ...newLot, washing_station: e.target.value })}
                placeholder="Technical name"
                className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper text-xs font-bold uppercase tracking-widest focus:border-lot-amber focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
                Process Method
              </label>
              <select
                value={newLot.process_method}
                onChange={(e) => setNewLot({ ...newLot, process_method: e.target.value })}
                className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper text-xs font-bold uppercase tracking-widest focus:border-lot-amber focus:outline-none cursor-pointer"
              >
                <option>Washed</option>
                <option>Natural</option>
                <option>Honey</option>
                <option>Anaerobic</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
                SCA Technical Score
              </label>
              <input
                type="number"
                step="0.5"
                value={newLot.sca_score || ""}
                onChange={(e) => setNewLot({ ...newLot, sca_score: parseFloat(e.target.value) || 0 })}
                placeholder="85.0"
                className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper font-mono font-bold text-xs focus:border-lot-amber focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
                Relative Moisture %
              </label>
              <input
                type="number"
                step="0.1"
                value={newLot.moisture_content || ""}
                onChange={(e) => setNewLot({ ...newLot, moisture_content: parseFloat(e.target.value) || 0 })}
                placeholder="11.0"
                className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper font-mono font-bold text-xs focus:border-lot-amber focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
                Inventory Count (Bags)
              </label>
              <input
                type="number"
                value={newLot.bags_available || ""}
                onChange={(e) => setNewLot({ ...newLot, bags_available: parseInt(e.target.value) || 0 })}
                placeholder="0"
                className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper font-mono font-bold text-xs focus:border-lot-amber focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
                FOB Unit Price (USD/kg)
              </label>
              <input
                type="number"
                step="0.01"
                value={newLot.fob_price_usd || ""}
                onChange={(e) => setNewLot({ ...newLot, fob_price_usd: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper font-mono font-bold text-xs focus:border-lot-amber focus:outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-black text-lot-amber uppercase tracking-[0.3em] block mb-3">
                Production Altitude Range
              </label>
              <input
                value={newLot.altitude_range}
                onChange={(e) => setNewLot({ ...newLot, altitude_range: e.target.value })}
                placeholder="e.g. 1950 - 2200m"
                className="w-full h-12 px-4 border border-lot-earth/20 bg-lot-paper text-xs font-bold uppercase tracking-widest focus:border-lot-amber focus:outline-none transition-colors"
              />
            </div>
          </div>
          <button
            onClick={addLot}
            disabled={saving || !newLot.lot_number || !newLot.name}
            className="flex items-center gap-3 px-10 py-5 bg-lot-forest text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-lot-forest/90 disabled:opacity-40 transition-all border border-lot-forest"
          >
            <Save className="h-4 w-4" />
            {saving ? "Processing..." : "Commit Lot to System"}
          </button>
        </div>
      )}

      {/* Database Toolbar */}
      <div className="flex flex-wrap items-stretch gap-0 mb-8 border border-lot-earth/20 bg-white">
        <div className="flex-1 min-w-[300px] relative border-r border-lot-earth/20">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-lot-earth opacity-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the archive..."
            className="w-full pl-14 pr-6 h-14 text-[10px] font-bold uppercase tracking-[0.2em] placeholder:text-lot-earth/40 focus:bg-lot-paper focus:outline-none border-none transition-colors"
          />
        </div>
        <div className="px-10 flex items-center bg-lot-paper/30 border-r border-lot-earth/20">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-lot-forest">
            {filtered.length} Active Records
          </span>
        </div>
      </div>

      {/* Archive Grid */}
      <div className="bg-white border border-lot-earth/20">
        {loading ? (
          <div className="p-32 text-center">
            <div className="inline-block w-8 h-8 border-2 border-lot-earth/10 border-t-lot-amber rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-32 text-center">
            <Package className="h-10 w-10 text-lot-earth/10 mx-auto mb-6" />
            <p className="text-xl font-serif text-lot-forest italic">No corresponding inventory found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-lot-forest text-white text-left">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Identifier
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Designation
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Origin
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-center">
                    SCA
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-center">
                    Inventory
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">
                    FOB/kg
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lot-earth/10">
                {filtered.map((lot) => (
                  <tr key={lot.id} className="hover:bg-lot-paper transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-mono text-xs font-bold text-lot-amber tracking-tighter">
                        {lot.lot_number}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-serif font-black text-lot-forest text-base leading-none mb-1 group-hover:italic transition-all">
                        {lot.name}
                      </p>
                      <p className="text-[10px] font-bold text-lot-earth/40 uppercase tracking-widest whitespace-nowrap">
                        {lot.washing_station} / {lot.process_method}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-bold text-lot-forest uppercase tracking-widest opacity-60">
                      {lot.region}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-sm font-serif font-black text-lot-forest italic bg-lot-amber/10 px-2 py-1 border border-lot-amber/20">
                        {lot.sca_score.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      {editingBags[lot.id] !== undefined ? (
                        <div className="flex items-center gap-2 justify-center">
                          <input
                            type="number"
                            value={editingBags[lot.id]}
                            onChange={(e) =>
                              setEditingBags({
                                ...editingBags,
                                [lot.id]: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-16 h-8 border border-lot-amber bg-lot-paper text-center font-mono font-bold text-xs focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => updateBags(lot.id, editingBags[lot.id])}
                            className="text-lot-forest hover:text-lot-amber transition-colors"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            setEditingBags({
                              ...editingBags,
                              [lot.id]: lot.bags_available,
                            })
                          }
                          className="text-sm font-mono font-black text-lot-forest hover:text-lot-amber transition-all cursor-pointer border-b border-dashed border-lot-forest/20"
                          title="Technical stock adjustment"
                        >
                          {lot.bags_available}
                          {lot.bags_available <= 5 && lot.bags_available > 0 && (
                            <AlertTriangle className="h-3 w-3 text-red-600 inline ml-2" />
                          )}
                        </button>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right font-mono font-bold text-lot-forest">
                      ${lot.fob_price_usd.toFixed(2)}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button
                        onClick={() => togglePublished(lot.id, lot.is_published)}
                        className={`h-6 w-12 transition-all relative border border-lot-earth/20 ${
                          lot.is_published ? "bg-lot-forest shadow-inner" : "bg-lot-paper"
                        }`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                          <Layers className="h-4 w-4 text-white" />
                        </div>
                        <span
                          className={`absolute top-0.5 left-0.5 h-4.5 w-4.5 transition-transform border border-lot-earth/10 flex items-center justify-center text-[7px] font-black ${
                            lot.is_published ? "translate-x-6 bg-lot-amber text-lot-forest" : "bg-white text-lot-earth shadow-sm"
                          }`}
                        >
                          {lot.is_published ? "ON" : "OFF"}
                        </span>
                      </button>
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
