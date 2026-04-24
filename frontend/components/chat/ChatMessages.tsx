"use client";

import React, { useEffect, useRef } from "react";
import ChatMessageBubble from "./ChatMessageBubble";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatMessagesProps {
    messages: Message[];
    isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 custom-scrollbar">
            {messages.map((msg, index) => (
                <ChatMessageBubble key={index} content={msg.content} role={msg.role} />
            ))}

            {isLoading && (
                <div className="flex justify-start mb-6">
                    <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.05] rounded-[1.5rem] rounded-tl-none px-6 py-4 shadow-neon-glow-soft">
                        <div className="flex space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatMessages;
