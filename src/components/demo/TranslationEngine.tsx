"use client";

import React, { useRef, useEffect, useState } from "react";

interface TranslationEngineProps {
  onDetection: (word: string, confidence: number) => void;
  isRecording: boolean;
  mode: "alphabet" | "phrases";
  isFullscreen?: boolean;
}

export const TranslationEngine: React.FC<TranslationEngineProps> = ({ onDetection, isRecording, mode, isFullscreen }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHandActive, setIsHandActive] = useState(false);

  const detectionCooldown = useRef<number>(0);
  const isCleaningUp = useRef<boolean>(false);
  const historyBuffer = useRef<string[]>([]); 
  
  // Motion Vector Buffers (last 15 frames)
  const indexTipHistory = useRef<{x: number, y: number}[]>([]);
  const pinkyTipHistory = useRef<{x: number, y: number}[]>([]);

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
          modelComplexity: 1, // Fast processing
          minDetectionConfidence: 0.70, // Relaxed bounding box for speed
          minTrackingConfidence: 0.70,
        });

        handsInstance.onResults((results: any) => {
          if (isCleaningUp.current || !canvasRef.current || !videoRef.current) return;
          const canvasCtx = canvasRef.current.getContext("2d");
          if (!canvasCtx) return;

          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            if (!isHandActive) setIsHandActive(true);
            const landmarks = results.multiHandLandmarks[0];

            // Minimal Drawing for Performance
            draw.drawConnectors(canvasCtx, landmarks, hands.HAND_CONNECTIONS, { color: "rgba(14, 165, 233, 0.4)", lineWidth: 2 });
            draw.drawLandmarks(canvasCtx, landmarks, { color: "rgba(248, 250, 252, 0.6)", lineWidth: 1, radius: 2 });

            const wrist = landmarks[0];
            const getXDist = (a: any, b: any) => Math.abs(a.x - b.x);
            const getYDist = (a: any, b: any) => Math.abs(a.y - b.y);
            const getDist = (a: any, b: any) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

            // Finger Tips and PIPs
            const thumbTip = landmarks[4];
            const indexTip = landmarks[8];
            const middleTip = landmarks[12];
            const ringTip = landmarks[16];
            const pinkyTip = landmarks[20];

            // Motion Vector Updates
            indexTipHistory.current.push({ x: indexTip.x, y: indexTip.y });
            pinkyTipHistory.current.push({ x: pinkyTip.x, y: pinkyTip.y });
            if (indexTipHistory.current.length > 15) indexTipHistory.current.shift();
            if (pinkyTipHistory.current.length > 15) pinkyTipHistory.current.shift();

            // True 3D Finger Math (Up vs Folded)
            const isThumbOut = getXDist(thumbTip, landmarks[5]) > 0.08;
            const isThumbCrossed = thumbTip.x > landmarks[9].x && thumbTip.x < landmarks[17].x; // Right hand logic simplified
            
            const iUp = indexTip.y < landmarks[6].y && indexTip.y < landmarks[5].y;
            const mUp = middleTip.y < landmarks[10].y && middleTip.y < landmarks[9].y;
            const rUp = ringTip.y < landmarks[14].y && ringTip.y < landmarks[13].y;
            const pUp = pinkyTip.y < landmarks[18].y && pinkyTip.y < landmarks[17].y;
            const isClosedFist = !iUp && !mUp && !rUp && !pUp;
            const isOpenHand = iUp && mUp && rUp && pUp;

            // Distances for complex signs
            const thumbToIndex = getDist(thumbTip, indexTip);
            const thumbToMiddle = getDist(thumbTip, middleTip);
            const indexToMiddle = getDist(indexTip, middleTip);

            let detectedSign = "";

            if (mode === "alphabet") {
              // ALPHABET CLASSIFIER (Translation-Invariant)
              
              // J & Z (Motion Based)
              if (pUp && !iUp && !mUp && !rUp) {
                 const start = pinkyTipHistory.current[0];
                 const end = pinkyTipHistory.current[pinkyTipHistory.current.length - 1];
                 if (start && end && start.y < end.y && getXDist(start, end) > 0.1) detectedSign = "J";
                 else detectedSign = "I";
              }
              else if (iUp && !mUp && !rUp && !pUp) {
                // Check if index draws a Z (rapid left-right movement)
                 const start = indexTipHistory.current[0];
                 const end = indexTipHistory.current[indexTipHistory.current.length - 1];
                 if (start && end && getXDist(start, end) > 0.15 && Math.abs(start.y - end.y) > 0.1) detectedSign = "Z";
                 else if (isThumbOut) detectedSign = "L";
                 else detectedSign = "D"; // Or 1
              }
              // Normal Letters
              else if (thumbToIndex < 0.05 && mUp && rUp && pUp) detectedSign = "F";
              else if (thumbToMiddle < 0.05 && iUp && !rUp && !pUp) detectedSign = "D";
              else if (iUp && mUp && rUp && !pUp) detectedSign = "W";
              else if (isOpenHand) {
                 if (!isThumbOut) detectedSign = "B";
                 else detectedSign = "C"; // Approximated
              }
              else if (iUp && mUp && !rUp && !pUp) {
                 if (indexToMiddle > 0.05) detectedSign = "V";
                 else detectedSign = "U"; // Fingers together
              }
              else if (pUp && isThumbOut && !iUp && !mUp && !rUp) detectedSign = "Y"; // Shaka
              else if (isClosedFist) {
                 if (isThumbOut && thumbTip.y < landmarks[5].y) detectedSign = "A";
                 else if (isThumbCrossed) detectedSign = "S";
                 else detectedSign = "E";
              }
            } else {
              // 30+ PHRASES CLASSIFIER (Translation-Invariant)
              if (isOpenHand) detectedSign = "HELLO / OPEN";
              else if (isClosedFist) {
                 if (isThumbOut) detectedSign = "THANK YOU / GOOD";
                 else detectedSign = "EMERGENCY / STOP";
              }
              else if (pUp && isThumbOut && !iUp && !mUp && !rUp) detectedSign = "NO / BAD";
              else if (thumbToIndex < 0.05 && mUp && rUp && pUp) detectedSign = "PERFECT / YES";
              else if (iUp && mUp && !rUp && !pUp && indexToMiddle > 0.05) detectedSign = "PEACE / REPEAT";
              else if (iUp && mUp && rUp && !pUp) detectedSign = "WATER";
            }

            // STABILITY BUFFER (Requires 8 identical frames out of last 10)
            if (detectedSign) {
               historyBuffer.current.push(detectedSign);
               if (historyBuffer.current.length > 10) historyBuffer.current.shift();

               const counts = historyBuffer.current.reduce((acc: any, val: string) => {
                 acc[val] = (acc[val] || 0) + 1;
                 return acc;
               }, {});

               const mostStableKey = Object.keys(counts).sort((a,b) => counts[b] - counts[a])[0];
               const stability = counts[mostStableKey] / 10;

               if (stability >= 0.8) { 
                  const now = Date.now();
                  if (now > detectionCooldown.current) {
                     onDetection(mostStableKey, stability); 
                     detectionCooldown.current = now + (mode === "alphabet" ? 1000 : 2000); 
                  }
               }
            }
          } else {
             if (isHandActive) setIsHandActive(false);
             historyBuffer.current = [];
             indexTipHistory.current = [];
             pinkyTipHistory.current = [];
          }
          canvasCtx.restore();
        });

        // MASSIVE PERFORMANCE BOOST (640x480 resolution for internal processing)
        camera = new cam.Camera(videoRef.current, {
          onFrame: async () => {
             if (!isCleaningUp.current && handsInstance && videoRef.current) {
                try {
                  await handsInstance.send({ image: videoRef.current });
                } catch (e) {}
             }
          },
          width: 640, height: 480, // 0 LAG Processing
        });

        await camera.start();
        if (!isCleaningUp.current) setIsLoaded(true);
      } catch (err) {
        if (!isCleaningUp.current) setError("ASL Neural Engine Failure.");
      }
    };

    if (isRecording) initMediaPipe();

    return () => {
      isCleaningUp.current = true;
      if (camera) camera.stop();
      if (handsInstance) handsInstance.close();
      setIsLoaded(false);
    };
  }, [isRecording, onDetection, mode, isHandActive]);

  return (
    <div className={`relative w-full h-full bg-slate-950 transition-all duration-700 ${isFullscreen ? "rounded-none" : "rounded-[40px]"} overflow-hidden border border-white/5 shadow-3xl`}>
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-80" playsInline muted />
      {/* Visual canvas scaled up using CSS to match container while processing at 640x480 */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-10" width={640} height={480} />
      
      {/* HUD GHOST FRAME - Subtly appears when hand detected */}
      <div className={`absolute inset-0 border-[40px] border-black/40 pointer-events-none z-20 flex items-center justify-center transition-opacity duration-1000 ${isHandActive ? "opacity-100" : "opacity-30"}`}>
          <div className="w-[85%] h-[85%] border border-primary/20 rounded-[40px] relative">
              <div className="absolute -top-1 -left-1 w-12 h-12 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-1 -right-1 w-12 h-12 border-t-2 border-r-2 border-primary" />
              <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-2 border-r-2 border-primary" />
          </div>
      </div>
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 z-30 p-10 text-center">
            <span className="text-red-400 font-black text-xs uppercase tracking-[0.5em]">{error}</span>
        </div>
      )}

      {!isLoaded && isRecording && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 z-40">
           <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 border-[2px] border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(14,165,233,0.3)]" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.8em]">ASL LINK...</span>
           </div>
        </div>
      )}
    </div>
  );
};
