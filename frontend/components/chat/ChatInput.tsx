"use client";

import React, { useState, FormEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSend(input);
            setInput("");
        }
    };

    return (
        <div className="p-8 border-t border-white/[0.05] bg-white/[0.02]">
            <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your query..."
                    disabled={isLoading}
                    className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/50 transition-all duration-300 outline-none font-medium placeholder:text-slate-600 text-white disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-4 bg-main-gradient hover:opacity-90 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-neon-glow transform active:scale-95"
                    aria-label="Send message"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
