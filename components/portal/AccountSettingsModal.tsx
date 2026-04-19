"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Smartphone, X } from "lucide-react";

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountSettingsModal({ isOpen, onClose }: AccountSettingsModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1500);
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-lot-paper w-full max-w-[500px] pointer-events-auto relative shadow-2xl overflow-hidden"
            >
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-20"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="bg-lot-forest p-10 text-white relative">
                <h2 className="text-3xl font-serif italic mb-2">Partner Profile</h2>
                <p className="text-white/60 text-[10px] uppercase tracking-[0.4em] font-black">
                  Administrative Identity & Security 
                </p>
              </div>

              <form onSubmit={handleSave} className="p-10 space-y-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-lot-earth/60">Full Legal Name</Label>
                    <div className="relative">
                      <Input 
                        defaultValue={user.name} 
                        className="bg-white border-lot-earth/20 rounded-none h-14 pl-12 focus:border-lot-amber focus:ring-0 transition-all font-bold" 
                      />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-lot-earth/30" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-lot-earth/60">Business Email</Label>
                    <div className="relative">
                      <Input 
                        defaultValue={user.email} 
                        className="bg-white border-lot-earth/10 rounded-none h-14 pl-12 focus:border-lot-amber focus:ring-0 transition-all font-bold" 
                        disabled
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-lot-earth/30" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-lot-earth/60">Role</Label>
                      <div className="relative">
                        <Input 
                          defaultValue={user.role === "admin" ? "Systems Administrator" : "Trade Partner"} 
                          className="bg-white border-lot-earth/10 rounded-none h-12 pl-10 focus:border-lot-amber focus:ring-0 transition-all font-bold opacity-60" 
                          disabled
                        />
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lot-earth/30" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-lot-earth/60">Phone</Label>
                      <div className="relative">
                        <Input 
                          placeholder="+251 ..." 
                          className="bg-white border-lot-earth/20 rounded-none h-12 pl-10 focus:border-lot-amber focus:ring-0 transition-all font-bold" 
                        />
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lot-earth/30" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-lot-earth/10 flex justify-end gap-6 items-center">
                  <button 
                    type="button" 
                    onClick={onClose}
                    className="uppercase text-[10px] font-black tracking-widest text-lot-earth/40 hover:text-lot-forest transition-colors"
                  >
                    Cancel
                  </button>
                  <Button 
                    type="submit" 
                    className="bg-lot-forest hover:bg-lot-forest/90 text-white rounded-none px-10 font-black uppercase text-[10px] tracking-[0.3em] h-14 shadow-xl"
                    disabled={loading}
                  >
                    {loading ? "Updating Archive..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
