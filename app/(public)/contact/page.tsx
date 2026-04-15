"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    inquiryType: "Quote Request",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", company: "", email: "", inquiryType: "Quote Request", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-lot-paper min-h-screen">
      {/* Hero */}
      <section className="bg-lot-forest text-white py-24 md:py-32">
        <div className="container px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-black mb-6 tracking-tighter leading-tight">
              Trade Desk
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
              Whether you are a roaster, importer, or distributor — our export team in Addis Ababa is ready to handle your inquiry, secure contracts, and arrange samples.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
               <h3 className="text-2xl font-serif font-bold text-lot-forest mb-8">Contact Information</h3>
               
               <div className="bg-white border border-lot-earth/20 p-6 flex items-start gap-4 hover:border-lot-amber transition-colors">
                  <Mail className="h-6 w-6 text-lot-amber mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-lot-earth uppercase tracking-widest mb-1">General & Trade</h4>
                    <a href="mailto:trade@lot251.coffee" className="text-lg font-bold text-lot-forest hover:text-lot-amber">
                      trade@lot251.coffee
                    </a>
                  </div>
               </div>
               
               <div className="bg-white border border-lot-earth/20 p-6 flex items-start gap-4 hover:border-lot-amber transition-colors">
                  <Phone className="h-6 w-6 text-lot-amber mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-lot-earth uppercase tracking-widest mb-1">Direct Line</h4>
                    <a href="tel:+251911234567" className="text-lg font-bold text-lot-forest hover:text-lot-amber">
                      +251 911 234 567
                    </a>
                  </div>
               </div>

               <div className="bg-white border border-lot-earth/20 p-6 flex items-start gap-4">
                  <Clock className="h-6 w-6 text-lot-amber mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-lot-earth uppercase tracking-widest mb-1">Business Hours</h4>
                    <p className="text-lot-forest font-semibold">Mon - Fri: 09:00 - 17:00</p>
                    <p className="text-xs text-lot-earth mt-1">EAT (UTC+3)</p>
                  </div>
               </div>

               <div className="bg-white border border-lot-earth/20 p-6 flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-lot-amber mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-lot-earth uppercase tracking-widest mb-1">HQ & Export Warehouse</h4>
                    <p className="text-lot-forest font-semibold leading-snug">Yesak Building, 3rd Floor<br/>Lideta District<br/>Addis Ababa, Ethiopia</p>
                  </div>
               </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-lot-earth/20 p-8 md:p-12 shadow-sm">
                <h2 className="text-3xl font-serif font-bold text-lot-forest mb-8">
                  Submit an Inquiry
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-16 bg-lot-forest/5 border border-lot-forest/10 border-dashed">
                    <div className="inline-flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-16 w-16 text-lot-amber" />
                    </div>
                    <p className="text-2xl font-serif font-bold text-lot-forest mb-2">
                      Inquiry Received
                    </p>
                    <p className="text-lot-earth font-light">
                      A member of our trade desk will respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-xs font-bold text-lot-forest uppercase tracking-widest">Contact Name</Label>
                        <Input
                          id="name" name="name" type="text"
                          value={formData.name} onChange={handleChange} required
                          placeholder="Your full name"
                          className="rounded-none border-lot-earth/30 h-12 focus-visible:ring-1 focus-visible:ring-lot-amber"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="company" className="text-xs font-bold text-lot-forest uppercase tracking-widest">Company / Roastery</Label>
                        <Input
                          id="company" name="company" type="text"
                          value={formData.company} onChange={handleChange} required
                          placeholder="Company name"
                          className="rounded-none border-lot-earth/30 h-12 focus-visible:ring-1 focus-visible:ring-lot-amber"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-xs font-bold text-lot-forest uppercase tracking-widest">Email Address</Label>
                        <Input
                          id="email" name="email" type="email"
                          value={formData.email} onChange={handleChange} required
                          placeholder="your@email.com"
                          className="rounded-none border-lot-earth/30 h-12 focus-visible:ring-1 focus-visible:ring-lot-amber"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="inquiryType" className="text-xs font-bold text-lot-forest uppercase tracking-widest">Inquiry Type</Label>
                        <select 
                          id="inquiryType" name="inquiryType"
                          value={formData.inquiryType} onChange={handleChange} required
                          className="flex h-12 w-full bg-transparent px-3 py-1 text-sm transition-colors border border-lot-earth/30 rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lot-amber"
                        >
                           <option>Request 200g Samples</option>
                           <option>FCL/LCL Quote Request</option>
                           <option>Logistics & Shipping</option>
                           <option>General Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-xs font-bold text-lot-forest uppercase tracking-widest">Message Details</Label>
                      <textarea
                        id="message" name="message"
                        value={formData.message} onChange={handleChange} required rows={6}
                        placeholder="Please include specific lot numbers, required volumes, or destination port details..."
                        className="w-full px-4 py-3 border border-lot-earth/30 rounded-none focus:outline-none focus:ring-1 focus:ring-lot-amber resize-none text-sm placeholder:text-lot-earth/50"
                      />
                    </div>

                    <Button
                      type="submit" disabled={isSubmitting} className="w-full md:w-auto px-10 py-6 bg-lot-forest hover:bg-lot-forest/90 text-white uppercase font-bold tracking-widest text-xs rounded-none transition-all"
                    >
                      {isSubmitting ? "Transmitting..." : (
                        <><Send className="mr-3 h-4 w-4" /> Submit Inquiry</>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
