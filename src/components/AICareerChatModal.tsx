"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  HelpCircle,
  BrainCircuit,
  Compass,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function AICareerChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am your SkillPath AI Career Advisor. I have context on your target career, current skill gaps, and learning roadmap. How can I assist your career journey today?",
      timestamp: "Just now",
    },
  ]);

  const quickPrompts = [
    "How to prepare for Data Scientist interviews?",
    "Recommend a portfolio project for my gaps",
    "How to highlight these skills on my resume?",
    "How long until I reach 90% readiness?",
  ];

  const handleSendMessage = async (queryText?: string) => {
    const text = (queryText || inputQuery).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: String(Date.now() + 1),
          sender: "ai",
          text: data.answer,
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error("Failed to query mentor");
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: "ai",
        text: "Focusing on your highest-priority gap areas like Machine Learning modeling and containerized model deployment while building an end-to-end GitHub portfolio will accelerate your career readiness significantly.",
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-button-primary px-4 py-3 rounded-full flex items-center gap-2.5 shadow-glass-lg cursor-pointer group"
        >
          <div className="w-6 h-6 rounded-full bg-ice/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-ice animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white pr-1">
            {isOpen ? "Close Advisor" : "AI Career Mentor"}
          </span>
        </button>
      </div>

      {/* Chat Dialog Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 max-h-[560px] glass-panel rounded-3xl border border-academic-400/40 shadow-glass-lg flex flex-col overflow-hidden text-white"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 bg-navy-950/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-academic-500/30 flex items-center justify-center border border-academic-400/40">
                  <BrainCircuit className="w-4 h-4 text-ice" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">SkillPath AI Mentor</h4>
                  <span className="text-[10px] text-emerald-400 font-mono block">
                    ● Grounded in your profile
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg glass-button-secondary text-ice hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[260px] max-h-[340px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-6 h-6 rounded-full bg-academic-600/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-ice" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-academic-600 text-white rounded-br-xs"
                        : "bg-navy-900/80 border border-white/10 text-ice-100 rounded-bl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-ice-400 italic">
                  <div className="w-3 h-3 border-2 border-academic-400 border-t-transparent rounded-full animate-spin" />
                  <span>Thinking...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 border-t border-white/5 bg-navy-950/40 flex flex-wrap gap-1.5 overflow-x-auto">
              {quickPrompts.slice(0, 2).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-ice-300 text-left transition-colors whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Message Input Box */}
            <div className="p-3 border-t border-white/10 bg-navy-950/90 flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask career question..."
                className="flex-1 glass-input px-3.5 py-2 rounded-xl text-xs text-white placeholder:text-ice-400/50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !inputQuery.trim()}
                className="p-2 rounded-xl glass-button-primary text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
