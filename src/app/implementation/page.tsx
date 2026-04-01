"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Save, 
  Plus, 
  Terminal, 
  User, 
  FileText, 
  Settings2,
  CheckCircle2
} from "lucide-react";
import { GitHubLogo, LinkedInLogo } from "@/components/ui/BrandIcons";
import { GlassCard } from "@/components/ui/GlassCard";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  github: string;
  linkedin: string;
  image: string;
}

export default function ImplementationPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    { name: "", role: "", bio: "", skills: [], github: "", linkedin: "", image: "" },
    { name: "", role: "", bio: "", skills: [], github: "", linkedin: "", image: "" },
    { name: "", role: "", bio: "", skills: [], github: "", linkedin: "", image: "" },
  ]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("signwave_team_data");
    if (savedData) {
      try {
        setMembers(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load team data", e);
      }
    }
  }, []);

  const handleChange = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...members];
    if (field === "skills") {
      newMembers[index][field] = value.split(",").map(s => s.trim());
    } else {
      (newMembers[index] as any)[field] = value;
    }
    setMembers(newMembers);
    setSaved(false);
  };

  const saveToDisk = () => {
    localStorage.setItem("signwave_team_data", JSON.stringify(members));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-40 pb-32 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
           <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                 <Settings2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Deployment Console v3.1</span>
           </div>
           <h1 className="text-4xl font-black tracking-tightest mb-4">Team Implementation</h1>
           <p className="text-[13px] font-medium text-foreground/40 max-w-xl">
             Configure the executive framework for the SignWave platform. Enter details for three primary framework members. Data persists locally across sessions.
           </p>
        </div>

        {/* Member Configuration Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {members.map((member, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
             >
                <GlassCard className="h-full p-8 space-y-6 glass-card border-white/5">
                   <div className="flex items-center gap-3 pb-6 border-b border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                         0{index + 1}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Member Details</span>
                   </div>

                   {/* Inputs */}
                   <div className="space-y-4">
                      <InputField 
                        icon={<User />} 
                        label="Full Name" 
                        value={member.name} 
                        onChange={(val: string) => handleChange(index, "name", val)} 
                        placeholder="e.g. Jesho J Upalt"
                      />
                      <InputField 
                        icon={<Terminal />} 
                        label="Role / Designation" 
                        value={member.role} 
                        onChange={(val: string) => handleChange(index, "role", val)} 
                        placeholder="e.g. Lead Developer"
                      />
                      <InputField 
                        icon={<LinkedInLogo />} 
                        label="LinkedIn URL" 
                        value={member.linkedin} 
                        onChange={(val: string) => handleChange(index, "linkedin", val)} 
                        placeholder="https://..."
                      />
                      <InputField 
                        icon={<GitHubLogo />} 
                        label="GitHub URL" 
                        value={member.github} 
                        onChange={(val: string) => handleChange(index, "github", val)} 
                        placeholder="https://..."
                      />
                      <InputField 
                        icon={<Plus />} 
                        label="Photo URL (Optional)" 
                        value={member.image} 
                        onChange={(val: string) => handleChange(index, "image", val)} 
                        placeholder="https://i.pravatar.cc/150..."
                      />
                      <div className="space-y-1.5 pt-2">
                         <label className="text-[9px] font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                            <FileText className="w-3 h-3" /> Brief Description
                         </label>
                         <textarea 
                           value={member.bio}
                           onChange={(e) => handleChange(index, "bio", e.target.value)}
                           className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-primary outline-none transition-all h-24 no-scrollbar resize-none font-medium text-foreground/60"
                           placeholder="Describe the member's contribution and vision..."
                         />
                      </div>
                      <InputField 
                        icon={<Plus />} 
                        label="Skills (comma separated)" 
                        value={member.skills.join(", ")} 
                        onChange={(val: string) => handleChange(index, "skills", val)} 
                        placeholder="React, AI, ML..."
                      />
                   </div>
                </GlassCard>
             </motion.div>
           ))}
        </div>

        {/* Action Bottom */}
        <div className="mt-12 flex justify-end">
           <button 
             onClick={saveToDisk}
             disabled={saved}
             className={`px-10 py-5 rounded-2xl flex items-center gap-3 transition-all duration-500 shadow-2xl ${saved ? "bg-emerald-500 text-white" : "bg-primary text-white hover:contrast-125 scale-100 hover:scale-105 active:scale-95"}`}
           >
              {saved ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Deployment Successful</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Persist Implementation</span>
                </>
              )}
           </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}

const InputField = ({ icon, label, value, onChange, placeholder }: any) => (
  <div className="space-y-1.5 flex-1">
     <label className="text-[9px] font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
        {React.cloneElement(icon, { className: "w-3 h-3" })} {label}
     </label>
     <input 
       type="text" 
       value={value}
       onChange={(e) => onChange(e.target.value)}
       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-primary outline-none transition-all font-medium text-foreground/60"
       placeholder={placeholder}
     />
  </div>
);
