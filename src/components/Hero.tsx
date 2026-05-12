import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";
const hero = "/assets/hero-1.jpg";

import { useVisibility } from "../routes/__root";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const { isVisible } = useVisibility();

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");
      gsap.from(chars, {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.03,
        delay: 0.2,
      });
      gsap.to(".hero-img", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-title", {
        y: -150, // Use a fixed value for more predictable movement
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const split = (text: string) =>
    text.split("").map((c, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className="hero-char inline-block">{c === " " ? "\u00A0" : c}</span>
      </span>
    ));

  return (
    <section ref={root} className="relative h-[100svh] w-full overflow-hidden grain">
      <div className="absolute inset-0 hero-img will-change-transform translate-z-0">
        <img src={hero} alt="" width={1600} height={1920} className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 md:px-10 pt-32 pb-24">
        <div className="flex justify-between items-start font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/70">
          <span>Faridabad / India</span>
          <span className="text-right max-w-[18ch] hidden sm:block">royalfinity technology — let's grow together</span>
        </div>

        <h1 className="hero-title font-display font-light text-[var(--bone)] leading-[0.9] md:leading-[0.85] tracking-[-0.04em] text-[15vw] sm:text-[13vw] md:text-[9vw]">
          <div className="overflow-hidden">{split("Struggling")}</div>
          <div className="sm:pl-[10vw] italic overflow-hidden">{split("to grow")}</div>
          <div className="overflow-hidden">{split("online?")}</div>
          <div className="sm:pl-[18vw] text-[var(--gold)] overflow-hidden">{split("We fix that.")}</div>
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 sm:gap-6">
          <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
            <Link to="/contact" className="px-6 py-3 bg-[var(--gold)] text-[var(--accent-foreground)] text-center text-xs uppercase tracking-[0.2em] font-mono hover:opacity-90 transition shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Start a project →
            </Link>
            <Link to="/services" className="px-6 py-3 border border-[var(--bone)]/30 text-[var(--bone)] text-center text-xs uppercase tracking-[0.2em] font-mono hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
              Explore services
            </Link>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/70 hidden sm:block">Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}
