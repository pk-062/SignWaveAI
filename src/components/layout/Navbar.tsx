"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { SignWaveLogo } from "@/components/ui/BrandIcons";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/#features" },
  { name: "Capabilities", href: "/features" },
  { name: "Terminal", href: "/demo" },
  { name: "About", href: "/about" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-2xl border-b border-white/5 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80 group">
          <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center p-1.5 transition-all group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]">
             <SignWaveLogo className="w-full h-full text-primary" />
          </div>
          <span className="text-lg font-black tracking-tighter text-foreground uppercase opacity-80">Sign<span className="text-primary italic">Wave</span></span>
        </Link>

        {/* Desktop Navigation (Center) - Compact & Professional */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${pathname === link.href ? "text-primary" : "text-foreground/30 hover:text-foreground hover:tracking-[0.3em]"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions (Right) */}
        <div className="hidden md:flex items-center gap-4">
           <Link href="/demo">
              <button className="px-5 py-2 rounded-full border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all">
                 Initialize Terminal
              </button>
           </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-foreground/40 hover:text-primary transition-colors"
        >
           {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Down Accordion Mobile Menu */}
      <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: "auto", opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
             className="absolute top-full left-0 w-full bg-background border-b border-white/5 md:hidden overflow-hidden"
           >
              <div className="flex flex-col p-8 gap-8">
                 {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-xs font-bold uppercase tracking-[0.4em] text-foreground/30 hover:text-primary transition-all flex justify-between items-center group"
                    >
                       {link.name}
                       <ChevronDown className="w-3 h-3 -rotate-90 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                 ))}
                 
                 <div className="pt-8 border-t border-white/5 flex flex-col gap-4">

                    <Link href="/demo" onClick={() => setIsOpen(false)}>
                       <button className="w-full py-4 rounded-xl bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] transition-all">
                          Start Translating
                       </button>
                    </Link>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </nav>
  );
};
