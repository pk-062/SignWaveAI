"use client";

import React, { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Globe } from "lucide-react";

export const VoiceToText: React.FC<{ onTextChange: (text: string) => void }> = ({ onTextChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = "en-US";

        recognitionInstance.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join("");
          onTextChange(transcript);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [onTextChange]);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <button
      onClick={toggleListening}
      className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${isListening ? "bg-red-500/10 border-red-500 text-red-500" : "bg-white/5 border-white/10 text-foreground/40 hover:text-accent"}`}
    >
      {isListening ? <Mic className="animate-pulse" /> : <MicOff />}
      <span className="text-[10px] font-bold uppercase tracking-widest">{isListening ? "Listening..." : "Start Mic"}</span>
    </button>
  );
};

export const TextToVoice: React.FC<{ text: string }> = ({ text }) => {
  const speak = () => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={speak}
      disabled={!text}
      className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all disabled:opacity-30"
    >
      <Volume2 className="w-5 h-5" />
    </button>
  );
};
