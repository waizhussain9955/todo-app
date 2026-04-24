"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, MapPin } from "lucide-react";

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Mock events for the premium look
    const events = [
        { date: 15, title: "System Sync.α", type: "meeting" },
        { date: 18, title: "Deploy Workspace", type: "task" },
        { date: 22, title: "Core Review", type: "review" }
    ];

    return (
        <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500 shadow-neon animate-pulse"></div>
                        <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Temporal Node Active</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                        Neural <span className="text-transparent bg-clip-text bg-main-gradient">Timeline.</span>
                    </h1>
                    <p className="text-secondary-text mt-4 text-lg font-medium opacity-80 tracking-tight">Synchronizing your strategic roadmap for <span className="text-white font-black">January 2026</span>.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-8 py-4 bg-main-gradient text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-neon hover:shadow-neon-premium transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                        <Plus className="w-4 h-4" />
                        <span>Schedule Task</span>
                    </button>
                </div>
            </div>

            {/* Premium Calendar Grid */}
            <div className="bg-surface-card backdrop-blur-xl p-6 md:p-12 rounded-[2.5rem] border border-white/[0.05] shadow-neon-glow-soft relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 relative z-10">
                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase">January 2026</h2>
                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 hover:text-white transition-all border border-white/5">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 hover:text-white transition-all border border-white/5">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-3 md:gap-6 relative z-10">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day} className="text-center pb-6">
                            <span className="text-[10px] font-black text-secondary-text uppercase tracking-[0.2em]">{day}</span>
                        </div>
                    ))}

                    {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const hasEvent = events.find(e => e.date === day);
                        const isToday = day === 28;

                        return (
                            <div key={i} className={`min-h-[100px] md:min-h-[160px] p-4 md:p-6 rounded-[1.5rem] border transition-all duration-500 relative group cursor-pointer ${isToday
                                ? 'bg-main-gradient border-transparent shadow-neon scale-[1.03] z-20'
                                : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10'
                                }`}>
                                <span className={`text-xl font-black tracking-tighter transition-colors ${isToday ? 'text-white' : 'text-white/10 group-hover:text-white/40'
                                    }`}>
                                    {day < 10 ? `0${day}` : day}
                                </span>

                                {hasEvent && (
                                    <div className="mt-4">
                                        <div className={`p-3 rounded-xl border flex flex-col items-start gap-1.5 transition-all shadow-sm ${isToday ? 'bg-white/10 border-white/20' : 'bg-surface-dark/50 border-white/[0.05]'
                                            }`}>
                                            <span className={`text-[8px] font-black uppercase tracking-widest ${isToday ? 'text-white' : 'text-primary-400'
                                                }`}>
                                                {hasEvent.type}
                                            </span>
                                            <span className={`text-[10px] font-black tracking-tight line-clamp-1 ${isToday ? 'text-white' : 'text-white/80'}`}>{hasEvent.title}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="bg-surface-card backdrop-blur-xl p-8 rounded-[2rem] border border-white/[0.05] shadow-sm hover:shadow-neon-glow-soft group transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-main-gradient rounded-xl flex items-center justify-center shadow-neon">
                            <MapPin className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black text-white tracking-tighter uppercase">Local Nodes.</h3>
                    </div>
                    <p className="text-sm font-medium text-secondary-text leading-relaxed">Synchronizing across 3 strategic locations for today's roadmap execution.</p>
                </div>
            </div>
        </div>
    );
}
