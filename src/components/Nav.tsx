import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Index" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/about", label: "Studio" },
    { to: "/contact", label: "Contact" },
  ] as const;

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${!isOpen ? "mix-blend-difference" : ""}`}>
      <div className="flex items-center justify-between px-6 md:px-10 py-6">
        <Link to="/" className="flex items-center gap-3 group relative z-50">
          <img 
            src={logo} 
            alt="RoyalFinity" 
            className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110" 
          />
          <span className="font-display text-xl tracking-tight text-[var(--gold)]">
            royalfinity technology
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-[var(--bone)] font-mono">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-[var(--ember)]" }}
              className="hover:text-[var(--ember)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact Info (Desktop) */}
        <a href="tel:+919211816999" className="text-xs uppercase tracking-[0.2em] text-[var(--bone)] font-mono hidden md:block">
          (+91 92118 16999)
        </a>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 p-2 text-[var(--bone)] hover:text-[var(--gold)] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-full"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-2xl uppercase tracking-[0.2em] text-[var(--bone)] font-display">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setIsOpen(false)}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-[var(--gold)]" }}
              className="hover:text-[var(--gold)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-12 flex flex-col items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--bone)]/60">
          <a href="tel:+919211816999" className="hover:text-[var(--gold)] transition-colors">
            (+91 92118 16999)
          </a>
          <span>Faridabad / India</span>
        </div>
      </div>
    </header>
  );
}
