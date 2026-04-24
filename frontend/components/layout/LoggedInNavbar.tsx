// components/layout/LoggedInNavbar.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { LayoutDashboard, CheckSquare, User, LogOut, ChevronDown, Menu, X, Calendar, MessageSquare, Terminal } from 'lucide-react';

const LoggedInNavbar = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isLoading) return null;

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/chat", label: "AI Chat", icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-surface-dark/80 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link href="/dashboard" className="group flex items-center space-x-3">
            <div className="w-9 h-9 bg-main-gradient rounded-lg flex items-center justify-center shadow-neon group-hover:scale-110 transition-transform duration-500">
              <Terminal className="text-white w-5 h-5" />
            </div>
            <span className="hidden sm:inline-block text-lg font-black text-white tracking-tighter uppercase">
              TODO<span className="text-primary-500">MASTER</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${isActive
                    ? "bg-white/5 text-white shadow-inner"
                    : "text-secondary-text hover:text-white hover:bg-white/5"
                    }`}
                >
                  <item.icon className={`w-4 h-4 mr-3 ${isActive ? "text-primary-400" : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-xl bg-white/5 text-primary-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 rounded-full p-1 group transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-main-gradient flex items-center justify-center text-white font-black shadow-neon group-hover:shadow-neon-premium transition-all">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden md:flex flex-col items-start -space-y-1">
                <span className="text-sm font-bold text-white">{user?.name}</span>
                <span className="text-[10px] font-bold text-primary-400/60 uppercase tracking-widest">Active</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-secondary-text transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-64 origin-top-right rounded-2xl bg-surface-dark border border-white/5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 z-50 p-2 backdrop-blur-2xl">
                <div className="p-4 rounded-xl bg-white/5 mb-2 border border-white/5">
                  <p className="font-bold text-white truncate">{user?.name}</p>
                  <p className="text-xs text-secondary-text truncate">
                    {user?.email}
                  </p>
                </div>

                <Link href="/profile" className="flex items-center px-4 py-3 text-sm font-bold text-secondary-text hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <User className="w-4 h-4 mr-3" />
                  My Profile
                </Link>

                <div className="h-px bg-white/5 my-2"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface-dark backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300 border-t border-white/5 shadow-2xl">
          <nav className="p-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center p-4 rounded-xl font-bold text-base transition-all ${isActive
                    ? "bg-white/5 text-white"
                    : "text-secondary-text"
                    }`}
                >
                  <item.icon className="w-5 h-5 mr-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-4 rounded-xl font-bold text-base text-rose-500"
            >
              <LogOut className="w-5 h-5 mr-4" />
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default LoggedInNavbar;
