import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqs } from "@/data/site";

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        y: 40, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="px-6 md:px-10 py-32 border-t border-border">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <p className="col-span-12 md:col-span-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60">(FAQ)</p>
        <h2 className="col-span-12 md:col-span-10 font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
          Quick answers, <span className="italic text-[var(--ember)]">no fluff.</span>
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-10 md:col-start-3">
          {faqs.map((f, i) => (
            <div key={i} className="faq-item border-t border-border last:border-b">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-baseline justify-between gap-6 py-6 text-left group"
                data-cursor
              >
                <span className="font-display text-xl md:text-3xl tracking-tight group-hover:text-[var(--ember)] transition-colors">
                  {f.q}
                </span>
                <span className="font-mono text-xs text-[var(--bone)]/60 shrink-0">
                  {open === i ? "—" : "+"}
                </span>
              </button>
              <div
                className="grid transition-all duration-500 ease-out"
                style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 max-w-2xl text-[var(--bone)]/70 text-lg">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
