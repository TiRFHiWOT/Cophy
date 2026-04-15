import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Globe, 
  Scale, 
  ShieldCheck, 
  Search, 
  FlaskConical, 
  FileSignature, 
  Ship, 
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "Export Logistics & How To Buy | Lot 251",
  description: "Learn how to procure premium Ethiopian specialty green coffee directly from our export terminal in Addis Ababa.",
};

export default function OrderingInfoPage() {
  const processSteps = [
    {
      num: "01",
      icon: Search,
      title: "Browse & Select",
      desc: "Review our current offerings on the catalog. All lots listed are fully milled, resting in our Addis Ababa export warehouse, and ready for immediate contracting."
    },
    {
      num: "02",
      icon: FlaskConical,
      title: "Request Samples",
      desc: "Order 200g evaluation samples. Verified commercial roasters and importers receive complimentary samples covering all requested lots. Shipped via DHL Express globally."
    },
    {
      num: "03",
      icon: Scale,
      title: "Cup & Approve",
      desc: "Evaluate the green and roasted samples with your Q-grader team. We guarantee that the delivered export bags will identically match the flavor profile and physical specs of the sample."
    },
    {
      num: "04",
      icon: FileSignature,
      title: "Contract & Pay",
      desc: "Sign a standard ICC commercial contract. We offer fixed pricing or differential-based contracting depending on volume. Payment terms typically include Wire Transfer (T/T) or Letter of Credit (L/C)."
    },
    {
      num: "05",
      icon: Ship,
      title: "Ship & Track",
      desc: "Orders are shipped FOB Djibouti or FCA Addis Ababa. Complete documentation is provided promptly to ensure smooth customs clearance at your destination port."
    }
  ];

  const documents = [
    "ICO Certificate of Origin",
    "Phytosanitary Certificate",
    "Bill of Lading (OBL / Seaway)",
    "Commercial Invoice & Packing List",
    "Weight / Stuffing Note",
    "LOT 251 Quality Certificate"
  ];

  return (
    <div className="bg-lot-paper min-h-screen">
      {/* Hero */}
      <section className="bg-lot-forest text-white py-24 md:py-32">
        <div className="container px-6">
          <div className="max-w-4xl">
             <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-lot-amber" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-lot-amber uppercase">
                Trade Logistics
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black mb-6 tracking-tighter leading-tight">
              Export Procurement
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed">
              Procuring Ethiopian coffee shouldn't be opaque. We manage the entire supply chain from washing station to FOB, offering global roasters a seamless, reliable export experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 hidden lg:grid">
            {/* Sidebar Sticky Nav / Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-12">
                <div>
                  <h3 className="text-sm font-bold text-lot-forest uppercase tracking-widest mb-6 border-b border-lot-forest pb-4">
                    Minimum Order Quantities
                  </h3>
                  <div className="space-y-4">
                    <div>
                       <span className="text-2xl font-mono font-bold text-lot-forest">10 Bags</span>
                       <p className="text-sm text-lot-earth font-light mt-1">LCL (Less than Container Load). Shipped via consolidated sea freight or air freight.</p>
                    </div>
                    <div>
                       <span className="text-2xl font-mono font-bold text-lot-forest">320 Bags</span>
                       <p className="text-sm text-lot-earth font-light mt-1">1x20ft FCL (Full Container Load). Direct sailing from Port of Djibouti.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-lot-forest uppercase tracking-widest mb-6 border-b border-lot-forest pb-4">
                    Incoterms
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-lot-amber shrink-0" />
                      <div>
                        <span className="font-bold text-lot-forest text-sm">FOB Djibouti</span>
                        <p className="text-xs text-lot-earth font-light mt-0.5">Free on Board. We handle all logistics up to loading the vessel in Djibouti.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-lot-amber shrink-0" />
                      <div>
                        <span className="font-bold text-lot-forest text-sm">FCA Addis Ababa</span>
                        <p className="text-xs text-lot-earth font-light mt-0.5">Free Carrier. For roasters with their own forwarding agents in Ethiopia.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeline & Flow */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-serif font-black text-lot-forest mb-16 tracking-tight">
                The Procurement Flow
              </h2>
              
              <div className="relative border-l border-lot-earth/30 ml-6 md:ml-8 space-y-16">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="relative pl-12 md:pl-16">
                     {/* Node */}
                     <div className="absolute -left-[24px] top-0 bg-lot-paper border-4 border-lot-paper">
                       <div className="h-10 w-10 bg-lot-forest text-white rounded-none flex items-center justify-center font-mono text-sm font-bold shadow-lg">
                         {step.num}
                       </div>
                     </div>
                     
                     {/* Content */}
                     <div className="pt-1">
                        <div className="flex items-center gap-3 mb-4">
                          <step.icon className="h-6 w-6 text-lot-amber" />
                          <h3 className="text-xl md:text-2xl font-bold text-lot-forest">{step.title}</h3>
                        </div>
                        <p className="text-lot-earth text-lg font-light leading-relaxed">
                          {step.desc}
                        </p>
                     </div>
                  </div>
                ))}
              </div>

              <div className="mt-24 pt-16 border-t border-lot-earth/20">
                <div className="bg-white border border-lot-earth/20 p-8 md:p-12 shadow-sm">
                  <div className="flex items-start gap-6">
                    <ShieldCheck className="h-10 w-10 text-lot-amber shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-lot-forest mb-4">Export Documentation</h3>
                      <p className="text-lot-earth mb-8 font-light">
                        Every container leaving Djibouti is accompanied by a rigorous set of documents to ensure smooth import clearance. We transmit digital drafts prior to vessel departure and courier physical originals via DHL.
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {documents.map((doc, i) => (
                           <li key={i} className="flex items-center gap-3 text-sm font-semibold text-lot-forest">
                             <FileText className="h-4 w-4 text-lot-earth" />
                             {doc}
                           </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 bg-lot-forest/5 border border-lot-forest/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div>
                    <h3 className="text-xl font-bold text-lot-forest mb-2">Ready to initiate an order?</h3>
                    <p className="text-lot-earth font-light text-sm">Reach out to our trade desk to request samples or contracts.</p>
                 </div>
                 <Link href="/contact" className="w-full md:w-auto">
                    <Button className="w-full bg-lot-forest text-white hover:bg-lot-forest/90 font-bold uppercase tracking-widest rounded-none h-14 px-8">
                      Contact Trade Desk
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                 </Link>
              </div>

            </div>
          </div>
          
          {/* Mobile version (Stacked) */}
          <div className="lg:hidden space-y-20">
              <div>
                <h2 className="text-3xl font-serif font-black text-lot-forest mb-12 tracking-tight">
                  The Procurement Flow
                </h2>
                <div className="relative border-l border-lot-earth/30 ml-4 space-y-12">
                  {processSteps.map((step, idx) => (
                    <div key={idx} className="relative pl-10">
                       <div className="absolute -left-[20px] top-0 bg-lot-paper border-4 border-lot-paper">
                         <div className="h-8 w-8 bg-lot-forest text-white rounded-none flex items-center justify-center font-mono text-xs font-bold shadow-lg">
                           {step.num}
                         </div>
                       </div>
                       <div className="pt-0">
                          <div className="flex items-center gap-3 mb-3">
                            <step.icon className="h-5 w-5 text-lot-amber" />
                            <h3 className="text-xl font-bold text-lot-forest">{step.title}</h3>
                          </div>
                          <p className="text-lot-earth font-light leading-relaxed">
                            {step.desc}
                          </p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-lot-earth/20 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-lot-forest mb-4 border-b border-lot-earth/20 pb-4">Minimum Order</h3>
                <div className="space-y-4 mb-8">
                  <div><span className="font-mono font-bold text-lot-forest">10 Bags</span> <span className="text-lot-earth text-sm flex">(LCL / Air)</span></div>
                  <div><span className="font-mono font-bold text-lot-forest">320 Bags</span> <span className="text-lot-earth text-sm flex">(FCL / Sea)</span></div>
                </div>
                
                <h3 className="text-xl font-bold text-lot-forest mb-4 border-b border-lot-earth/20 pb-4">Export Documentation</h3>
                <ul className="space-y-3">
                  {documents.map((doc, i) => (
                     <li key={i} className="flex items-center gap-3 text-sm font-semibold text-lot-forest">
                       <FileText className="h-4 w-4 text-lot-earth" />
                       {doc}
                     </li>
                  ))}
                </ul>
              </div>
              
              <Link href="/contact" className="block w-full">
                <Button className="w-full bg-lot-forest text-white hover:bg-lot-forest/90 font-bold uppercase tracking-widest rounded-none h-14">
                  Contact Trade Desk
                </Button>
              </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
