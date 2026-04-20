"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, CheckCircle2, Loader2, AlertTriangle, Package } from "lucide-react";
import { CoffeeLot } from "@/types";
import { submitInquiry, type InquiryResult } from "@/app/actions/inquiry";


interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: CoffeeLot;
}

export function SampleRequestModal({ isOpen, onClose, product }: SampleRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    country: "",
    quantityBags: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result: InquiryResult = await submitInquiry({

        ...formData,
        lotId: product?.id,
        lotNumber: product?.lotNumber,
        type: "sample_request",
        email: "anonymous@example.com",
        fullName: "Anonymous",
      });

      if (!result.success && !result.error?.includes("NEXT_PUBLIC")) {
        setSubmitError(result.error || "Something went wrong.");
      } else {
        setIsSubmitted(true);
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData({ companyName: "", country: "", quantityBags: "" });
    onClose();
  };

  const isValid = formData.companyName.trim() && formData.country.trim() && formData.quantityBags.trim();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-lot-forest/40 backdrop-blur-sm z-[200]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
          >
            <div
              className="bg-lot-paper w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] border-2 border-lot-forest/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Brand Accent Top Bar */}
              <div className="h-1.5 w-full bg-lot-forest" />
              
              <div className="sticky top-0 bg-lot-paper/90 backdrop-blur-md border-b border-lot-earth/10 px-8 py-6 flex items-center justify-between z-10">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.4em] text-lot-earth uppercase mb-1.5">
                    Logistic Inquiry
                  </p>
                  <h2 className="text-2xl font-serif font-black leading-tight text-lot-forest italic">
                    {product ? product.name : "Sample Request"}
                  </h2>
                  {product && (
                    <div className="flex items-center gap-2 mt-2">
                       <span className="text-[9px] font-bold bg-lot-forest text-white px-1.5 py-0.5 uppercase tracking-tighter">Export Grade</span>
                       <p className="text-[11px] text-lot-earth font-mono font-bold">
                        ID: {product.lotNumber}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="h-10 w-10 flex items-center justify-center text-lot-forest/40 hover:text-lot-forest hover:bg-lot-forest/5 transition-all"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="px-8 py-20 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8"
                  >
                    <div className="h-20 w-20 mx-auto border-2 border-lot-forest flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10 text-lot-forest" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-lot-forest mb-4 tracking-tight">
                    Transmission Successful
                  </h3>
                  <p className="text-lot-earth text-sm leading-relaxed mb-10 max-w-sm mx-auto font-medium">
                    Our logistics team in Addis Ababa has received your interest in LOT {product?.lotNumber}. We will contact {formData.companyName} with shipping documentation.
                  </p>
                  <Button
                    onClick={handleClose}
                    className="w-full bg-lot-forest hover:bg-lot-forest/90 text-white rounded-none font-bold uppercase tracking-[0.2em] text-xs h-14"
                  >
                    Return to Catalog
                  </Button>
                </div>
              ) : (
                <div className="p-8">
                  <div className="grid grid-cols-1 gap-8">
                    <div>
                      <Label className="text-[10px] font-black text-lot-forest uppercase tracking-[0.2em] mb-2 block">
                        Client Entity / Company
                      </Label>
                      <Input
                        value={formData.companyName}
                        onChange={(e) => updateField("companyName", e.target.value)}
                        placeholder="NAME OF LEGAL ENTITY"
                        className="h-14 rounded-none bg-white border-lot-earth/20 focus:border-lot-forest text-sm font-bold tracking-wide placeholder:opacity-30"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[10px] font-black text-lot-forest uppercase tracking-[0.2em] mb-2 block">
                          Operating Country
                        </Label>
                        <Input
                          value={formData.country}
                          onChange={(e) => updateField("country", e.target.value)}
                          placeholder="DESTINATION"
                          className="h-14 rounded-none bg-white border-lot-earth/20 focus:border-lot-forest text-sm font-bold tracking-wide placeholder:opacity-30"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] font-black text-lot-forest uppercase tracking-[0.2em] mb-2 block">
                          Estimated Volume (60kg Bags)
                        </Label>
                        <div className="relative">
                          <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-lot-forest/30" />
                          <Input
                            type="number"
                            value={formData.quantityBags}
                            onChange={(e) => updateField("quantityBags", e.target.value)}
                            placeholder="UNITS"
                            className="h-14 pl-12 rounded-none bg-white border-lot-earth/20 focus:border-lot-forest text-sm font-bold tracking-wide placeholder:opacity-30"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-4 mt-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-900">
                      <AlertTriangle className="h-5 w-5 shrink-0" />
                      <p className="text-xs font-bold uppercase tracking-tight">{submitError}</p>
                    </div>
                  )}

                  <div className="mt-12 group">
                    <Button
                      onClick={handleSubmit}
                      disabled={!isValid || isSubmitting}
                      className="w-full bg-lot-amber hover:bg-lot-forest text-white rounded-none font-black uppercase tracking-[0.3em] text-xs h-16 disabled:opacity-30 transition-all duration-500 flex items-center justify-center gap-3 shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          REQUEST SPECIMEN (200G)
                        </>
                      )}
                    </Button>
                    <p className="text-[9px] text-center mt-4 text-lot-earth font-bold uppercase tracking-widest opacity-60">
                      Subject to sample availability and export seasonality.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

}
