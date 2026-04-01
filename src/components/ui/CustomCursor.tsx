"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Soft trail for the "Liquid" feel
  const trailX = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 100 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('button, a, input, textarea, .glass-card, [role="button"]');
      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block select-none overflow-hidden">
      {/* 1. Large Fluid Glow - The "Aura" */}
      <motion.div
        style={{
          translateX: trailX,
          translateY: trailY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.25 : 0.1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="absolute w-32 h-32 bg-primary rounded-full blur-[60px]"
      />
      
      {/* 2. Secondary Neural Glow */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        className="absolute w-12 h-12 bg-primary/40 rounded-full blur-2xl"
      />

      {/* 3. The Precision Core - Inner Ring */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          rotate: isHovering ? 45 : 0,
          borderColor: isHovering ? "rgba(14, 165, 233, 1)" : "rgba(14, 165, 233, 0.3)",
        }}
        className="absolute w-6 h-6 border-[0.5px] border-primary/30 rounded-full flex items-center justify-center"
      >
        <motion.div 
           animate={{ scale: isHovering ? 0.2 : 1 }}
           className="w-1 h-1 bg-primary rounded-full shadow-[0_0_12px_2px_rgba(14,165,233,0.6)]" 
        />
      </motion.div>

      {/* 4. Focal Dot - Sharp Point */}
      <motion.div
        style={{
          translateX: mouseX,
          translateY: mouseY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        className="absolute w-1 h-1 bg-white rounded-full mix-blend-difference"
      />
    </div>
  );
};
