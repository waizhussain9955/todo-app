// components/layout/PublicNavbar.tsx
"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const PublicNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 w-full z-[100] backdrop-blur-xl border-b border-white/[0.05] bg-[#0b0f19]/80 px-6 md:px-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5">
        <Link href="/" className="group flex items-center space-x-3">
          <div className="relative w-11 h-11 bg-main-gradient rounded-xl flex items-center justify-center shadow-neon group-hover:scale-110 transition-all duration-500">
            <Terminal className="text-white w-6 h-6" />
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase">
              Todo<span className="text-transparent bg-clip-text bg-main-gradient">Master.</span>
            </span>
            <span className="text-[10px] text-primary-400 font-bold tracking-[0.2em] uppercase opacity-70">Intelligence Core</span>
          </div>
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-primary-400 hover:text-primary-300 transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-10">
            <Link href="#features" className="text-xs font-black uppercase tracking-widest text-secondary-text hover:text-white transition-colors">Features</Link>
            <Link href="#metrics" className="text-xs font-black uppercase tracking-widest text-secondary-text hover:text-white transition-colors">Metrics</Link>
          </nav>
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-white hover:text-primary-400 font-bold transition-all duration-300 text-sm px-4 py-2"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="px-8 py-3 bg-main-gradient text-white text-sm font-black uppercase tracking-wider rounded-full shadow-neon hover:shadow-neon-premium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface-dark/95 backdrop-blur-2xl border-b border-white/5 py-8 px-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-6">
            <Link href="#features" className="text-lg font-bold text-white" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link href="#metrics" className="text-lg font-bold text-white" onClick={() => setIsMenuOpen(false)}>Metrics</Link>
            <div className="h-px w-full bg-white/5 my-2"></div>
            <Link
              href="/login"
              className="text-center py-4 text-slate-400 font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-main-gradient text-white text-center py-4 rounded-xl font-bold shadow-neon"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;