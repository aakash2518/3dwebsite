import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { contact, services } from "@/data/site";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RoyalFinity Technologies" },
      { name: "description", content: "Start a project. Get a quote. Talk to the team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <main className="relative pt-32">
      <section className="px-6 md:px-10 pb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60">(Get in touch)</p>
        <h1 className="mt-6 font-display text-[11vw] md:text-[8vw] leading-[0.85] tracking-[-0.04em] max-w-[14ch]">
          Let's create something <span className="italic text-[var(--ember)]">extraordinary.</span>
        </h1>
      </section>

      <section className="px-6 md:px-10 grid grid-cols-12 gap-10 pb-32">
        <div className="col-span-12 md:col-span-5 space-y-10">
          <Info label="Address" value={contact.address} />
          <Info label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <Info label="Phone" value={contact.phone} href={`tel:${contact.phone}`} />
          <Info label="Hours" value={contact.hours} />
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="col-span-12 md:col-span-7 space-y-6"
        >
          <Field label="Full name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" />
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60 mb-2">Service</label>
            <select className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-[var(--ember)]">
              <option className="bg-background">Select a service</option>
              {services.map((s) => <option key={s.n} className="bg-background">{s.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60 mb-2">Project details</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-[var(--ember)] resize-none" />
          </div>
          <button
            type="submit"
            disabled={sent}
            data-cursor
            className="px-8 py-4 bg-[var(--ember)] text-[var(--accent-foreground)] text-xs uppercase tracking-[0.25em] font-mono hover:opacity-90 transition disabled:opacity-50"
          >
            {sent ? "Sent — we'll be in touch ✓" : "Send the brief →"}
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = <p className="mt-2 text-xl text-[var(--bone)] leading-snug">{value}</p>;
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ember)]">{label}</p>
      {href ? <a href={href} className="hover:text-[var(--ember)] transition-colors">{inner}</a> : inner}
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60 mb-2">
        {label}{required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-[var(--ember)]"
      />
    </div>
  );
}
