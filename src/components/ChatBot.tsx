"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_REPLIES = [
  "Paket Internet",
  "Cara Pasang",
  "Area Layanan",
  "Harga Berapa?",
];

const BOT_AVATAR = (
  <div className="ranger-bot-avatar">
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="20" cy="20" r="20" fill="url(#botGrad)" />
      <defs>
        <linearGradient id="botGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1d4ed8" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* Robot face */}
      <rect x="11" y="13" width="18" height="14" rx="3" fill="white" fillOpacity="0.9" />
      <circle cx="16" cy="19" r="2.5" fill="#1d4ed8" />
      <circle cx="24" cy="19" r="2.5" fill="#1d4ed8" />
      <circle cx="16.8" cy="18.2" r="0.8" fill="white" />
      <circle cx="24.8" cy="18.2" r="0.8" fill="white" />
      <rect x="15" y="23" width="10" height="2" rx="1" fill="#1d4ed8" fillOpacity="0.6" />
      {/* Antenna */}
      <line x1="20" y1="13" x2="20" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="8" r="1.5" fill="#f97316" />
    </svg>
  </div>
);

function TypingIndicator() {
  return (
    <div className="ranger-typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 300);
      if (!hasGreeted) {
        setHasGreeted(true);
      }
    }
  }, [isOpen, hasGreeted]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setUserName(trimmed);
    setNameSubmitted(true);
    // Add greeting message from bot
    const greeting: Message = {
      role: "assistant",
      content: `Halo **${trimmed}**! 👋 Saya Jelantik Bot, asisten virtual Jelantik.\n\nSaya bisa membantu kamu dengan:\n• 📦 Informasi paket internet\n• 🔧 Cara pemasangan\n• 📍 Area layanan\n• 💰 Harga & promo\n\nAda yang bisa saya bantu?`,
      timestamp: new Date(),
    };
    setMessages([greeting]);
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", content: text.trim() }],
          userName,
        }),
      });

      const data = await res.json();
      const botMessage: Message = {
        role: "assistant",
        content: data.reply || "Maaf, terjadi kesalahan. Silakan coba lagi.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      if (!isOpen) setUnreadCount((c) => c + 1);
    } catch {
      const errorMessage: Message = {
        role: "assistant",
        content: "Maaf, koneksi bermasalah. Silakan coba lagi atau hubungi kami via WhatsApp: 089606025227",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, userName, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderMessageContent = (content: string) => {
    // Simple markdown-like rendering
    const lines = content.split("\n");
    return lines.map((line, i) => {
      // Bold text
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const rendered = parts.map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      );
      return (
        <span key={i}>
          {rendered}
          {i < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Button */}
      <div className="ranger-bot-wrapper">
        <button
          id="ranger-bot-toggle"
          onClick={() => setIsOpen((v) => !v)}
          className="ranger-bot-fab"
          aria-label="Buka chat dengan Jelantik"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
          {unreadCount > 0 && !isOpen && (
            <span className="ranger-bot-badge">{unreadCount}</span>
          )}
        </button>

        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="ranger-bot-pulse" />
        )}

        {/* Chat Window */}
        <div className={`ranger-bot-window ${isOpen ? "ranger-bot-window--open" : ""}`}>
          {/* Header */}
          <div className="ranger-bot-header">
            <div className="ranger-bot-header-avatar">
              {BOT_AVATAR}
              <span className="ranger-bot-status-dot" />
            </div>
            <div className="ranger-bot-header-info">
              <h3 className="ranger-bot-header-name">Jelantik Ai Agent</h3>
              <p className="ranger-bot-header-status">Online • Siap membantu</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ranger-bot-close"
              aria-label="Tutup chat"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          {!nameSubmitted ? (
            /* Name Input Screen */
            <div className="ranger-bot-name-screen">
              <div className="ranger-bot-name-avatar">{BOT_AVATAR}</div>
              <h4 className="ranger-bot-name-title">Halo, Customer! 👋</h4>
              <p className="ranger-bot-name-desc">
                Saya Jelantik Bot, asisten virtual Jelantik. Boleh saya tahu nama kamu?
              </p>
              <form onSubmit={handleNameSubmit} className="ranger-bot-name-form">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Masukkan nama kamu..."
                  className="ranger-bot-name-input"
                  maxLength={50}
                  autoFocus
                />
                <button type="submit" className="ranger-bot-name-btn" disabled={!nameInput.trim()}>
                  Mulai Chat
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="ranger-bot-messages" id="ranger-bot-messages">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`ranger-bot-msg ${msg.role === "user" ? "ranger-bot-msg--user" : "ranger-bot-msg--bot"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="ranger-bot-msg-avatar">{BOT_AVATAR}</div>
                    )}
                    <div className="ranger-bot-msg-bubble">
                      <p className="ranger-bot-msg-text">
                        {renderMessageContent(msg.content)}
                      </p>
                      <span className="ranger-bot-msg-time">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="ranger-bot-msg ranger-bot-msg--bot">
                    <div className="ranger-bot-msg-avatar">{BOT_AVATAR}</div>
                    <div className="ranger-bot-msg-bubble">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 1 && (
                <div className="ranger-bot-quick-replies">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      className="ranger-bot-quick-btn"
                      disabled={isLoading}
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form onSubmit={handleSubmit} className="ranger-bot-input-area">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pesan... (cth: cari sepatu)"
                  className="ranger-bot-input"
                  disabled={isLoading}
                  maxLength={500}
                />
                <button
                  type="submit"
                  className="ranger-bot-send"
                  disabled={isLoading || !input.trim()}
                  aria-label="Kirim pesan"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
