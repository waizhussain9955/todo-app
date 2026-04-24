"use client";

import React, { useEffect } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import LoggedInNavbar from "@/components/layout/LoggedInNavbar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ChatPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        document.title = "AI Assistant | TodoMaster";
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-surface-dark">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#0b0f19] relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3b82f6]/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-[#8b5cf6]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <LoggedInNavbar />
            
            <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500 shadow-neon animate-pulse"></div>
                        <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Neural Engine Active</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-4">
                        AI <span className="text-transparent bg-clip-text bg-main-gradient">Operative.</span>
                    </h1>
                    <p className="text-secondary-text text-sm font-medium opacity-80 max-w-xl">
                        Direct interface with task management intelligence. Synchronize your objectives through advanced neural processing.
                    </p>
                </div>

                <ChatContainer />
            </main>
        </div>
    );
}
