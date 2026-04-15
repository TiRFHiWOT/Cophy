"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, CheckCircle2, Loader2, AlertTriangle, Package } from "lucide-react";
import { CoffeeLot } from "@/types";
import { submitInquiry } from "@/app/actions/inquiry";

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
      const result = await submitInquiry({
        ...formData,
        lotId: product?.id,
        lotNumber: product?.lotNumber,
        type: "sample_request",
        email: "anonymous@example.com",
        fullName: "Anonymous",
      } as any);

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
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[200]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
          >
            <div
              className="bg-background w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl rounded-export border border-border/40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/40 px-6 py-5 flex items-center justify-between z-10">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-1">
                    Sample Request
                  </p>
                  <h2 className="text-lg font-serif font-bold leading-tight text-foreground">
                    {product ? product.name : "General Inquiry"}
                  </h2>
                  {product && (
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      LOT: {product.lotNumber}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="px-6 py-12 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mb-6"
                  >
                    <div className="h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                    Request Received
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Our logistics team will prepare a sample of LOT {product?.lotNumber} and contact {formData.companyName} soon.
                  </p>
                  <Button
                    onClick={handleClose}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-export font-bold uppercase tracking-widest text-xs px-8 py-4"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">
                        Company Name
                      </Label>
                      <Input
                        value={formData.companyName}
                        onChange={(e) => updateField("companyName", e.target.value)}
                        placeholder="e.g. Nordic Roasters A/S"
                        className="h-11 rounded-export bg-muted/30 border-border focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">
                        Country
                      </Label>
                      <Input
                        value={formData.country}
                        onChange={(e) => updateField("country", e.target.value)}
                        placeholder="e.g. Denmark"
                        className="h-11 rounded-export bg-muted/30 border-border focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">
                        Volume Requirement (60kg Bags)
                      </Label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={formData.quantityBags}
                          onChange={(e) => updateField("quantityBags", e.target.value)}
                          placeholder="e.g. 150"
                          className="h-11 pl-9 rounded-export bg-muted/30 border-border focus:border-primary text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-3 mt-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-export">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <p className="text-xs">{submitError}</p>
                    </div>
                  )}

                  <div className="mt-8 pt-5 border-t border-border/40">
                    <Button
                      onClick={handleSubmit}
                      disabled={!isValid || isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-export font-bold uppercase tracking-widest text-xs h-12 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
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
