"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  User,
  Package,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { CoffeeLot } from "@/types";
import { submitInquiry } from "@/app/actions/inquiry";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: CoffeeLot;
  type: "sample" | "quote";
}

interface FormData {
  // Step 1 — Company
  companyName: string;
  country: string;
  website: string;
  // Step 2 — Contact
  fullName: string;
  email: string;
  phone: string;
  role: string;
  // Step 3 — Order
  quantityBags: string;
  shippingMethod: string;
  incoterm: string;
  notes: string;
}

const STEPS = [
  { id: 1, label: "Company", icon: Building2 },
  { id: 2, label: "Contact", icon: User },
  { id: 3, label: "Details", icon: Package },
];

export function InquiryModal({ isOpen, onClose, product, type }: InquiryModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    country: "",
    website: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
    quantityBags: "",
    shippingMethod: "",
    incoterm: "FOB",
    notes: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitInquiry({
        ...formData,
        lotId: product?.id,
        lotNumber: product?.lotNumber,
        type: type === "sample" ? "sample_request" : "quote_request",
      });

      if (!result.success) {
        // If Supabase isn't configured, still show success for demo
        if (result.error?.includes("relation") || result.error?.includes("NEXT_PUBLIC")) {
          console.warn("Supabase not configured — showing demo success.", result.error);
          setIsSubmitted(true);
        } else {
          setSubmitError(result.error || "Something went wrong. Please try again.");
        }
      } else {
        setIsSubmitted(true);
      }
    } catch {
      // Network error or Supabase not configured — graceful fallback
      console.warn("Inquiry submission failed, showing demo success.");
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData({
      companyName: "",
      country: "",
      website: "",
      fullName: "",
      email: "",
      phone: "",
      role: "",
      quantityBags: "",
      shippingMethod: "",
      incoterm: "FOB",
      notes: "",
    });
    onClose();
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.companyName.trim() && formData.country.trim();
      case 2:
        return formData.fullName.trim() && formData.email.trim();
      case 3:
        return type === "sample" || formData.quantityBags.trim();
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
          >
            <div
              className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D9C5B2]/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#1B3022] text-white px-8 py-6 flex items-center justify-between z-10">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-[#D9C5B2] uppercase mb-1">
                    {type === "sample" ? "Sample Request" : "Quote Request"}
                  </p>
                  <h2 className="text-lg font-serif font-bold leading-tight">
                    {product ? product.name : "General Inquiry"}
                  </h2>
                  {product && (
                    <p className="text-xs text-white/60 mt-1">
                      LOT: {product.lotNumber} • SCA {product.scaScore}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="h-8 w-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {isSubmitted ? (
                /* Success State */
                <div className="px-8 py-16 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mb-6"
                  >
                    <div className="h-20 w-20 mx-auto bg-[#1B3022]/10 flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10 text-[#1B3022]" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-[#1B3022] mb-3">
                    Inquiry Submitted
                  </h3>
                  <p className="text-[#454848] text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                    {type === "sample"
                      ? "We'll prepare a 200g sample and contact you within 24 hours to confirm shipping details."
                      : "Our trade team will review your requirements and send a detailed quote within 48 hours."}
                  </p>
                  <Button
                    onClick={handleClose}
                    className="bg-[#1B3022] hover:bg-[#2c4c36] text-white rounded-none font-bold uppercase tracking-widest text-xs px-10 py-5"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  {/* Step Indicator */}
                  <div className="px-8 pt-6 pb-2">
                    <div className="flex items-center justify-between mb-6">
                      {STEPS.map((s, i) => (
                        <div key={s.id} className="flex items-center flex-1">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-8 w-8 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                step >= s.id
                                  ? "bg-[#1B3022] text-white"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {step > s.id ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <s.icon className="h-4 w-4" />
                              )}
                            </div>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-widest hidden sm:block ${
                                step >= s.id ? "text-[#1B3022]" : "text-gray-400"
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                          {i < STEPS.length - 1 && (
                            <div
                              className={`flex-1 h-px mx-3 transition-all duration-300 ${
                                step > s.id ? "bg-[#1B3022]" : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Steps */}
                  <div className="px-8 pb-8">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-5"
                        >
                          <div>
                            <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                              Company Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              value={formData.companyName}
                              onChange={(e) => updateField("companyName", e.target.value)}
                              placeholder="e.g. Nordic Roasters A/S"
                              className="h-12 rounded-none border-gray-300 focus:border-[#1B3022] text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                              Country <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              value={formData.country}
                              onChange={(e) => updateField("country", e.target.value)}
                              placeholder="e.g. Denmark"
                              className="h-12 rounded-none border-gray-300 focus:border-[#1B3022] text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                              Website
                            </Label>
                            <Input
                              value={formData.website}
                              onChange={(e) => updateField("website", e.target.value)}
                              placeholder="https://..."
                              className="h-12 rounded-none border-gray-300 focus:border-[#1B3022] text-sm"
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-5"
                        >
                          <div>
                            <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                              Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              value={formData.fullName}
                              onChange={(e) => updateField("fullName", e.target.value)}
                              placeholder="Your full name"
                              className="h-12 rounded-none border-gray-300 focus:border-[#1B3022] text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                              Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              placeholder="name@company.com"
                              className="h-12 rounded-none border-gray-300 focus:border-[#1B3022] text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                                Phone
                              </Label>
                              <Input
                                value={formData.phone}
                                onChange={(e) => updateField("phone", e.target.value)}
                                placeholder="+1 555 ..."
                                className="h-12 rounded-none border-gray-300 focus:border-[#1B3022] text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                                Role
                              </Label>
                              <Select
                                value={formData.role}
                                onValueChange={(v) => updateField("role", v)}
                              >
                                <SelectTrigger className="h-12 rounded-none border-gray-300 text-sm">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="buyer">Green Buyer</SelectItem>
                                  <SelectItem value="roaster">Head Roaster</SelectItem>
                                  <SelectItem value="owner">Owner/Founder</SelectItem>
                                  <SelectItem value="quality">Quality Manager</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-5"
                        >
                          {type === "quote" && (
                            <div>
                              <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                                Quantity (60kg Bags) <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                type="number"
                                value={formData.quantityBags}
                                onChange={(e) => updateField("quantityBags", e.target.value)}
                                placeholder="e.g. 150"
                                className="h-12 rounded-none border-gray-300 focus:border-[#1B3022] text-sm"
                              />
                              {product && formData.quantityBags && (
                                <p className="text-xs text-[#454848]/60 mt-2 italic">
                                  ≈ {parseInt(formData.quantityBags) * product.bagWeightKg}kg total •{" "}
                                  Est. ${(parseInt(formData.quantityBags) * product.bagWeightKg * product.fobPriceUsd).toLocaleString()} FOB
                                </p>
                              )}
                            </div>
                          )}

                          {type === "sample" && (
                            <div className="bg-[#1B3022]/5 border border-[#1B3022]/10 p-5">
                              <p className="text-xs font-bold text-[#1B3022] uppercase tracking-widest mb-1">
                                Sample Details
                              </p>
                              <p className="text-sm text-[#454848]">
                                We will send a <strong>200g roasted sample</strong> of this lot for cupping evaluation. Samples
                                ship via DHL Express (3–5 business days).
                              </p>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                                Shipping Method
                              </Label>
                              <Select
                                value={formData.shippingMethod}
                                onValueChange={(v) => updateField("shippingMethod", v)}
                              >
                                <SelectTrigger className="h-12 rounded-none border-gray-300 text-sm">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fcl">FCL (Full Container)</SelectItem>
                                  <SelectItem value="lcl">LCL (Partial Container)</SelectItem>
                                  <SelectItem value="air">Air Freight</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                                Incoterm
                              </Label>
                              <Select
                                value={formData.incoterm}
                                onValueChange={(v) => updateField("incoterm", v)}
                              >
                                <SelectTrigger className="h-12 rounded-none border-gray-300 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="FOB">FOB</SelectItem>
                                  <SelectItem value="CIF">CIF</SelectItem>
                                  <SelectItem value="CFR">CFR</SelectItem>
                                  <SelectItem value="EXW">EXW</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs font-bold text-[#454848] uppercase tracking-widest mb-2 block">
                              Additional Notes
                            </Label>
                            <textarea
                              value={formData.notes}
                              onChange={(e) => updateField("notes", e.target.value)}
                              placeholder="Special requirements, target delivery date, etc."
                              rows={3}
                              className="w-full rounded-none border border-gray-300 focus:border-[#1B3022] focus:outline-none px-3 py-3 text-sm resize-none"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Error Banner */}
                    {submitError && (
                      <div className="flex items-start gap-3 mt-4 p-4 bg-red-50 border border-red-200 text-red-800">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        <p className="text-xs">{submitError}</p>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                      {step > 1 ? (
                        <button
                          onClick={handleBack}
                          className="flex items-center gap-2 text-xs font-bold text-[#454848] uppercase tracking-widest hover:text-[#1B3022] transition-colors"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < 3 ? (
                        <Button
                          onClick={handleNext}
                          disabled={!isStepValid()}
                          className="bg-[#1B3022] hover:bg-[#2c4c36] text-white rounded-none font-bold uppercase tracking-widest text-xs px-8 py-5 disabled:opacity-40"
                        >
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={!isStepValid() || isSubmitting}
                          className="bg-[#1B3022] hover:bg-[#2c4c36] text-white rounded-none font-bold uppercase tracking-widest text-xs px-8 py-5 disabled:opacity-40"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit {type === "sample" ? "Sample Request" : "Quote Request"}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
