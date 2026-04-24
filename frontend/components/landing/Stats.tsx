// components/landing/Stats.tsx
"use client";

import { Activity, Database, Globe } from "lucide-react";

const Stats = () => {
  const stats = [
    { icon: Globe, label: "Global Nodes", value: "24" },
    { icon: Database, label: "Neural Vectors", value: "128M+" },
    { icon: Activity, label: "Latency", value: "<15ms" },
  ];

  return (
    <section id="metrics" className="py-24 bg-[#0b0f19] border-y border-white/[0.05] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group relative py-8"
              >
                <div className="mb-8 inline-flex p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] group-hover:border-primary-500/40 transition-all duration-500 shadow-neon-glow-soft">
                  <Icon className="w-10 h-10 text-white shadow-neon transition-all duration-500 group-hover:scale-110" />
                </div>
                <div className="text-6xl md:text-7xl font-black mb-3 tracking-tighter text-transparent bg-clip-text bg-main-gradient">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black text-primary-200/40 uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
