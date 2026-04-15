import { Leaf, Award, Map, Droplet, Users, ShieldCheck } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us | Lot 251",
  description: "Learn about Lot 251, our Ethiopian coffee origin story, and our direct-export transparency model.",
};

export default function AboutPage() {
  const stats = [
    { label: "Partner Washing Stations", value: "30+" },
    { label: "Ethiopian Micro-Regions", value: "6" },
    { label: "Average SCA Score", value: "85+" },
    { label: "Global Export Destinations", value: "32" },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Traceability",
      description: "Complete identity preservation. From the washing station drying beds to the FOB container stuffing, every bag's lineage is tracked and guaranteed."
    },
    {
      icon: Users,
      title: "Producer Equity",
      description: "By buying directly and exporting independently, we bypass the traditional auction model to return higher premiums directly to smallholder cooperatives."
    },
    {
      icon: Droplet,
      title: "Technical Excellence",
      description: "Rigorous moisture and water activity parameters. Advanced screen sorting. Zero secondary defects. We set the standard for Ethiopian preparation."
    }
  ];

  return (
    <div className="bg-lot-paper min-h-screen">
      {/* Hero */}
      <section className="bg-lot-forest text-white py-24 md:py-32">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center">
             <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-lot-amber uppercase">
                EST. 2019 · ADDIS ABABA
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black mb-6 tracking-tighter leading-tight">
              About Lot 251
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
              Bridging the gap between the world's most complex coffee terroirs and premium global roasters through transparency and technical rigor.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story Split */}
      <section className="py-20 md:py-32">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[4/5] w-full hidden md:block">
              <Image 
                src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1000&auto=format&fit=crop"
                alt="Ethiopian Coffee Highlands"
                fill
                className="object-cover border-4 border-white shadow-xl"
              />
              <div className="absolute top-8 -right-8 w-64 p-6 bg-lot-forest text-white shadow-2xl hidden lg:block">
                 <Map className="h-6 w-6 text-lot-amber mb-4" />
                 <p className="text-sm font-light italic">"Ethiopia is not just an origin; it is the genetic epicenter of all Arabica coffee."</p>
              </div>
            </div>
            
            <div className="space-y-8">
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-lot-forest tracking-tight">The Origin Story</h2>
               <div className="w-16 h-1 bg-lot-amber" />
               <div className="space-y-6 text-lg text-lot-earth leading-relaxed font-light">
                 <p>
                   Founded in Addis Ababa, Lot 251 was born out of frustration with the opaque, multi-layer supply chains that often separated exceptional Ethiopian coffees from the roasters who valued them most.
                 </p>
                 <p>
                   Traditionally, coffees passed through the Ethiopia Commodity Exchange (ECX), losing their traceability and individual terroir identities in the process. We established Lot 251 to build a direct bridge.
                 </p>
                 <p>
                   Our team functions as your boots on the ground. We travel to the dense forests of Guji, the high altitudes of Yirgacheffe, and the drying beds of Sidama to source lots built on meticulous processing. We cup rigorously, secure the contracts, mill to exacting specifications, and manage the logistics all the way to FOB Djibouti.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* By The Numbers Strip */}
      <section className="bg-white py-16 border-y border-lot-earth/20 px-6">
         <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-lot-earth/10">
               {stats.map((stat, idx) => (
                 <div key={idx} className="flex flex-col items-center text-center pl-8 first:pl-0 border-l border-lot-earth/10 first:border-l-0">
                    <span className="text-4xl md:text-5xl font-mono font-bold text-lot-forest mb-2">{stat.value}</span>
                    <span className="text-xs uppercase tracking-widest font-bold text-lot-earth">{stat.label}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-32 bg-lot-forest/5">
        <div className="container px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-lot-forest tracking-tight mb-4">Our Export Philosophy</h2>
            <p className="text-lot-earth max-w-2xl mx-auto font-light text-lg">The principles that govern our sourcing and logistics.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-lot-earth/20 bg-white">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="p-10 md:p-12 border-b md:border-b-0 md:border-r border-lot-earth/20 last:border-0 hover:bg-lot-paper transition-colors">
                <pillar.icon className="h-10 w-10 text-lot-amber mb-6" />
                <h3 className="text-2xl font-bold text-lot-forest mb-4">{pillar.title}</h3>
                <p className="text-lot-earth font-light leading-relaxed mb-0">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership / Mission */}
      <section className="py-20 md:py-32">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
               <h2 className="text-3xl font-serif font-bold text-lot-forest tracking-tight mb-8">Leadership</h2>
               <div className="space-y-10">
                 <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-lot-forest text-white flex items-center justify-center font-serif text-2xl font-bold shrink-0">AE</div>
                    <div>
                      <h4 className="text-xl font-bold text-lot-forest">Amanuel Endale</h4>
                      <p className="text-xs font-bold text-lot-amber uppercase tracking-widest mb-3">Founder & Managing Director</p>
                      <p className="text-lot-earth font-light">With 15 years in logistics and coffee agronomy, Amanuel bridges the gap between rural washing station operations and international export regulation.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-lot-earth/20 text-lot-forest flex items-center justify-center font-serif text-2xl font-bold shrink-0">YG</div>
                    <div>
                      <h4 className="text-xl font-bold text-lot-forest">Yohannes Girma</h4>
                      <p className="text-xs font-bold text-lot-amber uppercase tracking-widest mb-3">Head of Quality (Q-Grader)</p>
                      <p className="text-lot-earth font-light">A certified Q-Grader responsible for calibrating all lot profiles, managing the Addis Ababa cupping lab, and enforcing physical milling specs.</p>
                    </div>
                 </div>
               </div>
            </div>
            
            <div className="grid grid-rows-2 gap-8">
              <div className="bg-lot-forest/5 p-10 border border-lot-forest/10">
                 <Leaf className="h-8 w-8 text-lot-amber mb-4" />
                 <h3 className="text-xl font-bold text-lot-forest mb-3">The Mission</h3>
                 <p className="text-lot-earth font-light">To curate and export Ethiopia’s highest scoring coffees while returning transparent premiums to the communities that cultivate them.</p>
              </div>
              <div className="bg-lot-forest/5 p-10 border border-lot-forest/10">
                 <Award className="h-8 w-8 text-lot-amber mb-4" />
                 <h3 className="text-xl font-bold text-lot-forest mb-3">The Vision</h3>
                 <p className="text-lot-earth font-light">To be the most reliable, technically rigorous B2B export partner for global specialty roasters seeking Ethiopian excellence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
