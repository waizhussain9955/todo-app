// app/register/page.tsx
"use client";

import { RegisterForm } from '@/components/forms/RegisterForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#0b0f19] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#3b82f6]/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8b5cf6]/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute top-10 left-10">
        <Link href="/" className="inline-flex items-center text-secondary-text hover:text-primary-400 transition-all group font-black uppercase tracking-widest text-[11px]">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform text-primary-500" />
          Abort Sequence
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary-500 shadow-neon animate-pulse"></div>
            <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Deployment Protocol</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-4 text-white">
            Mobilize<span className="text-transparent bg-clip-text bg-main-gradient">.</span>
          </h1>
          <p className="text-secondary-text font-medium text-sm opacity-80">
            Initialize distributed task intelligence node.
          </p>
        </div>

        <div className="bg-surface-card backdrop-blur-xl border border-white/[0.05] rounded-[2.5rem] p-10 shadow-neon-glow-soft">
          <RegisterForm />
        </div>

        <p className="text-center mt-10 text-secondary-text text-sm font-medium">
          Already verified?{' '}
          <Link href="/login" className="text-primary-400 hover:text-primary-300 font-black uppercase tracking-wider transition-all underline underline-offset-8 decoration-primary-500/30">
            Execute Entry
          </Link>
        </p>
      </div>
    </div>
  );
}
