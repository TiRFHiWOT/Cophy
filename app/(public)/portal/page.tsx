"use client";

import { useAuth } from "@/context/AuthContext";
import { 
  User, 
  Package, 
  FileText, 
  Settings, 
  LogOut, 
  ArrowRight,
  Clock,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PartnerPortalPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null;

  const dashboardCards = [
    {
      title: "Sample Requests",
      description: "Track your active coffee sample status and shipping info.",
      icon: Package,
      count: 0,
    },
    {
      title: "Technical Sheets",
      description: "Access full SCA scoring and moisture reports for your lots.",
      icon: FileText,
      count: 12,
    },
    {
      title: "Trade Documents",
      description: "Download invoices, packing lists, and certificates of origin.",
      icon: ShieldCheck,
      count: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-lot-paper py-12 md:py-20">
      <div className="container px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-lot-amber" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-lot-earth uppercase">
                Authorized Partner Access
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-lot-forest tracking-tighter italic">
              Welcome, {user.name.split(" ")[0]}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-lot-earth/20 text-lot-forest hover:bg-lot-forest hover:text-white uppercase text-[10px] font-bold tracking-widest px-6"
              onClick={() => logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats/Cards */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-lot-earth/10 p-8 hover:border-lot-amber/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 bg-lot-forest/5 flex items-center justify-center group-hover:bg-lot-amber/10 transition-colors">
                      <card.icon className="h-6 w-6 text-lot-forest group-hover:text-lot-amber transition-colors" />
                    </div>
                    {card.count > 0 && (
                      <span className="bg-lot-amber text-white text-[10px] font-bold px-2 py-1 rounded-sm">
                        {card.count} NEW
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-lot-forest mb-2">{card.title}</h3>
                  <p className="text-sm text-lot-earth/70 font-light mb-6 leading-relaxed">
                    {card.description}
                  </p>
                  <Button variant="link" className="p-0 text-lot-forest hover:text-lot-amber font-bold text-[10px] tracking-widest uppercase">
                    View Records <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-lot-earth/10">
              <div className="px-8 py-6 border-b border-lot-earth/10 bg-lot-forest/5">
                <h3 className="text-lg font-bold text-lot-forest">Recent Interactions</h3>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {[
                    { title: "Sample Request #251-09", status: "Shipped", date: "2 days ago", icon: CheckCircle2 },
                    { title: "Technical Sheet: Yirgacheffe G1", status: "Updated", date: "4 days ago", icon: Clock },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-4 border-b border-lot-earth/5 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-lot-paper flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-lot-amber" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-lot-forest">{item.title}</p>
                          <p className="text-[10px] text-lot-earth/50 uppercase tracking-widest">{item.date}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-lot-forest px-3 py-1 bg-lot-paper border border-lot-earth/10 uppercase">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-lot-forest text-white p-10 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-serif italic font-bold mb-4">Request Market Report</h3>
                <p className="text-sm text-white/60 font-light mb-8 leading-relaxed">
                  Get exclusive insights into the 2026 harvest window and early price projections for Sidama lots.
                </p>
                <Button className="w-full bg-lot-amber hover:bg-white hover:text-lot-forest font-bold uppercase text-[10px] tracking-widest py-6">
                  Contact Trade Desk
                </Button>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10">
                <FileText className="h-40 w-40" />
              </div>
            </div>

            <div className="bg-white border border-lot-earth/10 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full overflow-hidden border border-lot-earth/20">
                  <div className="w-full h-full bg-lot-paper flex items-center justify-center">
                    <User className="h-6 w-6 text-lot-earth" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-lot-earth/50 uppercase font-black tracking-widest">Account Manager</p>
                  <p className="text-sm font-bold text-lot-forest">Abebe Kelemu</p>
                </div>
              </div>
              <hr className="border-lot-earth/10 mb-6" />
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-lot-earth uppercase font-bold tracking-widest">Membership</span>
                  <span className="text-lot-amber font-black uppercase">Platinum Tier</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-lot-earth uppercase font-bold tracking-widest">Active Orders</span>
                  <span className="text-lot-forest font-black uppercase">2 Shipments</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-8 border-lot-earth/20 text-lot-forest hover:bg-lot-paper uppercase text-[10px] font-bold tracking-widest">
                <Settings className="mr-2 h-3.5 w-3.5" /> Account Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
