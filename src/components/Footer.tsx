import { Link } from "@tanstack/react-router";
import { contact } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative px-6 md:px-10 pt-20 pb-8 border-t border-border overflow-hidden">
      <div className="grid grid-cols-12 gap-y-10 md:gap-6">
        <div className="col-span-12 md:col-span-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60 mb-6">
            Start a project
          </p>
          <Link
            to="/contact"
            className="font-display text-[clamp(2.5rem,14vw,8rem)] md:text-[clamp(4rem,8vw,10rem)] leading-[0.9] tracking-[-0.03em] block hover:text-[var(--gold)] transition-colors"
          >
            let's <span className="italic text-[var(--gold)]">talk →</span>
          </Link>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col justify-end gap-10 md:gap-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--bone)]/70">
          <div className="space-y-2">
            <p className="text-[var(--bone)]">Studio</p>
            <p className="normal-case tracking-normal text-sm md:text-xs opacity-80">{contact.address}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[var(--bone)]">Reach us</p>
            <p><a href={`mailto:${contact.email}`} className="hover:text-[var(--gold)] normal-case tracking-normal text-sm md:text-xs opacity-80">{contact.email}</a></p>
            <p><a href={`tel:${contact.phone}`} className="hover:text-[var(--gold)] text-sm md:text-xs opacity-80">{contact.phone}</a></p>
            <p className="normal-case tracking-normal text-sm md:text-xs opacity-80">{contact.hours}</p>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col sm:flex-row justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/50 text-center sm:text-left">
        <span>© 2026 royalfinity technology</span>
        <span>Built with intent</span>
      </div>
    </footer>
  );
}
