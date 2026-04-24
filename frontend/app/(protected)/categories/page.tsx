"use client";

import { Folder, Hash, Star, LayoutGrid, Plus, MoreHorizontal } from "lucide-react";

export default function CategoriesPage() {
    const categories = [
        { title: "Core Architecture", count: 8, color: "from-blue-500 to-indigo-600", icon: Folder },
        { title: "Strategic Roadmap", count: 12, color: "from-purple-500 to-fuchsia-600", icon: LayoutGrid },
        { title: "Neural Research", count: 5, color: "from-cyan-400 to-blue-500", icon: Hash },
        { title: "Priority Vectors", count: 15, color: "from-indigo-500 to-purple-600", icon: Star }
    ];

    return (
        <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500 shadow-neon animate-pulse"></div>
                        <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Classification Engine Active</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                        Neural <span className="text-transparent bg-clip-text bg-main-gradient">Clusters.</span>
                    </h1>
                    <p className="text-secondary-text mt-4 text-lg font-medium opacity-80 tracking-tight">Organizing your workspace into <span className="text-white font-black">strategic data pools</span>.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-8 py-4 bg-main-gradient text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-neon hover:shadow-neon-premium transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                        <Plus className="w-4 h-4" />
                        <span>Initialize Cluster</span>
                    </button>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {categories.map((category, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="bg-surface-card backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/[0.05] shadow-sm hover:shadow-neon-glow-soft hover:border-primary-500/30 transition-all duration-500 relative overflow-hidden h-full">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-[0.03] group-hover:opacity-[0.1] -mr-16 -mt-16 rounded-full transition-all duration-700`}></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div className={`w-16 h-16 bg-gradient-to-tr ${category.color} rounded-[1.5rem] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-500`}>
                                        <category.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/20 hover:text-white transition-all">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">{category.title}.</h3>
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.05]">
                                    <span className="text-[10px] font-black text-secondary-text uppercase tracking-[0.2em]">{category.count} Strategic Nodes</span>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(j => (
                                            <div key={j} className="w-6 h-6 rounded-full border-2 border-surface-dark bg-white/10"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create New Category Placeholder */}
                <div className="group cursor-pointer h-full">
                    <div className="h-full border-2 border-dashed border-white/[0.05] rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-6 hover:bg-white/[0.02] hover:border-white/20 transition-all duration-500 group-hover:scale-[1.02]">
                        <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center group-hover:bg-main-gradient transition-all duration-500 shadow-sm group-hover:shadow-neon">
                            <Plus className="w-8 h-8 text-white/20 group-hover:text-white" />
                        </div>
                        <span className="text-[10px] font-black text-white/20 group-hover:text-white/40 uppercase tracking-[0.3em]">New Cluster α</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
