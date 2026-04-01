"use client";

import React, { useRef, useEffect, useState } from "react";

interface TranslationEngineProps {
  onDetection: (word: string, confidence: number) => void;
  isRecording: boolean;
}

// 36+ Deterministic Words (9 Zones x 4 Hand States)
const GESTURE_MAP: Record<string, string> = {
  // Zone 0 (Top Row): Greetings & Helping
  "0,0,Open": "HELLO", "0,0,Fist": "WELCOME", "0,0,Point": "GOOD MORNING", "0,0,Peace": "GOOD EVENING",
  "0,1,Open": "PLEASE", "0,1,Fist": "THANK YOU", "0,1,Point": "MY NAME IS", "0,1,Peace": "NICE TO MEET YOU",
  "0,2,Open": "ASSIST", "0,2,Fist": "UNDERSTAND", "0,2,Point": "HELP ME", "0,2,Peace": "QUESTION",

  // Zone 1 (Middle Row): Emergency & Essentials
  "1,0,Open": "EMERGENCY", "1,0,Fist": "DANGER", "1,0,Point": "CAUTION", "1,0,Peace": "SAFE",
  "1,1,Open": "HELP", "1,1,Fist": "DOCTOR", "1,1,Point": "POLICE", "1,1,Peace": "HOSPITAL",
  "1,2,Open": "NEED", "1,2,Fist": "WATER", "1,2,Point": "FOOD", "1,2,Peace": "MEDICINE",

  // Zone 2 (Bottom Row): Day-to-Day & Navigation
  "2,0,Open": "WHERE", "2,0,Fist": "WHEN", "2,0,Point": "WHY", "2,0,Peace": "HOW",
  "2,1,Open": "YES", "2,1,Fist": "NO", "2,1,Point": "MAYBE", "2,1,Peace": "SORRY",
  "2,2,Open": "FINISH", "2,2,Fist": "AGAIN", "2,2,Point": "WAIT", "2,2,Peace": "GOODBYE",
};

export const TranslationEngine: React.FC<TranslationEngineProps> = ({ onDetection, isRecording }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectionCooldown = useRef<number>(0);
  const isCleaningUp = useRef<boolean>(false);
  const stabilityCounter = useRef<number>(0);
  const lastPotentialKey = useRef<string>("");

  useEffect(() => {
    let camera: any = null;
    let handsInstance: any = null;
    isCleaningUp.current = false;

    const initMediaPipe = async () => {
      try {
        const hands = await import("@mediapipe/hands");
        const cam = await import("@mediapipe/camera_utils");
        const draw = await import("@mediapipe/drawing_utils");

        if (!videoRef.current || !canvasRef.current || isCleaningUp.current) return;

        handsInstance = new hands.Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        handsInstance.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.6,
        });

        handsInstance.onResults((results: any) => {
          if (isCleaningUp.current || !canvasRef.current || !videoRef.current) return;
          const canvasCtx = canvasRef.current.getContext("2d");
          if (!canvasCtx) return;

          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];

            // 1. Draw Mesh and Skeleton
            draw.drawConnectors(canvasCtx, landmarks, hands.HAND_CONNECTIONS, { color: "#0EA5E9", lineWidth: 2 });
            draw.drawLandmarks(canvasCtx, landmarks, { color: "#F8FAFC", lineWidth: 1, radius: 2 });

            // 2. Identify Zone (3x3 Grid)
            const wrist = landmarks[0];
            const zoneX = wrist.x < 0.33 ? 0 : wrist.x < 0.66 ? 1 : 2;
            const zoneY = wrist.y < 0.33 ? 0 : wrist.y < 0.66 ? 1 : 2;

            // 3. Identify Gesture State (Heuristic)
            // Distances from palm base (0) to tips (4, 8, 12, 16, 20)
            const getDist = (a: any, b: any) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
            
            const isThumbUp = landmarks[4].y < landmarks[3].y;
            const isIndexUp = landmarks[8].y < landmarks[6].y;
            const isMiddleUp = landmarks[12].y < landmarks[10].y;
            const isRingUp = landmarks[16].y < landmarks[14].y;
            const isPinkyUp = landmarks[20].y < landmarks[18].y;

            let state = "Closed";
            const upCount = [isIndexUp, isMiddleUp, isRingUp, isPinkyUp].filter(Boolean).length;

            if (upCount >= 3) state = "Open";
            else if (isIndexUp && isMiddleUp && upCount === 2) state = "Peace";
            else if (isIndexUp && upCount === 1) state = "Point";
            else state = "Fist";

            // 4. Mapping & Stability
            const currentKey = `${zoneY},${zoneX},${state}`;
            
            if (currentKey === lastPotentialKey.current) {
               stabilityCounter.current++;
               if (stabilityCounter.current > 12) { // Stable for ~0.4s
                  const now = Date.now();
                  if (now > detectionCooldown.current) {
                     const word = GESTURE_MAP[currentKey];
                     if (word) {
                        onDetection(word, 0.98);
                        detectionCooldown.current = now + 2500; // Cooldown between different words
                        stabilityCounter.current = 0;
                     }
                  }
               }
            } else {
               lastPotentialKey.current = currentKey;
               stabilityCounter.current = 0;
            }

            // Visual Zone Indicator - High-Tech Overlay
            canvasCtx.strokeStyle = "rgba(14, 165, 233, 0.1)";
            canvasCtx.lineWidth = 0.5;
            canvasCtx.beginPath();
            // Vertical Lines
            canvasCtx.moveTo(canvasRef.current.width * 0.33, 0); canvasCtx.lineTo(canvasRef.current.width * 0.33, canvasRef.current.height);
            canvasCtx.moveTo(canvasRef.current.width * 0.66, 0); canvasCtx.lineTo(canvasRef.current.width * 0.66, canvasRef.current.height);
            // Horizontal Lines
            canvasCtx.moveTo(0, canvasRef.current.height * 0.33); canvasCtx.lineTo(canvasRef.current.width, canvasRef.current.height * 0.33);
            canvasCtx.moveTo(0, canvasRef.current.height * 0.66); canvasCtx.lineTo(canvasRef.current.width, canvasRef.current.height * 0.66);
            canvasCtx.stroke();
          }
          canvasCtx.restore();
        });

        camera = new cam.Camera(videoRef.current, {
          onFrame: async () => {
             if (!isCleaningUp.current && handsInstance && videoRef.current) {
                try {
                  await handsInstance.send({ image: videoRef.current });
                } catch (e) {}
             }
          },
          width: 1280, height: 720,
        });

        await camera.start();
        if (!isCleaningUp.current) setIsLoaded(true);
      } catch (err) {
        if (!isCleaningUp.current) setError("Failed to initialize AI engine.");
      }
    };

    if (isRecording) initMediaPipe();

    return () => {
      isCleaningUp.current = true;
      if (camera) camera.stop();
      if (handsInstance) handsInstance.close();
      setIsLoaded(false);
    };
  }, [isRecording, onDetection]);

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-[28px] overflow-hidden border border-white/5 shadow-2xl">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale contrast-125" playsInline muted />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-10" width={1280} height={720} />
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-30 p-6 text-center">
          <p className="text-red-400 font-black text-[10px] uppercase tracking-widest leading-loose">{error}</p>
        </div>
      )}

      {!isLoaded && isRecording && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-20">
           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-[1.5px] border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-[9px] font-black text-primary uppercase tracking-[0.5em] animate-pulse">Synchronizing Neural Interface...</span>
           </div>
        </div>
      )}
    </div>
  );
};
