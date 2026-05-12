import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offerings = [
  { title: "Web Development", desc: "High-performance websites built for speed and scale." },
  { title: "Mobile App Development", desc: "Native and cross-platform apps that users love." },
  { title: "Digital Marketing", desc: "Data-driven strategies to grow your online presence." },
  { title: "AI & Automation", desc: "Smart solutions to streamline your business workflows." },
  { title: "UI/UX Design", desc: "Beautiful, intuitive interfaces that convert." },
];

export function WhatWeOffer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameCount = 135;
    const frames: HTMLImageElement[] = [];
    
    // Preload frames
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      img.src = `/assets/whatweoffer/frame_${padded}_delay-0.041s.webp`;
      frames.push(img);
    }

    const render = (index: number) => {
      const img = frames[index];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else if (img) {
        img.onload = () => render(index);
      }
    };

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(Math.floor(ScrollTrigger.getById("offerST")?.progress || 0 * (frameCount - 1)));
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    const st = ScrollTrigger.create({
      id: "offerST",
      trigger: containerRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(self.progress * frameCount)
        );
        render(frameIndex);

        // Update text index
        const textIdx = Math.min(
          offerings.length - 1,
          Math.floor(self.progress * offerings.length)
        );
        setActiveIndex(textIdx);
      },
    });

    // Initial render
    frames[0].onload = () => render(0);

    return () => {
      st.kill();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ember)] mb-4">
            (What we offer)
          </p>
          
          <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
            {offerings.map((offering, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-700 ease-expo ${
                  i === activeIndex 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12"
                }`}
              >
                <h2 className="font-display text-5xl md:text-8xl tracking-tighter leading-none mb-4">
                  {offering.title}
                </h2>
                <p className="text-lg md:text-2xl text-bone/60 max-w-md leading-relaxed">
                  {offering.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 md:left-20 flex items-center gap-4 opacity-40">
        <div className="w-12 h-px bg-[var(--ember)]" />
        <span className="font-mono text-[10px] uppercase tracking-widest">
          {String(activeIndex + 1).padStart(2, "0")} / {String(offerings.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
