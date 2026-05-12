import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

// Map service titles to their image paths
const serviceImages: Record<string, string> = {
  "Website Development": "/src/assets/webdev.webp",
  "Native Mobile Apps": "/src/assets/mobile app.webp",
  "Digital Marketing": "/src/assets/digitalmakreting.webp",
  "Social Media Marketing": "/src/assets/socialmedia.webp",
  "Search Engine Optimization": "/src/assets/seo.webp",
  "Google Ads (SEM / PPC)": "/src/assets/googleads.webp",
};

function ServiceCard({ service }: { service: typeof services[0] }) {
  const imageUrl = serviceImages[service.title];

  return (
    <article
      className="shrink-0 w-[85vw] md:w-[50vw] lg:w-[45vw] group"
      data-cursor
    >
      <div className="relative overflow-hidden bg-[#1a1a1a] border border-[var(--bone)]/10 rounded-3xl aspect-[16/10] transition-all duration-700 hover:border-[var(--ember)]/30 hover:bg-[#1f1f1f]">
        {/* Number badge */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/40 z-10">
          {service.n}
        </div>

        {/* Content Grid - Left text, Right image */}
        <div className="relative z-10 h-full grid grid-cols-12 gap-6 p-8 md:p-10">
          {/* Left side - Text content */}
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-tight mb-4 leading-tight">
              {service.title}
            </h3>

            <p className="text-[var(--bone)]/70 text-sm md:text-base leading-relaxed max-w-md">
              {service.tagline}
            </p>
          </div>

          {/* Right side - Image */}
          <div className="col-span-12 md:col-span-5 flex items-center justify-center">
            {imageUrl && (
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={imageUrl} 
                  alt={service.title}
                  className="w-full h-full object-contain max-h-[350px] md:max-h-[400px] transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60">
        <span>{service.n}</span>
        <span className="text-[var(--ember)]/60">View details →</span>
      </div>
    </article>
  );
}

export function ServicesHorizontal() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Filter only the required services
  const filteredServices = services.filter(service => 
    [
      "Website Development",
      "Native Mobile Apps", 
      "Digital Marketing",
      "Social Media Marketing",
      "Search Engine Optimization",
      "Google Ads (SEM / PPC)"
    ].includes(service.title)
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!track.current || !wrap.current) return;
      const distance = track.current.scrollWidth - window.innerWidth;
      
      // Set initial position to show content from right
      gsap.set(track.current, { x: -distance });
      
      // Animate from right to left (moving right on scroll)
      gsap.to(track.current, {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={wrap} className="relative h-[100svh] overflow-hidden bg-black">
      <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-10 py-8 flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/70">
        <span>(What we do)</span>
        <span>↔ Scroll</span>
      </div>

      <div ref={track} className="flex h-full items-center gap-8 md:gap-16 pl-6 md:pl-10 pr-6 md:pr-10 will-change-transform">
        <div className="shrink-0 w-[60vw] md:w-[40vw]">
          <p className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
            From brand to build to <span className="text-[var(--ember)] italic">growth</span>.
          </p>
          <p className="mt-8 max-w-md text-[var(--bone)]/60">
            Full-stack digital services engineered to move real metrics — from websites and apps to marketing and automation.
          </p>
        </div>

        {filteredServices.map((service) => (
          <ServiceCard key={service.n} service={service} />
        ))}
      </div>
    </section>
  );
}
