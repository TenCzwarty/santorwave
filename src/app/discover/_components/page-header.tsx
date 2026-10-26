"use client";

import { useGlitchedText } from "@/components/helpers/useGlitchedText";

export function PageHeader() {
  const glitchText = useGlitchedText("DISCOVER");

  return (
    <section className="mb-12 text-center">
      <h1 className="glitch-text mb-4 text-6xl font-bold text-theme-text-primary">
        {glitchText}
      </h1>
      <p className="mb-8 text-xl text-theme-text-secondary">
        search millions of songs with 30-second previews
      </p>
    </section>
  );
}
