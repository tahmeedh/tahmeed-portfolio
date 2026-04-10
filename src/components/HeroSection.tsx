'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { answerQuestion } from '../lib/miniLLM';

// ─── Waving character ────────────────────────────────────────────────────────

function WavingCharacter() {
  const controls = useAnimation();
  const [hasWaved, setHasWaved] = useState(false);

  // Trigger wave on mount
  useEffect(() => {
    const wave = async () => {
      // Float in
      await controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      });
      // Wave: rotate whole character slightly to simulate greeting
      await controls.start({
        rotate: [0, -4, 4, -4, 3, -2, 0],
        transition: { duration: 1.4, ease: 'easeInOut' },
      });
      setHasWaved(true);
    };
    wave();
  }, [controls]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow behind character */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Character image */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={controls}
        className="relative z-10 select-none"
        style={{ filter: 'drop-shadow(0 0 40px rgba(168,85,247,0.25))' }}
      >
        <img
          src="/avatar.png"
          alt="Tahmeed — AI Engineer character"
          className="w-full max-w-[420px] object-contain mx-auto"
          style={{ maxHeight: '540px' }}
          onError={(e) => {
            // Fallback if image not yet added
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />

        {/* Fallback placeholder shown when no image */}
        <div
          id="avatar-placeholder"
          className="w-72 h-72 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 border border-purple-500/30 flex items-center justify-center"
          style={{ display: 'none' }}
        >
          <span className="text-7xl select-none">🤖</span>
        </div>
      </motion.div>

      {/* Waving hand overlay — animates on load */}
      <motion.div
        className="absolute bottom-24 right-6 md:right-12 z-20 pointer-events-none"
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          scale: [0.5, 1.2, 1, 1, 0.8],
          rotate: [-20, 20, -20, 20, 0],
        }}
        transition={{ delay: 0.9, duration: 1.8, ease: 'easeInOut' }}
      >
        <div className="bg-[#1a1a2e] border border-purple-500/30 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-2">
          <span className="text-2xl select-none" style={{ display: 'inline-block', animation: 'wave 1.2s ease-in-out 0.9s 2' }}>
            👋
          </span>
          <span className="text-sm text-gray-300 font-medium">Hey there!</span>
        </div>
      </motion.div>

      {/* Floating decorative dots */}
      {hasWaved && (
        <>
          <motion.div
            className="absolute top-12 right-8 w-2 h-2 bg-purple-400 rounded-full"
            animate={{ y: [-4, 4, -4], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-32 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full"
            animate={{ y: [4, -4, 4], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </>
      )}
    </div>
  );
}

// ─── Animated placeholder text ───────────────────────────────────────────────

const PLACEHOLDERS = [
  "What tech stack does Tahmeed specialize in?",
  "Tell me about his AI testing experience...",
  "What's his biggest engineering achievement?",
  "Is he available for new opportunities?",
  "What automation tools does he know?",
];

const letterVariants = {
  initial: { opacity: 0, filter: 'blur(8px)', y: 8 },
  animate: {
    opacity: 1, filter: 'blur(0px)', y: 0,
    transition: { opacity: { duration: 0.2 }, filter: { duration: 0.3 }, y: { type: 'spring', stiffness: 80, damping: 20 } },
  },
  exit: {
    opacity: 0, filter: 'blur(8px)', y: -8,
    transition: { opacity: { duration: 0.15 }, filter: { duration: 0.2 }, y: { type: 'spring', stiffness: 80, damping: 20 } },
  },
};

// ─── Main export ─────────────────────────────────────────────────────────────

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface HistoryEntry {
  role: string;
  content: string;
}

export default function HeroSection() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPlaceholder(false);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        setShowPlaceholder(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now().toString(), text, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    const newHistory = [...history, { role: 'user', content: text }];
    try {
      const reply = answerQuestion(text);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), text: reply, isBot: true }]);
      setHistory([...newHistory, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Network error — please try again or email tahmeedhossain@gmail.com",
        isBot: true,
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "What's his experience?",
    "Show me his skills",
    "Recent projects?",
    "Available to hire?",
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#04030a] overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(168,85,247,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12">
        <span className="font-mono text-purple-400 text-sm tracking-widest">TH.DEV</span>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#works" className="hover:text-white transition-colors">Works</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <a
            href="https://github.com/tahmeedh"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-purple-500/30 text-purple-400 hover:border-purple-500 hover:text-white px-4 py-1.5 rounded-full transition-all text-xs"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Main grid */}
      <div className="relative z-10 flex-1 grid lg:grid-cols-2 gap-8 items-center px-6 py-8 md:px-12 max-w-7xl mx-auto w-full">
        {/* Left: Text + Chat */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="h-px w-8 bg-purple-500" />
              <span className="text-purple-400 text-sm font-mono tracking-wider">AI ENGINEER PORTFOLIO</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="block text-white">Tahmeed</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #a855f7, #3b82f6, #06b6d4)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 6s ease infinite',
                }}
              >
                Hossain
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-400 font-light max-w-md"
            >
              Software Engineer in Test · AI Testing Specialist · 7+ years building quality systems at scale
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {['Playwright', 'YOLOv8', 'TypeScript', 'AWS', 'Docker'].map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full border border-purple-500/20 text-purple-300/70 font-mono">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Chat box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-400 font-mono">ASK ANYTHING ABOUT MY EXPERIENCE</span>
            </div>

            <div className="bg-[#0d0d16] border border-purple-500/15 rounded-2xl overflow-hidden shadow-2xl">
              {messages.length > 0 && (
                <div ref={scrollContainerRef} className="p-4 max-h-52 overflow-y-auto space-y-3 border-b border-white/5">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                          msg.isBot
                            ? 'bg-white/5 text-gray-200 border border-white/8'
                            : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-white/5 border border-white/8 px-4 py-3 rounded-xl">
                        <div className="flex gap-1.5 items-center">
                          {[0, 150, 300].map((delay) => (
                            <span
                              key={delay}
                              className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                              style={{ animationDelay: `${delay}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 p-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
                    }}
                    className="w-full bg-transparent text-gray-200 text-sm px-3 py-2 outline-none placeholder-transparent relative z-10"
                  />
                  <div className="absolute inset-0 pointer-events-none flex items-center px-3">
                    <AnimatePresence mode="wait">
                      {showPlaceholder && !input && (
                        <motion.span
                          key={placeholderIndex}
                          className="text-gray-600 text-sm select-none whitespace-nowrap overflow-hidden"
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={{
                            initial: {},
                            animate: { transition: { staggerChildren: 0.02 } },
                            exit: { transition: { staggerChildren: 0.01, staggerDirection: -1 } },
                          }}
                        >
                          {PLACEHOLDERS[placeholderIndex].split('').map((char, i) => (
                            <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
                              {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                          ))}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={isTyping}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/8 hover:border-purple-500/40 text-gray-400 hover:text-purple-300 transition-all duration-200 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Character */}
        <div className="relative h-[460px] lg:h-[600px] order-1 lg:order-2">
          <WavingCharacter />
          {/* "Open to work" badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 z-20"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-300 font-mono">Open to opportunities</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-400 transition-colors"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.a>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(20deg); }
          40% { transform: rotate(-15deg); }
          60% { transform: rotate(20deg); }
          80% { transform: rotate(-10deg); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
