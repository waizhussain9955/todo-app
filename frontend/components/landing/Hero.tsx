// components/landing/Hero.tsx
"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#3b82f6]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-[#8b5cf6]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.05] bg-white/[0.03] backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 shadow-neon-glow-soft">
          <Sparkles className="w-4 h-4 text-primary-400 shadow-neon" />
          <span className="text-[10px] font-black text-primary-200 uppercase tracking-[0.2em]">Neural Processing Active</span>
        </div>

        <div className="space-y-10 mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter">
            Ship Tasks at <br />
            <span className="text-transparent bg-clip-text bg-main-gradient">Sub-second Speed.</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary-text max-w-3xl mx-auto leading-relaxed font-medium opacity-80">
            The world's fastest AI-driven task management engine. Organize, automate, and execute your roadmap with neural-grade infrastructure.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/register"
            className="group px-10 py-5 bg-main-gradient text-white font-black uppercase tracking-wider text-sm rounded-full shadow-neon hover:shadow-neon-premium transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Initialize Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="px-10 py-5 bg-white/[0.03] text-white font-black uppercase tracking-wider text-sm rounded-full border border-white/[0.05] hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-xl"
          >
            System Demo
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-28 relative group max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-main-gradient rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-surface-card backdrop-blur-2xl border border-white/[0.08] rounded-[2.5rem] overflow-hidden shadow-neon-glow-soft animate-in zoom-in-95 duration-1000">
            <div className="h-12 bg-white/[0.03] border-b border-white/[0.05] flex items-center px-6 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="mx-auto flex items-center gap-2 bg-white/[0.05] px-4 py-1.5 rounded-lg border border-white/[0.05]">
                <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Protocol.v1</span>
              </div>
            </div>
            <div className="aspect-[16/10] bg-[#0b0f19]/40 p-8 flex flex-col gap-6">
              <div className="flex justify-between items-center mb-4">
                <div className="h-8 w-48 bg-white/[0.05] rounded-xl border border-white/[0.05]"></div>
                <div className="flex gap-3">
                  <div className="h-10 w-10 bg-white/[0.05] rounded-xl border border-white/[0.05]"></div>
                  <div className="h-10 w-32 bg-main-gradient rounded-xl opacity-80"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-6 flex flex-col gap-4">
                    <div className="h-4 w-24 bg-white/[0.05] rounded-full"></div>
                    <div className="h-20 bg-white/[0.03] rounded-2xl"></div>
                    <div className="h-20 bg-white/[0.03] rounded-2xl"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
