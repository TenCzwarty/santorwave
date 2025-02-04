"use client";

import Link from "next/link";
import { Palmtree, Tv, Headphones } from "lucide-react";
import { useGlitchedText } from "@/components/helpers/useGlitchedText";

export default function VaporwaveLanding() {
  const glitchText = useGlitchedText("SANTORWAVE");

  return (
    <div>
      <main className="container mx-auto px-4 py-16">
        <section className="mb-16 text-center">
          <h1 className="glitch-text mb-4 text-6xl font-bold">{glitchText}</h1>
          <p className="mb-8 text-xl">embrace the connection between worlds</p>
          <button className="rounded-full bg-pink-500 px-4 py-2 font-bold text-white transition-colors hover:bg-pink-600">
            enter the weave
          </button>
        </section>

        <section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Link href="/releases">
            <div className="rounded-lg bg-white bg-opacity-20 p-6 backdrop-blur-sm hover:bg-opacity-30">
              <Palmtree className="mb-4 h-12 w-12 text-pink-300" />
              <h2 className="mb-2 text-2xl font-bold">Releases</h2>
              <p>Immerse yourself in the nostalgia of the 60s and 70s.</p>
            </div>
          </Link>
          <div className="rounded-lg bg-white bg-opacity-20 p-6 backdrop-blur-sm hover:bg-opacity-30">
            <Tv className="mb-4 h-12 w-12 text-purple-300" />
            <h2 className="mb-2 text-2xl font-bold">Songs</h2>
            <p>Experience the fusion of past and future technologies.</p>
          </div>
          <div className="rounded-lg bg-white bg-opacity-20 p-6 backdrop-blur-sm hover:bg-opacity-30">
            <Headphones className="mb-4 h-12 w-12 text-indigo-300" />
            <h2 className="mb-2 text-2xl font-bold">Playlists</h2>
            <p>Let the waves of synthesizer melodies wash over you.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
