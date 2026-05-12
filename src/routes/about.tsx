import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Studio — RoyalFinity Technologies" },
      { name: "description", content: "An independent technology studio turning ideas into digital impact." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="relative pt-32">
      <section className="px-6 md:px-10 pb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60">(The studio)</p>
        <h1 className="mt-6 font-display text-[14vw] md:text-[10vw] leading-[0.85] tracking-[-0.04em] max-w-[18ch]">
          Transforming ideas into <span className="italic text-[var(--ember)]">impact.</span>
        </h1>
        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 text-lg text-[var(--bone)]/75 leading-relaxed">
            <p>
              At RoyalFinity Technologies we believe in building digital solutions that actually
              move the needle. We start by understanding your business, anticipating the friction,
              and shipping work that lasts longer than the launch.
            </p>
            <p>
              Eleven services. One team. Engineered for the slow craft and the fast click.
            </p>
          </div>
        </div>
      </section>

      <Stats />
      <About />
      <Marquee />
      <Footer />
    </main>
  );
}
