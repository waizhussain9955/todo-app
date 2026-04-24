"use client";

import { useTasks } from "@/hooks/useTasks";
import { ProductivityChart } from "@/components/dashboard/ProductivityChart";
import {
    Zap,
    CheckCircle2,
    Clock,
    Target,
    ArrowUpRight,
    TrendingUp,
    Flame,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardPage() {
    const { tasks, fetchTasks } = useTasks();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const stats = [
        { label: "Total Tasks", value: tasks.length, icon: Target, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { label: "Completed", value: tasks.filter(t => t.status === 'completed').length, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { label: "In Progress", value: tasks.filter(t => t.status === 'in_progress').length, icon: Clock, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
        { label: "Current Streak", value: "12", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
                        <span className="text-[10px] font-bold text-primary-400/60 uppercase tracking-[0.2em]">Neural Link Established</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Command <span className="text-transparent bg-clip-text bg-main-gradient">Center.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/tasks">
                        <button className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold transition-all flex items-center gap-2 backdrop-blur-md">
                            View All Tasks
                        </button>
                    </Link>
                    <Link href="/tasks/new">
                        <button className="px-6 py-3 bg-main-gradient text-white rounded-xl font-bold shadow-neon hover:shadow-neon-premium transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                            <Zap className="w-4 h-4 fill-current" />
                            New Entry
                        </button>
                    </Link>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <div key={i} className="group relative p-6 rounded-2xl bg-surface-card border border-white/[0.08] hover:border-white/[0.15] transition-all cursor-pointer overflow-hidden backdrop-blur-xl">
                        <div className="absolute inset-0 bg-main-gradient opacity-0 group-hover:opacity-[0.05] transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center border ${s.border} shadow-inner`}>
                                    <s.icon className={`w-6 h-6 ${s.color}`} />
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors" />
                            </div>
                            <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest mb-1">{s.label}</p>
                            <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-main-gradient transition-all">{s.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2 p-8 rounded-2xl bg-surface-card border border-white/[0.08] backdrop-blur-xl shadow-neon-glow">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white">Productivity Velocity</h3>
                            <p className="text-sm text-secondary-text">Output frequency over the last 7 cycles.</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <TrendingUp className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">+12.5%</span>
                        </div>
                    </div>
                    <ProductivityChart />
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-6">
                    <div className="p-8 rounded-2xl bg-main-gradient relative overflow-hidden group shadow-neon-premium cursor-pointer">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6 border border-white/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 tracking-tight">AI Copilot Pro</h3>
                            <p className="text-white/80 text-sm mb-6 leading-relaxed">Unlock advanced neural tasking and unlimited inference cycles.</p>
                            <button className="w-full py-3 bg-white text-primary-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-xl active:scale-95">Upgrade Now</button>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-surface-card border border-white/[0.08] backdrop-blur-xl shadow-neon-glow">
                        <h3 className="font-bold text-white mb-6 text-lg">Upcoming Priorities</h3>
                        <div className="space-y-4">
                            {[
                                { title: "Executive Review: v2.0", type: "Critical", color: "bg-rose-500", shadow: "shadow-rose-500/40" },
                                { title: "Neural Link Integration", type: "High", color: "bg-blue-500", shadow: "shadow-blue-500/40" },
                                { title: "Workspace Optimization", type: "Medium", color: "bg-amber-500", shadow: "shadow-amber-500/40" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/[0.05] hover:border-white/[0.1] transition-all cursor-pointer group hover:bg-white/[0.05]">
                                    <div className={`w-1.5 h-8 rounded-full ${item.color} ${item.shadow} shadow-[0_0_8px] opacity-40 group-hover:opacity-100 transition-opacity`}></div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-bold text-white mb-0.5 group-hover:text-primary-400 transition-colors">{item.title}</p>
                                        <p className="text-[10px] text-secondary-text font-bold uppercase tracking-widest">{item.type} Priority</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
    );
}
