"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Zap, 
  Eye, 
  Volume2, 
  MessageSquare, 
  History, 
  Shield, 
  Globe, 
  Cpu 
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const featureList = [
  {
    title: "Real-Time Detection",
    description: "Sub-millisecond latency for instant gesture-to-text conversion using edge computing.",
    icon: Zap,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Skeletal Tracking",
    description: "Multi-hand landmark detection powered by MediaPipe for high-precision accuracy.",
    icon: Eye,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Bilingual Output",
    description: "Simultaneous text and voice generation for inclusive multi-modal communication.",
    icon: Volume2,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Expansive Dictionary",
    description: "Built-in support for 50+ common signs covering daily use and emergency scenarios.",
    icon: MessageSquare,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Translation History",
    description: "Persistent logs of your conversations with easy export and analysis capabilities.",
    icon: History,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Privacy First",
    description: "Your camera and audio data are processed locally on your device and never stored on servers.",
    icon: Shield,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Global Reach",
    description: "Optimized for diverse lighting conditions and backgrounds for reliability anyway.",
    icon: Globe,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "AI Optimization",
    description: "Custom-trained lightweight models that run smoothly even on mobile devices.",
    icon: Cpu,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
           <h2 className="text-professional uppercase tracking-[0.3em] text-accent mb-4 underline decoration-accent/20 underline-offset-8">Our Core</h2>
           <h1 className="text-5xl font-black tracking-tightest mb-6">Advanced Capabilities</h1>
           <p className="text-professional max-w-2xl mx-auto text-lg">
             Explore the cutting-edge technology that makes SignWave v2.0 the most powerful 
             accessibility bridge for the deaf and hard-of-hearing community.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {featureList.map((feature, index) => (
             <motion.div
               key={feature.title}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.05 }}
             >
                <GlassCard className="h-full border-white/5 bg-slate-900/40 hover:bg-slate-900/60 p-8 flex flex-col group transition-all duration-500 interactive-card">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${feature.bg} ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-accent transition-colors">{feature.title}</h3>
                   <p className="text-[12px] font-medium text-foreground/40 leading-relaxed tracking-tight">
                      {feature.description}
                   </p>
                </GlassCard>
             </motion.div>
           ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
