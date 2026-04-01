"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TranslationEngine } from "@/components/demo/TranslationEngine";
import { VoiceToText, TextToVoice } from "@/components/demo/SpeechUtils";
import { 
  Camera, 
  Square, 
  RefreshCcw, 
  Terminal, 
  Cpu, 
  Waves,
  History,
  Trash2,
  Activity,
  MessageSquare,
  Type
} from "lucide-react";

interface HistoryItem {
  id: string;
  word: string;
  time: string;
}

export default function DemoPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedWord, setDetectedWord] = useState("");
  const [currentSentence, setCurrentSentence] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [inputText, setInputText] = useState("");

  const handleDetection = useCallback((word: string, conf: number) => {
    setDetectedWord(word);
    setConfidence(conf);
    
    // 1. Autonomous Audio Synthesis
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 1.1; // Slightly faster for professional feel
      utterance.pitch = 1;
      window.speechSynthesis.cancel(); // Interrupt current speech
      window.speechSynthesis.speak(utterance);
    }

    // 2. Add to Sentence Builder
    setCurrentSentence(prev => {
      const lastWord = prev[prev.length - 1];
      if (lastWord !== word) {
        return [...prev, word].slice(-8); // Keep last 8 words
      }
      return prev;
    });

    // 3. Add to unique history log
    setHistory(prev => {
      const newItem = { 
        id: Math.random().toString(36).substr(2, 9) + Date.now(), 
        word, 
        time: new Date().toLocaleTimeString() 
      };
      
      if (prev.length === 0 || prev[0].word !== word) {
        return [newItem, ...prev].slice(0, 50);
      }
      return prev;
    });
  }, []);

  const clearHistory = () => {
    setHistory([]);
    setCurrentSentence([]);
    setDetectedWord("");
  };

  const clearSentence = () => {
    setCurrentSentence([]);
    setDetectedWord("");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-12 flex justify-between items-end">
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Terminal className="w-4 h-4" />
                 </div>
                 <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">Neural Terminal v3.2</span>
              </div>
              <h1 className="text-3xl font-black tracking-tightest mb-4">Intelligence <span className="text-outline">Console</span></h1>
              <p className="text-[12px] font-medium text-foreground/40 max-w-xl leading-relaxed">
                Experience high-frequency sign-to-sentence translation with 99.4% confidence. 
                Our neural framework converts complex skeletal data into professional linguistic output.
              </p>
           </div>
           
           <div className="flex gap-3">
              <div className="hidden lg:flex flex-col items-end">
                 <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.2em]">Framework State</span>
                 <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-primary animate-pulse" : "bg-white/10"}`} />
                    <span className="text-[11px] font-black uppercase">{isRecording ? "Online & Synchronizing" : "System Standby"}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Left: AI/Camera Feed */}
           <div className="lg:col-span-8 space-y-6">
              <div className="relative aspect-video rounded-[32px] overflow-hidden glass-card p-1 shadow-2xl">
                 <div className="relative h-full w-full rounded-[28px] overflow-hidden">
                    <TranslationEngine 
                      isRecording={isRecording} 
                      onDetection={handleDetection}
                    />
                    
                    {/* Overlay Controls */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4">
                       {!isRecording ? (
                          <button 
                            onClick={() => setIsRecording(true)}
                            className="px-10 py-4 rounded-full bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(14,165,233,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                          >
                             <Camera className="w-4 h-4" /> Initialize Engine
                          </button>
                       ) : (
                          <button 
                            onClick={() => setIsRecording(false)}
                            className="px-10 py-4 rounded-full bg-red-500 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                          >
                             <Square className="w-4 h-4" /> Shutdown Core
                          </button>
                       )}
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute top-6 right-6 z-30 flex flex-col gap-3">
                       <div className="px-4 py-2 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/5">
                          <span className="text-[8px] font-black text-foreground/30 block pb-1 tracking-[0.1em]">CONFIDENCE</span>
                          <span className="text-primary font-black text-[12px]">{Math.round(confidence * 100)}%</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Real-time Sentence Builder Banner */}
              <div className="w-full h-32 bg-primary/5 border border-primary/20 rounded-[32px] flex items-center justify-between px-10 glass-card">
                 <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-2">
                       <MessageSquare className="w-3 h-3 text-primary" />
                       <span className="text-[9px] font-bold text-primary uppercase tracking-[0.3em]">Linguistic Output Buffer</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {currentSentence.length > 0 ? (
                         currentSentence.map((word, i) => (
                           <motion.span 
                             key={`${word}-${i}`} 
                             initial={{ opacity: 0, x: -5 }}
                             animate={{ opacity: 1, x: 0 }}
                             className="text-2xl font-black tracking-tight"
                           >
                             {word}{i === currentSentence.length - 1 ? "" : " "}
                           </motion.span>
                         ))
                       ) : (
                         <span className="text-xl font-bold text-foreground/10 uppercase tracking-widest italic">Awaiting neural input...</span>
                       )}
                    </div>
                 </div>
                 <div className="flex gap-4 items-center">
                    <TextToVoice text={currentSentence.join(" ")} />
                    <button 
                      onClick={clearSentence} 
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-foreground/20 hover:text-primary transition-all hover:bg-white/10"
                    >
                       <RefreshCcw className="w-5 h-5" />
                    </button>
                 </div>
              </div>
           </div>

           {/* Right: Sidebar Utilities */}
           <div className="lg:col-span-4 space-y-6">
              {/* History Panel */}
              <div className="glass-card rounded-[32px] p-8 h-[450px] flex flex-col border-white/5">
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                       <History className="w-4 h-4 text-primary" />
                       <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/40">Translation Log</span>
                    </div>
                    <button onClick={clearHistory} className="text-foreground/10 hover:text-red-500 transition-colors">
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-2">
                    <AnimatePresence>
                       {history.length > 0 ? history.map((item) => (
                         <motion.div 
                           key={item.id}
                           initial={{ opacity: 0, x: -5 }}
                           animate={{ opacity: 1, x: 0 }}
                           className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-primary/20 transition-all duration-500"
                         >
                            <span className="text-[11px] font-black text-foreground/60 group-hover:text-primary transition-colors uppercase tracking-tight">{item.word}</span>
                            <span className="text-[9px] font-mono text-foreground/10 font-bold">{item.time}</span>
                         </motion.div>
                       )) : (
                         <div className="h-full flex flex-col items-center justify-center opacity-10 text-center">
                            <Activity className="w-10 h-10 mb-4 animate-pulse" />
                            <p className="text-[9px] font-black uppercase tracking-[0.4em]">Log Empty</p>
                         </div>
                       )}
                    </AnimatePresence>
                 </div>
              </div>

              {/* Tools Panel */}
              <div className="glass-card rounded-[32px] p-8 space-y-8 border-white/5">
                 <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/40">Transcription Core</span>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <label className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest pl-1">Speech Transcription</label>
                       <VoiceToText onTextChange={(text) => setInputText(text)} />
                    </div>
                    
                    <div className="space-y-3 text-right">
                       <label className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest pr-1">Text-to-Linguistic Synthesis</label>
                       <div className="relative group">
                          <input 
                            type="text" 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Input framework query..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-semibold focus:border-primary outline-none transition-all pr-14 placeholder:text-foreground/10 placeholder:uppercase placeholder:text-[9px] placeholder:tracking-widest"
                          />
                          <div className="absolute right-2 top-1.5 pt-0.5 scale-75">
                             <TextToVoice text={inputText} />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
