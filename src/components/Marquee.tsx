import { useEffect, useState } from "react";

export function Marquee() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logos = [
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  ];

  if (!mounted) return (
    <section className="border-y border-border py-16 md:py-24 overflow-hidden bg-background/50">
      <div className="h-20" />
    </section>
  );

  const row = (
    <div className="flex items-center gap-16 md:gap-32 pr-16 md:pr-32 whitespace-nowrap flex-shrink-0">
      {logos.map((logo, i) => (
        <div key={i} className="flex items-center gap-16 md:gap-32 flex-shrink-0">
          <div className="group relative flex items-center justify-center">
            <img 
              src={logo.url} 
              alt={logo.name} 
              className="h-12 w-12 md:h-20 md:w-20 object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0" 
            />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-foreground whitespace-nowrap">
              {logo.name}
            </div>
          </div>
          <span className="text-[6vw] md:text-[4vw] text-[var(--ember)] opacity-30 italic font-display">·</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="border-y border-border py-16 md:py-24 overflow-hidden bg-background/50 backdrop-blur-sm relative">
      <div className="marquee-track flex will-change-transform">
        {row}
        {row}
        {row}
      </div>
    </section>
  );
}
