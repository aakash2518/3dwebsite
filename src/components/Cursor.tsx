import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const setRingX = gsap.quickSetter(ringRef.current, "x", "px");
    const setRingY = gsap.quickSetter(ringRef.current, "y", "px");
    const setDotX = gsap.quickSetter(dotRef.current, "x", "px");
    const setDotY = gsap.quickSetter(dotRef.current, "y", "px");

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      gsap.to({}, {
        duration: 0,
        onUpdate: () => {
          setDotX(x);
          setDotY(y);
        }
      });

      gsap.to({}, {
        duration: 0.6,
        ease: "power3.out",
        onUpdate: () => {
          setRingX(x);
          setRingY(y);
        }
      });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      gsap.to(ringRef.current, {
        scale: interactive ? 2.5 : 1,
        backgroundColor: interactive ? "rgba(235, 87, 87, 0.2)" : "transparent",
        duration: 0.3
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };

  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-[var(--bone)]/60 transition-[transform,background-color] duration-200 ease-out hidden md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[var(--ember)] hidden md:block"
      />
    </>
  );
}
