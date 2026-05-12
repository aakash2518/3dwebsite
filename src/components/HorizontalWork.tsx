import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/site";

export function HorizontalWork() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!track.current || !wrap.current) return;
      const distance = track.current.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -distance,
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
    <section id="work" ref={wrap} className="relative h-[100svh] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-10 py-8 flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/70">
        <span>Recent projects — 2023 / 2025</span>
        <span>↔ Scroll</span>
      </div>

      <div ref={track} className="flex h-full items-center gap-8 md:gap-16 pl-6 md:pl-10 will-change-transform">
        <div className="shrink-0 w-[60vw] md:w-[40vw]">
          <p className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
            Work that moved a real metric.
          </p>
          <p className="mt-8 max-w-md text-[var(--bone)]/60">
            A look at recent builds across e-commerce, healthcare, transport, edtech and finance.
          </p>
        </div>

        {projects.map((p) => (
          <article key={p.n} className="shrink-0 w-[70vw] md:w-[36vw] group" data-cursor>
            <div className="relative overflow-hidden bg-card aspect-[4/5]">
              <img src={p.img} alt={p.title} width={1280} height={1600} loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
            </div>
            <div className="mt-5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60">
              <span>{p.n} / {p.year}</span>
              <span>{p.tag}</span>
            </div>
            <h3 className="mt-2 font-display text-3xl md:text-4xl tracking-tight">{p.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
