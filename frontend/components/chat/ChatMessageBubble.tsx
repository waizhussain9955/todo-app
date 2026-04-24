"use client";

import React from "react";

interface ChatMessageBubbleProps {
    content: string;
    role: "user" | "assistant";
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ content, role }) => {
    const isUser = role === "user";

    return (
        <div
            className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[80%] rounded-[1.5rem] px-5 py-4 ${isUser
                        ? "bg-main-gradient text-white rounded-tr-none shadow-neon-glow-soft"
                        : "bg-white/[0.03] backdrop-blur-md border border-white/[0.05] text-white rounded-tl-none"
                    }`}
            >
                <p className="text-[13px] leading-relaxed whitespace-pre-wrap font-medium">{content}</p>
            </div>
        </div>
    );
};

export default ChatMessageBubble;
