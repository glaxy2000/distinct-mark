import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";

const AGENT_NAME = "distinct_mark_assistant";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const startConversation = async () => {
    if (conversation) return;
    setStarting(true);
    try {
      const conv = await base44.agents.createConversation({
        agent_name: AGENT_NAME,
        metadata: { name: "Website Chat" },
      });
      setConversation(conv);
      // Subscribe to live updates
      base44.agents.subscribeToConversation(conv.id, (data) => {
        setMessages([...data.messages]);
        setLoading(false);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setStarting(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    startConversation();
  };

  const handleSend = async () => {
    if (!input.trim() || loading || !conversation) return;
    const text = input.trim();
    setInput("");
    setLoading(true);
    await base44.agents.addMessage(conversation, { role: "user", content: text });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const visibleMessages = messages.filter(
    (m) => m.role === "user" || (m.role === "assistant" && m.content)
  );

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-2xl flex items-center justify-center"
            style={{ boxShadow: "0 8px 32px rgba(232,131,42,0.45)" }}
          >
            <MessageCircle className="w-6 h-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-secondary opacity-30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
            style={{ height: "520px", maxHeight: "85vh" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-primary">
              <div className="w-9 h-9 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Distinct Mark Assistant</p>
                <p className="text-white/50 text-xs">Ask me anything about our services</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-muted/30 px-4 py-4 space-y-3">
              {/* Welcome message */}
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-secondary" />
                </div>
                <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
                  <p className="text-sm text-foreground leading-relaxed">
                    Hello! 👋 I'm the Distinct Mark assistant. How can I help you today? Ask me about our services, projects, or how to get in touch.
                  </p>
                </div>
              </div>

              {starting && (
                <div className="flex justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              )}

              {visibleMessages.map((msg, i) => {
                const isUser = msg.role === "user";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 items-start ${isUser ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isUser ? "bg-secondary/20" : "bg-secondary/20"}`}>
                      {isUser
                        ? <User className="w-4 h-4 text-secondary" />
                        : <Bot className="w-4 h-4 text-secondary" />
                      }
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm leading-relaxed ${
                      isUser
                        ? "bg-secondary text-secondary-foreground rounded-tr-sm"
                        : "bg-card border border-border/50 text-foreground rounded-tl-sm"
                    }`}>
                      {isUser ? (
                        <p>{msg.content}</p>
                      ) : (
                        <ReactMarkdown className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                          {msg.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {loading && (
                <div className="flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="bg-card border-t border-border/50 px-3 py-3 flex gap-2 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 resize-none bg-muted/50 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground text-foreground max-h-24"
                style={{ lineHeight: "1.4" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading || !conversation}
                className="w-9 h-9 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 hover:bg-secondary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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