import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/site";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — RoyalFinity Technologies" },
      { name: "description", content: "Selected work across e-commerce, healthcare, transportation, edtech and fintech." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-img").forEach((el) => {
        gsap.fromTo(el, { scale: 1.2 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      gsap.from(".project-title", {
        y: 60, opacity: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".project-title", start: "top 85%" },
        stagger: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={ref} className="relative pt-32">
      <section className="px-6 md:px-10 pb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60">(Portfolio / 2023 — 2025)</p>
        <h1 className="mt-6 font-display text-[11vw] md:text-[8vw] leading-[0.85] tracking-[-0.04em]">
          Recent <span className="italic text-[var(--ember)]">work.</span>
        </h1>
      </section>

      <section className="px-6 md:px-10 space-y-32 md:space-y-48 pb-32">
        {projects.map((p, i) => (
          <article key={p.n} className={`grid grid-cols-12 gap-6 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
            <div className="col-span-12 md:col-span-8 [direction:ltr]">
              <div className="overflow-hidden bg-card aspect-[16/10]" data-cursor>
                <img src={p.img} alt={p.title} loading="lazy" className="project-img h-full w-full object-cover will-change-transform" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 [direction:ltr]">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/50">
                {p.n} / {p.year}
              </div>
              <h2 className="project-title mt-3 font-display text-4xl md:text-6xl tracking-tight leading-[0.95]">{p.title}</h2>
              <p className="mt-4 text-[var(--bone)]/70">{p.desc}</p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--ember)]">{p.tag}</p>
            </div>
          </article>
        ))}
      </section>

      <Footer />
    </main>
  );
}
