"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Cpu, Activity, Layers } from "lucide-react";
import { GitHubLogo, LinkedInLogo } from "@/components/ui/BrandIcons";
import { GlassCard } from "@/components/ui/GlassCard";

const team = [
  {
    name: "Praveen Kumar R",
    role: "Lead Developer & UI/UX Designer",
    bio: "Led the overall product vision, interface design, and user experience strategy for SignWave AI. Focused on building a futuristic, highly accessible, and responsive platform that feels smooth on both mobile and desktop.",
    skills: ["React", "UI/UX", "System Design"],
    github: "https://github.com/pk-062/Ai-Project.git",
    linkedin: "https://www.linkedin.com/in/pk3568?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: <Cpu className="w-8 h-8 text-primary" />,
  },
  {
    name: "Udhaya S",
    role: "AI / ML Integration",
    bio: "Worked on the intelligence layer of SignWave AI, including sign recognition flow, translation logic, and future-ready AI model integration for seamless communication support.",
    skills: ["AI Models", "Computer Vision", "NLP"],
    github: "https://github.com/Udhaya1309",
    linkedin: "https://www.linkedin.com/in/udhaya-s-65b953356?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: <Activity className="w-8 h-8 text-primary" />,
  },
  {
    name: "Deviprassad S G",
    role: "Backend & Deployment",
    bio: "Managed the backend structure, APIs, deployment flow, and performance optimization to ensure SignWave AI remains scalable, reliable, and easy to maintain.",
    skills: ["Backend", "API", "Deployment"],
    github: "https://github.com/sgdprasaad-crypto",
    linkedin: "https://www.linkedin.com/in/deviprasaad-s-g-441170307/",
    icon: <Layers className="w-8 h-8 text-primary" />,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-40 pb-32 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 underline underline-offset-8 decoration-primary/20">
              Executive Framework
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Engineering The Future Of{" "}
            <span className="text-primary italic">Inclusive Communication</span>.
          </h1>
          <p className="text-sm font-medium text-foreground/40 leading-relaxed max-w-xl mx-auto">
            Meet the three engineers behind SignWave AI — a platform built to break barriers and redefine accessible communication through intelligent technology.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="h-full flex flex-col items-center text-center p-10 glass-card group transition-all duration-500 hover:border-primary/25 hover:bg-slate-900/60 hover:shadow-[0_0_60px_-10px_rgba(14,165,233,0.15)]">
                {/* Avatar Ring */}
                <div className="avatar-ring mb-10 relative">
                  {/* Outer rotating ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-primary/20 group-hover:border-primary/40 transition-all duration-700 animate-[spin_12s_linear_infinite]" style={{ width: "calc(100% + 16px)", height: "calc(100% + 16px)", top: "-8px", left: "-8px" }} />
                  <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]">
                    {member.icon}
                  </div>
                  {/* Pulse dot */}
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background shadow-[0_0_10px_rgba(52,211,153,0.8)]">
                    <div className="w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75" />
                  </div>
                </div>

                {/* Member Index Tag */}
                <div className="mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/15 text-[8px] font-black text-primary uppercase tracking-[0.3em]">
                  Member 0{index + 1}
                </div>

                {/* Name & Role */}
                <h2 className="text-2xl font-black text-foreground tracking-tight mb-2 group-hover:text-primary transition-all duration-300">
                  {member.name}
                </h2>
                <div className="pill-badge mb-6 px-4 text-[10px]">{member.role}</div>

                {/* Bio */}
                <p className="text-[12px] font-medium text-foreground/40 leading-[1.9] max-w-[280px] mb-8">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2 mb-10 min-h-[40px]">
                  {member.skills.map((skill) => (
                    <div key={skill} className="skill-tag">
                      {skill}
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex gap-6 mt-auto pt-6 border-t border-white/5 w-full justify-center">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-foreground/25 hover:text-primary transition-all duration-300 group/link"
                  >
                    <GitHubLogo className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover/link:opacity-100 transition-opacity">GitHub</span>
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-foreground/25 hover:text-primary transition-all duration-300 group/link"
                  >
                    <LinkedInLogo className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover/link:opacity-100 transition-opacity">LinkedIn</span>
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 text-center"
        >
          <div className="inline-block px-8 py-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-foreground/30 mb-2">Our Mission</p>
            <p className="text-lg font-black text-foreground/60 max-w-xl">
              Making communication <span className="text-primary italic">universal</span> through AI-powered sign language translation.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
