import { stats } from "@/data/site";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        y: 60, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="border-y border-border px-6 md:px-10 py-16 md:py-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s) => (
          <div key={s.label} className="stat-item">
            <div className="font-display text-6xl md:text-7xl tracking-tight text-[var(--ember)]">{s.n}</div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
