"use client";

import { TrendingUp } from "lucide-react";

export function ProductivityChart() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const values = [40, 65, 45, 90, 75, 55, 80]; // Mock statistics

    return (
        <div className="relative group overflow-hidden">
            <div className="flex items-end justify-between h-48 px-2 relative z-10">
                {values.map((v, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 group/bar relative h-full">
                        <div className="relative w-12 bg-white/5 rounded-xl overflow-hidden h-full border border-white/5 group-hover/bar:border-primary-500/30 transition-all">
                            <div
                                className="absolute bottom-0 w-full bg-main-gradient transition-all duration-1000 group-hover/bar:brightness-110 shadow-neon"
                                style={{ height: `${v}%` }}
                            >
                                <div className="absolute top-2 w-full flex justify-center opacity-20 group-hover/bar:opacity-50 transition-opacity">
                                    <div className="w-1 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">{days[i]}</span>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-8">
                    <div>
                        <p className="text-xl font-black text-white tracking-tight">142.4</p>
                        <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">Efficiency</p>
                    </div>
                    <div className="w-px h-8 bg-white/5"></div>
                    <div>
                        <p className="text-xl font-black text-primary-400 tracking-tight">92.8%</p>
                        <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">Precision</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
