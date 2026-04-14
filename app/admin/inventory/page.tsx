"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Plus,
  Save,
  X,
  Package,
  Search,
  AlertTriangle,
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

      if (!error && data) {
        setLots(data);
      }
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
    } else {
      alert("Failed to add lot: " + error.message);
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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1B3022]">
            Inventory
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage coffee lots and stock levels
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#2c4c36] transition-colors"
        >
          {showAddForm ? (
            <>
              <X className="h-4 w-4" /> Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add Lot
            </>
          )}
        </button>
      </div>

      {/* Add Lot Form */}
      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1B3022] mb-6">New Coffee Lot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                Lot Number *
              </label>
              <input
                value={newLot.lot_number}
                onChange={(e) => setNewLot({ ...newLot, lot_number: e.target.value })}
                placeholder="ETH-2026-YIRG-001"
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:border-[#1B3022] focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                Name *
              </label>
              <input
                value={newLot.name}
                onChange={(e) => setNewLot({ ...newLot, name: e.target.value })}
                placeholder="Yirgacheffe Grade 1 Washed"
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:border-[#1B3022] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                Region
              </label>
              <input
                value={newLot.region}
                onChange={(e) => setNewLot({ ...newLot, region: e.target.value })}
                placeholder="Ethiopia"
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:border-[#1B3022] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                Washing Station
              </label>
              <input
                value={newLot.washing_station}
                onChange={(e) => setNewLot({ ...newLot, washing_station: e.target.value })}
                placeholder="Chelchele Station"
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:border-[#1B3022] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                Process Method
              </label>
              <select
                value={newLot.process_method}
                onChange={(e) => setNewLot({ ...newLot, process_method: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:border-[#1B3022] focus:outline-none bg-white"
              >
                <option>Washed</option>
                <option>Natural</option>
                <option>Honey</option>
                <option>Anaerobic</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                SCA Score
              </label>
              <input
                type="number"
                step="0.5"
                value={newLot.sca_score || ""}
                onChange={(e) => setNewLot({ ...newLot, sca_score: parseFloat(e.target.value) || 0 })}
                placeholder="87.5"
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:border-[#1B3022] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                Moisture %
              </label>
              <input
                type="number"
                step="0.1"
                value={newLot.moisture_content || ""}
                onChange={(e) => setNewLot({ ...newLot, moisture_content: parseFloat(e.target.value) || 0 })}
                placeholder="10.5"
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:border-[#1B3022] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                Bags Available
              </label>
              <input
                type="number"
                value={newLot.bags_available || ""}
                onChange={(e) => setNewLot({ ...newLot, bags_available: parseInt(e.target.value) || 0 })}
                placeholder="150"
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:border-[#1B3022] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                FOB Price (USD/kg)
              </label>
              <input
                type="number"
                step="0.01"
                value={newLot.fob_price_usd || ""}
                onChange={(e) => setNewLot({ ...newLot, fob_price_usd: parseFloat(e.target.value) || 0 })}
                placeholder="5.80"
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:border-[#1B3022] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                Altitude
              </label>
              <input
                value={newLot.altitude_range}
                onChange={(e) => setNewLot({ ...newLot, altitude_range: e.target.value })}
                placeholder="1900 - 2200m"
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:border-[#1B3022] focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={addLot}
            disabled={saving || !newLot.lot_number || !newLot.name}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#2c4c36] disabled:opacity-40 transition-colors"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Lot"}
          </button>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search lots..."
          className="w-full pl-10 pr-4 h-10 border border-gray-200 rounded-lg text-sm focus:border-[#1B3022] focus:outline-none"
        />
      </div>

      {/* Lots Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-gray-400">
            <div className="inline-block w-8 h-8 border-2 border-gray-200 border-t-[#1B3022] rounded-full animate-spin" />
            <p className="mt-4 text-sm">Loading inventory...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No lots found</p>
            <p className="text-xs text-gray-400 mt-1">
              Add your first lot or run the SQL migration.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Lot #
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Name
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Region
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">
                    SCA
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">
                    Bags
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">
                    FOB/kg
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">
                    Published
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((lot) => (
                  <tr key={lot.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-medium text-[#1B3022]">
                        {lot.lot_number}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{lot.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {lot.washing_station} • {lot.process_method}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {lot.region}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-bold">{lot.sca_score}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {editingBags[lot.id] !== undefined ? (
                        <div className="flex items-center gap-1 justify-center">
                          <input
                            type="number"
                            value={editingBags[lot.id]}
                            onChange={(e) =>
                              setEditingBags({
                                ...editingBags,
                                [lot.id]: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-16 h-7 px-2 border border-gray-300 rounded text-xs text-center focus:border-[#1B3022] focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => updateBags(lot.id, editingBags[lot.id])}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            <Save className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingBags((prev) => {
                                const next = { ...prev };
                                delete next[lot.id];
                                return next;
                              });
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-3.5 w-3.5" />
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
                          className="text-xs font-bold hover:text-[#1B3022] transition-colors cursor-pointer"
                          title="Click to edit"
                        >
                          {lot.bags_available}
                          {lot.bags_available <= 5 && lot.bags_available > 0 && (
                            <AlertTriangle className="h-3 w-3 text-amber-500 inline ml-1" />
                          )}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-xs font-medium">
                      ${lot.fob_price_usd.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => togglePublished(lot.id, lot.is_published)}
                        className={`h-5 w-9 rounded-full transition-colors relative ${
                          lot.is_published ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full transition-transform shadow-sm ${
                            lot.is_published ? "translate-x-4" : ""
                          }`}
                        />
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
