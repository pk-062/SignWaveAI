"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  glow = true,
  hoverEffect = true 
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { 
        y: -10, 
        scale: 1.01,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
      } : {}}
      className={cn(
        "relative rounded-[32px] bg-slate-950/40 backdrop-blur-[40px] border border-white/5 overflow-hidden group",
        glow && "shadow-[0_0_80px_-20px_rgba(14,165,233,0.15)]",
        className
      )}
    >
      {/* 1. Ultra-Thin Top Glow */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 2. Radial Hover Spotlight */}
      <div className="absolute inset-0 bg-radial-[circle_at_var(--mouse-x,50%)_var(--mouse-y,50%)] from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* 3. Liquid Border Animation (Subtle) */}
      <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
         <div className="absolute -inset-[100%] animate-[spin_10s_linear_infinite] bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-3xl" />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
