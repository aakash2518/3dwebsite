import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/site";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — RoyalFinity Technologies" },
      { name: "description", content: "Experience our services through an immersive 3D journey." },
    ],
  }),
  component: ServicesPage,
});

const serviceConfig = [
  { id: "01", folder: "webdevelopment_service", frames: 69, padding: 2 },
  { id: "02", folder: "mobileapp_service", frames: 192, padding: 3 },
  { id: "03", folder: "digitalmarketing_service", frames: 88, padding: 2 },
  { id: "04", folder: "digitalmarketing_service", frames: 88, padding: 2 },
  { id: "05", folder: "digitalmarketing_service", frames: 88, padding: 2 },
  { id: "06", folder: "digitalmarketing_service", frames: 88, padding: 2 },
  { id: "07", folder: "digitalmarketing_service", frames: 88, padding: 2 },
  { id: "08", folder: "mobileapp_service", frames: 192, padding: 3 },
  { id: "09", folder: "UIUXdesign_service", frames: 75, padding: 2 },
  { id: "10", folder: "softwareandERPsystem_service", frames: 98, padding: 2 },
  { id: "11", folder: "businessautomation_service", frames: 104, padding: 3 },
];

function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Preload frames for all services initially (or lazy load as we go)
  useEffect(() => {
    const preloadAll = async () => {
      // Preload first frames of each service
      serviceConfig.forEach(config => {
        const img = new Image();
        const padded = String(0).padStart(config.padding, '0');
        img.src = `/assets/${config.folder}/frame_${padded}_delay-0.041s.webp`;
      });
    };
    preloadAll();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame on resize if possible
      }
    };
    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    const totalServices = serviceConfig.length;
    
    const mainST = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalServices * 200}%`, // 200vh per service for smoother scroll
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const rawIdx = progress * totalServices;
        const serviceIdx = Math.min(Math.floor(rawIdx), totalServices - 1);
        
        if (serviceIdx !== activeIndexRef.current) {
          activeIndexRef.current = serviceIdx;
          setActiveServiceIndex(serviceIdx);
        }

        const serviceProgress = rawIdx % 1;
        const config = serviceConfig[serviceIdx];
        const frameIdx = Math.floor(serviceProgress * (config.frames - 1));
        
        const img = new Image();
        const padded = String(frameIdx).padStart(config.padding, '0');
        img.src = `/assets/${config.folder}/frame_${padded}_delay-0.041s.webp`;
        
        img.onload = () => {
          if (!ctx || !canvasRef.current) return;
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          const scale = Math.max(canvasRef.current.width / img.width, canvasRef.current.height / img.height);
          const x = (canvasRef.current.width - img.width * scale) / 2;
          const y = (canvasRef.current.height - img.height * scale) / 2;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };
      },
    });

    return () => {
      mainST.kill();
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []); // Only run once

  const activeService = services[activeServiceIndex];

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <div className="absolute inset-0 z-10 flex items-center px-6 md:px-20 pointer-events-none">
          <div className="max-w-4xl pt-20 md:pt-0">
            <div className="overflow-hidden h-6">
              <p key={`n-${activeServiceIndex}`} className="font-mono text-[10px] md:text-sm uppercase tracking-[0.3em] text-[var(--ember)]/80 animate-in fade-in slide-in-from-bottom-full duration-500">
                ( Service / {activeService?.n} )
              </p>
            </div>
            
            <h1 key={`t-${activeServiceIndex}`} className="font-display text-[14vw] sm:text-[12vw] md:text-[8vw] leading-[0.95] md:leading-[0.9] tracking-tighter mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-12 duration-700">
              {activeService?.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "italic text-[var(--ember)]" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>
 
            <div key={`d-${activeServiceIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              <p className="text-base md:text-xl text-bone/70 leading-relaxed max-w-md">
                {activeService?.tagline}
              </p>
              
              <ul className="space-y-2 md:space-y-3 pointer-events-auto">
                {activeService?.points.map((p, i) => (
                  <li key={i} className="flex gap-3 md:gap-4 group cursor-default">
                    <span className="text-[var(--ember)] shrink-0 transition-transform group-hover:translate-x-1">→</span>
                    <span className="text-sm md:text-base text-bone/60 group-hover:text-bone transition-colors">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 pointer-events-none animate-bounce">
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--ember)] to-transparent" />
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 h-64 w-[2px] bg-white/5 hidden md:block rounded-full overflow-hidden">
          <div 
            className="w-full bg-[var(--ember)] transition-all duration-300 rounded-full"
            style={{ height: `${((activeServiceIndex + 1) / services.length) * 100}%` }}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
