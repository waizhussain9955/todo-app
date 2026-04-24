// app/(protected)/layout.tsx
"use client";

import LoggedInNavbar from '@/components/layout/LoggedInNavbar';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-surface-dark text-white selection:bg-primary-500/30">
      <LoggedInNavbar />
      <main className="flex-grow p-4 md:p-8 bg-bg-glow relative overflow-hidden">
        {/* Ambient background blur circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
