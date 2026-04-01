"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HelpCircle, Plus, Minus, Search } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const faqs = [
  {
    question: "How accurate is the v2.0 translation engine?",
    answer: "Our v2.0 engine, powered by MediaPipe and custom TFLite models, achieves approximately 97-98% accuracy in well-lit environments. We support 50+ common gestures and are continuously expanding our dataset.",
  },
  {
    question: "Does it work in low-light conditions?",
    answer: "While our models are robust, optimal performance is achieved in balanced lighting. Extremely low-light conditions may affect the skeletal tracking precision.",
  },
  {
    question: "Is my camera data private?",
    answer: "Yes. SignWave processes all video frames locally on your device's GPU/CPU. No video data is ever transmitted to or stored on our servers, ensuring total privacy.",
  },
  {
    question: "How do I add new words to the dictionary?",
    answer: "Currently, the dictionary is curated by our team to maintain high accuracy. We are working on a 'Custom Gesture' feature for the Q4 Enterprise release.",
  },
  {
    question: "Can I use SignWave for medical emergencies?",
    answer: "SignWave includes a dedicated Emergency category for medical communication. However, it is intended as a supplemental bridge and should be used alongside certified human interpreters where possible.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <div className="mb-20 text-center">
           <h2 className="text-professional uppercase tracking-[0.3em] text-accent mb-4 underline decoration-accent/20 underline-offset-8">Support</h2>
           <h1 className="text-5xl font-black tracking-tightest mb-6">Common Questions</h1>
           <p className="text-professional max-w-xl mx-auto text-lg leading-relaxed">
             Everything you need to know about the most advanced sign language conversion platform.
           </p>
        </div>

        <div className="space-y-4">
           {faqs.map((faq, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
             >
                <GlassCard 
                  className={`p-0 overflow-hidden border-white/5 transition-all duration-300 ${activeIndex === index ? "bg-slate-900/60" : "bg-slate-900/20 hover:bg-slate-900/40"}`}
                  hoverEffect={false}
                >
                   <button 
                     onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                     className="w-full text-left p-6 flex items-center justify-between gap-4 group"
                   >
                     <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg transition-colors ${activeIndex === index ? "bg-accent text-white" : "bg-white/5 text-accent"}`}>
                           <HelpCircle className="w-5 h-5" />
                        </div>
                        <span className={`text-lg font-bold transition-colors ${activeIndex === index ? "text-accent" : "text-foreground"}`}>{faq.question}</span>
                     </div>
                     <div className={`p-2 rounded-full transition-all duration-500 ${activeIndex === index ? "bg-accent text-white rotate-180" : "bg-white/5 text-foreground/20"}`}>
                        {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                     </div>
                   </button>
                   
                   <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                           <div className="px-6 pb-8 pt-0 ml-14 border-l-2 border-accent/20">
                              <p className="text-[14px] font-medium text-foreground/60 leading-relaxed">
                                 {faq.answer}
                              </p>
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </GlassCard>
             </motion.div>
           ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
