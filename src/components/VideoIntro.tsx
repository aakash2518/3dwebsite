import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import videoSrc from "../assets/herosection.webm";

interface VideoIntroProps {
  onComplete: () => void;
}

export function VideoIntro({ onComplete }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);
  const hasTriggeredComplete = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Fallback if video fails or is too long
    const timeout = setTimeout(() => {
      if (!hasTriggeredComplete.current) {
        handleTransition();
      }
    }, 10000);

    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timeout);
    };
  }, []);

  const handleTransition = () => {
    if (hasTriggeredComplete.current) return;
    hasTriggeredComplete.current = true;

    // Start revealing the background site slightly before the video fully disappears
    onComplete();

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        setIsFinished(true);
      },
    });
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    // Trigger transition 0.8 seconds before video ends for a seamless blend
    const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
    if (timeLeft < 0.8 && !hasTriggeredComplete.current) {
      handleTransition();
    }
  };

  if (isFinished) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTransition}
        className="w-full h-full object-cover"
      />
      {/* Cinematic overlay to match luxury aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
}
