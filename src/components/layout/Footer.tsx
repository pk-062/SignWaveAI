"use client";

import React from "react";
import { Waves, Globe, Zap, Type, Mail } from "lucide-react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-background border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Logo & About */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-3 group mb-6">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center p-1.5 group-hover:scale-110 transition-transform">
               <Waves className="w-full h-full text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-foreground">Sign <span className="text-accent underline decoration-accent/20">Wave</span></span>
          </Link>
          <p className="text-[12px] font-medium text-foreground/40 leading-relaxed max-w-[240px]">
            Building the most advanced sign language conversion engine for the future of inclusive communication.
          </p>
        </div>

        {/* Links */}
        <div>
           <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 mb-6 underline decoration-white/10 underline-offset-8">Product</h4>
           <ul className="flex flex-col gap-3">
              <li><FooterLink href="/features">Features</FooterLink></li>
              <li><FooterLink href="/demo">Live Demo</FooterLink></li>
              <li><FooterLink href="/#faq">Common Questions</FooterLink></li>
           </ul>
        </div>

        <div>
           <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 mb-6 underline decoration-white/10 underline-offset-8">Company</h4>
           <ul className="flex flex-col gap-3">
              <li><FooterLink href="/about">Our Team</FooterLink></li>
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
           </ul>
        </div>

        <div>
           <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 mb-6 underline decoration-white/10 underline-offset-8">Get in Touch</h4>
           <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-[12px] text-foreground/40 hover:text-accent transition-colors cursor-pointer">
                 <Mail className="w-3.5 h-3.5" /> contact@signwave.ai
              </li>
              <li className="flex items-center gap-2 text-[12px] text-foreground/40 hover:text-accent transition-colors cursor-pointer">
                 <Globe className="w-3.5 h-3.5" /> Global Accessibility
              </li>
           </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
         <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em]">&copy; 2026 SignWave AI. All rights reserved.</p>
         <div className="flex gap-4">
            <SocialIcon icon={<Zap className="w-4 h-4" />} />
            <SocialIcon icon={<Type className="w-4 h-4" />} />
            <SocialIcon icon={<Globe className="w-4 h-4" />} />
         </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="text-[12px] font-bold text-foreground/60 hover:text-accent transition-colors inline-block tracking-tight">
    {children}
  </Link>
);

const SocialIcon = ({ icon }: { icon: any }) => (
  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-foreground/40 hover:bg-accent hover:text-white transition-all cursor-pointer">
    {icon}
  </div>
);
