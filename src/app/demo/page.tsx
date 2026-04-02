"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TranslationEngine } from "@/components/demo/TranslationEngine";
import { 
  Camera, 
  Square, 
  Terminal, 
  Cpu, 
  Trash2,
  Activity,
  ChevronRight,
  ShieldCheck,
  Zap,
  Maximize2,
  Minimize2,
  Settings,
  LayoutGrid
} from "lucide-react";

interface ConsoleEntry {
  id: string;
  word: string;
  confidence: number;
  timestamp: string;
}

export default function DemoPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [translationMode, setTranslationMode] = useState<"alphabet" | "phrases">("alphabet");
  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([]);
  const [confidence, setConfidence] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleDetection = useCallback((word: string, conf: number) => {
    setConfidence(conf);
    
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 1.1; 
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }

    setConsoleLogs(prev => {
      const lastEntry = prev[prev.length - 1];
      if (lastEntry?.word === word) return prev;
      
      const newEntry = {
        id: Math.random().toString(36).substr(2, 9),
        word,
        confidence: conf,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      return [...prev, newEntry].slice(-20); // Keep it small and concise
    });
  }, [mounted]);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  if (!mounted) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
       <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className={`min-h-screen bg-background selection:bg-primary/20 ${isFullscreen ? "overflow-hidden" : "overflow-x-hidden"}`}>
      {!isFullscreen && <Navbar />}
      
      <div className={`${isFullscreen ? "p-0" : "pt-32 pb-20 max-w-[1200px] mx-auto px-4 md:px-8"}`}>
        
        {/* Header - Hidden in Fullscreen */}
        {!isFullscreen && (
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-5">
               <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl">
                  <Terminal className="w-6 h-6 text-primary" />
               </div>
               <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">ASL Standard v6.0</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black tracking-tightest">
                    Operational <span className="text-primary italic">Terminal</span>
                  </h1>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                  <Zap className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Neural Link Active</span>
               </div>
               <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Auth Verified</span>
               </div>
            </div>
          </header>
        )}

        {/* PERFECT ALIGNMENT ENGINE STACK */}
        <div className={`flex flex-col gap-8 transition-all duration-700 ${isFullscreen ? "h-screen bg-black" : ""}`}>
          
          {/* VISION CORE (Main Monitor) */}
          <section className={`relative transition-all duration-700 ${isFullscreen ? "flex-1 rounded-none shadow-none" : "h-[450px] md:h-[650px] rounded-[45px] shadow-3xl border border-white/5 group"} overflow-hidden bg-slate-950`}>
             <TranslationEngine 
               isRecording={isRecording} 
               onDetection={handleDetection}
               mode={translationMode}
               isFullscreen={isFullscreen}
             />
             
             {/* Controls Overlay */}
             <div className="absolute top-8 left-8 right-8 flex items-start justify-between z-30 pointer-events-none">
                <div className="flex flex-col gap-4 pointer-events-auto">
                   <div className="flex p-1 bg-black/40 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl">
                      <button 
                        onClick={() => setTranslationMode("alphabet")}
                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${translationMode === "alphabet" ? "bg-primary text-white shadow-lg" : "text-foreground/40 hover:text-foreground/60"}`}
                      >
                        A-Z Manual
                      </button>
                      <button 
                        onClick={() => setTranslationMode("phrases")}
                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${translationMode === "phrases" ? "bg-primary text-white shadow-lg" : "text-foreground/40 hover:text-foreground/60"}`}
                      >
                        ASL Lexicon
                      </button>
                   </div>
                </div>
                
                <button 
                  onClick={toggleFullscreen}
                  className="p-4 bg-black/40 backdrop-blur-3xl rounded-2xl border border-white/10 text-primary pointer-events-auto hover:bg-primary hover:text-white transition-all shadow-2xl group/fs"
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5 group-hover/fs:scale-110 transition-transform" />}
                </button>
             </div>

             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
                <AnimatePresence mode="wait">
                  {!isRecording ? (
                    <motion.button 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      onClick={() => setIsRecording(true)}
                      className="px-12 py-5 rounded-[28px] bg-primary text-white font-black text-[12px] uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(14,165,233,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group/btn"
                    >
                       <Camera className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" /> Start Operational Link
                    </motion.button>
                  ) : (
                    <motion.button 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      onClick={() => setIsRecording(false)}
                      className="px-12 py-5 rounded-[28px] bg-red-600 text-white font-black text-[12px] uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group/stop"
                    >
                       <Square className="w-5 h-5 fill-white group-stop:animate-pulse" /> Shutdown Vision
                    </motion.button>
                  )}
                </AnimatePresence>
             </div>

             {/* Diagnostics Ghost Overlay */}
             <div className="absolute right-8 bottom-10 z-30 hidden md:block">
                <div className="px-6 py-4 bg-black/40 backdrop-blur-3xl rounded-[30px] border border-white/5 flex flex-col items-end shadow-2xl">
                   <div className="flex items-center gap-4">
                      <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           className="h-full bg-primary"
                           animate={{ width: `${Math.round(confidence * 100)}%` }}
                         />
                      </div>
                      <span className="text-primary font-black text-xl tracking-tighter tabular-nums">{Math.round(confidence * 100)}%</span>
                   </div>
                   <span className="text-[8px] font-black text-foreground/20 uppercase tracking-[0.3em] mt-2">Neural Sensitivity Alpha</span>
                </div>
             </div>
          </section>

          {/* NEURAL CONSOLE (Small Solid Block Below) */}
          <section className={`transition-all duration-700 ${isFullscreen ? "bg-[#050505] border-t border-white/5 h-[200px]" : "bg-slate-900/40 backdrop-blur-3xl rounded-[40px] border border-white/10 h-[220px] shadow-2xl"} p-8 overflow-hidden flex flex-col group relative`}>
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu className="w-20 h-20" />
             </div>
             
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(14,165,233,1)]" />
                   <h3 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/40">Real-time <span className="text-primary">ASL Console</span></h3>
                </div>
                <button 
                  onClick={() => setConsoleLogs([])}
                  className="p-2 bg-white/5 rounded-xl border border-white/10 text-foreground/20 hover:text-red-500 hover:border-red-500/20 transition-all transition-transform active:scale-90"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
             </div>

             <div className="flex-1 overflow-y-auto no-scrollbar font-mono space-y-3 relative z-10">
                {consoleLogs.length > 0 ? consoleLogs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 group/line hover:bg-white/5 p-1 rounded-lg transition-colors"
                  >
                     <span className="text-[10px] font-bold text-foreground/10 tabular-nums">[{log.timestamp}]</span>
                     <ChevronRight className="w-3 h-3 text-primary/40 group-hover/line:text-primary transition-colors" />
                     <span className="text-lg font-black text-white tracking-widest uppercase transition-colors group-hover/line:text-primary">
                        {log.word}
                     </span>
                     <span className="ml-auto text-[8px] font-black text-foreground/10 group-hover/line:text-primary/20 transition-all">
                        {Math.round(log.confidence * 100)}% PRECISION_SENS
                     </span>
                  </motion.div>
                )) : (
                  <div className="h-full flex items-center justify-center gap-3 opacity-10">
                     <Activity className="w-6 h-6 animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-[0.5em]">System Monitoring ASL link...</span>
                  </div>
                )}
             </div>

             <div className="absolute bottom-4 right-8 text-[9px] font-black text-foreground/5 uppercase tracking-[1em]">
                SignWave Terminal
             </div>
          </section>
        </div>
      </div>

      {!isFullscreen && <Footer />}
    </main>
  );
}
