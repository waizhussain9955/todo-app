// components/landing/Footer.tsx
"use client";

import Link from "next/link";
import { Terminal, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0b0f19] border-t border-white/[0.05] py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="w-10 h-10 bg-main-gradient rounded-xl flex items-center justify-center shadow-neon group-hover:scale-110 transition-transform duration-500">
                <Terminal className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase">
                TODO<span className="text-primary-500">MASTER</span>
              </span>
            </Link>
            <p className="text-secondary-text text-base leading-relaxed font-medium opacity-70">
              The world's fastest AI-driven task management engine. Neural-grade infrastructure for modern teams.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-secondary-text hover:text-white hover:bg-white/[0.08] hover:border-primary-500/40 transition-all duration-300 shadow-neon-glow-soft">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Product</h4>
            <ul className="space-y-4 text-sm text-secondary-text font-medium">
              <li><Link href="#features" className="hover:text-primary-400 transition-colors">Neural Engine</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Inference Protocol</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Distributed Sync</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Enterprise Core</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Intelligence</h4>
            <ul className="space-y-4 text-sm text-secondary-text font-medium">
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">API Endpoint</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Vector Search</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Knowledge Base</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Organization</h4>
            <ul className="space-y-4 text-sm text-secondary-text font-medium">
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Global Status</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Infrastructure</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Security Audit</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Legal Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary-text/40">
          <p>© {new Date().getFullYear()} TodoMaster. Neural Infrastructure v1.0.4</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy System</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
