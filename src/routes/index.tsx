import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { HorizontalWork } from "@/components/HorizontalWork";
import { About } from "@/components/About";
import { WhatWeOffer } from "@/components/WhatWeOffer";
import { ServicesHorizontal } from "@/components/ServicesHorizontal";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RoyalFinity Technologies — Digital growth, simplified." },
      { name: "description", content: "Websites, apps, branding, AI and marketing — built to move real business metrics." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <Stats />

      <ServicesHorizontal />
      <HorizontalWork />
      <About />
      <WhatWeOffer />
      <FAQ />
      <Footer />
    </main>
  );
}
