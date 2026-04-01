"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Cpu, Scan, Volume2, Shield, Activity } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 mesh-gradient">
      <Navbar />
      
      <section className="relative pt-48 pb-32 overflow-hidden flex flex-col items-center">
         {/* Stunning Background Elements */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none brightness-150 contrast-150" />
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               {/* Left: Professional Messaging */}
               <motion.div
                 variants={containerVariants}
                 initial="hidden"
                 animate="visible"
                 className="flex flex-col items-start gap-4"
               >
                  <motion.div variants={itemVariants} className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-max">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-sky" />
                     <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">Intelligence Console v3.1</span>
                  </motion.div>

                  <motion.h1 
                    variants={itemVariants} 
                    className="text-[48px] md:text-[68px] font-black leading-[1.05] tracking-tightest max-w-lg"
                  >
                     Automating <span className="text-outline">Accessibility</span> Through <span className="text-primary italic transition-all hover:contrast-150">Neural</span> Translation.
                  </motion.h1>

                  <motion.p variants={itemVariants} className="max-w-md text-[13px] font-medium text-foreground/40 leading-relaxed tracking-tight">
                     Our enterprise-grade sign language engine leverages high-frequency skeletal tracking 
                     and adaptive neural networks to provide context-aware conversion for 
                     critical communication scenarios.
                  </motion.p>
                  
                  <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-6">
                     <Link href="/demo">
                        <button className="px-7 py-3.5 rounded-full bg-primary text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] transition-all flex items-center gap-2 group border border-primary/20">
                           Initialize Engine <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                     </Link>
                     <Link href="/features">
                        <button className="px-7 py-3.5 rounded-full border border-white/10 hover:bg-white/5 text-foreground/40 font-bold text-[10px] uppercase tracking-[0.2em] transition-all">
                           Framework Docs
                        </button>
                     </Link>
                  </motion.div>
               </motion.div>

               {/* Right: Modern Professional Preview (No I LOVE YOU) */}
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="relative aspect-video rounded-[32px] overflow-hidden glass-card border-white/5 shadow-2xl p-1"
               >
                  <div className="absolute inset-0 bg-slate-900/40 detection-overlay" />
                  
                  <div className="relative h-full border border-white/5 rounded-[28px] overflow-hidden">
                     {/* Data Overlays */}
                     <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                        <div className="flex justify-between items-start">
                           <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.3em]">Neural Scanning</span>
                              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-primary/10 rounded-lg border border-primary/20 text-primary font-black text-[9px] uppercase tracking-[0.1em]">
                                 SYNC_STATUS • ACTIVE
                              </div>
                           </div>
                           <div className="flex flex-col gap-1 items-end">
                               <div className="text-[9px] font-mono text-foreground/20 tracking-widest uppercase">Latency: 0.04ms</div>
                               <div className="flex gap-1">
                                  {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i < 4 ? "bg-primary" : "bg-white/10"}`} />)}
                               </div>
                           </div>
                        </div>

                        <div className="flex flex-col items-end gap-2.5">
                           <div className="px-4 py-2 bg-slate-950/80 border border-white/5 rounded-xl text-[11px] font-black text-primary tracking-[0.15em] shadow-xl">ASSISTANCE_REQUESTED</div>
                           <div className="px-4 py-2 bg-slate-950/80 border border-white/5 rounded-xl text-[9px] font-bold text-foreground/30 uppercase tracking-[0.2em]">Confidence: 99.4%</div>
                           <div className="px-4 py-2 bg-primary/20 border border-primary/20 backdrop-blur-md rounded-xl text-[9px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2 pulse-sky">
                              <Activity className="w-3 h-3" /> System Tracking
                           </div>
                        </div>
                     </div>

                     {/* Visual Metaphor */}
                     <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                        <div className="w-[80%] h-[80%] border-2 border-primary/10 rounded-full flex items-center justify-center">
                           <div className="w-[60%] h-[60%] border-2 border-primary/10 rounded-full flex items-center justify-center">
                              <Scan className="w-12 h-12 text-primary" />
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>

            {/* Micro Stats - Small & Professional */}
            <div className="mt-40 pt-10 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-12 opacity-60">
               <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                     <Cpu className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest">Architecture</span>
                     <span className="text-[11px] font-black uppercase tracking-tight">Neural Engine 3.1</span>
                  </div>
               </div>
               <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                     <Volume2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest">Conversion</span>
                     <span className="text-[11px] font-black uppercase tracking-tight">Latency &lt; 1ms</span>
                  </div>
               </div>
               <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                     <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest">Compliance</span>
                     <span className="text-[11px] font-black uppercase tracking-tight">SOC2 • Privacy </span>
                  </div>
               </div>
               <div className="flex items-center gap-4 justify-end">
                  <div className="flex flex-col items-end">
                     <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest">Global Node Status</span>
                     <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-black uppercase tracking-tight">Operational</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
