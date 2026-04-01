"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the "Liquid" movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Ghost trail for the "Liquid Metal" look
  const trailX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const trailY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);
    
    const handleClick = () => {
      setClickCount(prev => prev + 1);
      setTimeout(() => setClickCount(prev => prev - 1), 1000);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mousedown", handleClick);

    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, [role="button"], .interactive'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    updateInteractiveElements();
    const interval = setInterval(updateInteractiveElements, 2000);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", handleClick);
      clearInterval(interval);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[9999] mix-blend-screen">
      {/* 1. The Liquid Base - High Refraction Blur */}
      <motion.div
        className="fixed h-12 w-12 rounded-full bg-primary/20 blur-xl"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 2.5 : 1.5,
          opacity: 0.5,
        }}
      />

      {/* 2. Neural Nodes - Orbiting satellites */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(14,165,233,0.8)]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            x: [
              Math.cos((i * 120 * Math.PI) / 180) * (isHovering ? 30 : 20),
              Math.cos(((i * 120 + 360) * Math.PI) / 180) * (isHovering ? 30 : 20),
            ],
            y: [
              Math.sin((i * 120 * Math.PI) / 180) * (isHovering ? 30 : 20),
              Math.sin(((i * 120 + 360) * Math.PI) / 180) * (isHovering ? 30 : 20),
            ],
            transition: { repeat: Infinity, duration: 4, ease: "linear" }
          }}
        />
      ))}

      {/* 3. The Liquid Core - SVG Morphing Sphere */}
      <motion.div
        className="fixed overflow-visible"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-80">
          <motion.path
            d="M50 20 Q70 20 80 50 Q70 80 50 80 Q30 80 20 50 Q30 20 50 20"
            fill="rgba(14, 165, 233, 0.6)"
            stroke="rgba(14, 165, 233, 1)"
            strokeWidth="0.5"
            animate={{
              d: isHovering 
                ? "M50 10 Q90 10 90 50 Q90 90 50 90 Q10 90 10 50 Q10 10 50 10" // Square-ish morph
                : "M50 25 Q75 25 75 50 Q75 75 50 75 Q25 75 25 50 Q25 25 50 25", // Circle morph
            }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          />
        </svg>
      </motion.div>

      {/* 4. Connection Lines - Dynamic SVG Grid */}
      <svg className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none">
         <motion.circle
            cx={cursorX}
            cy={cursorY}
            r={isHovering ? 40 : 25}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
         />
      </svg>

      {/* 5. Focal Center - The Sharp Point */}
      <motion.div
        className="fixed h-2 w-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 0.4 : 1,
        }}
      />
      
      {/* Click Ripples */}
      <AnimatePresence>
        {clickCount > 0 && (
          <motion.div
            key="ripple"
            initial={{ scale: 0.1, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed h-10 w-10 border border-primary/40 rounded-full"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
