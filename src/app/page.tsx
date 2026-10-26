"use client";
import React, { memo } from "react";

import Link from "next/link";
import {
  Palmtree,
  Headphones,
  AudioWaveform,
  Sparkles,
  Radio,
  Tv,
  Sunset,
  ShoppingBag,
} from "lucide-react";
import { useGlitchedText } from "@/components/helpers/useGlitchedText";
import { ModelDavidsHead } from "@/components/model/davids-head";
import { usePlayer } from "@/components/player-provider";
import { MAIN_TRACK } from "@/components/player-provider/constants";

const MemoizedModelDavidsHead = memo(ModelDavidsHead);

export default function VaporwaveLanding() {
  const glitchText = useGlitchedText("SANTORWAVE");
  const { playTrack, isPlaying, currentTrack } = usePlayer();

  const isMainSongPlaying =
    isPlaying && currentTrack?.id === MAIN_TRACK.info.id;

  const handleEnterWeave = () => {
    void playTrack(MAIN_TRACK.url, MAIN_TRACK.info, MAIN_TRACK.options);
  };

  return (
    <div className="relative">
      <MemoizedModelDavidsHead />

      <main className="container mx-auto px-4 py-16">
        <section className="relative mb-16 text-center">
          <h1 className="glitch-text mb-4 text-6xl font-bold text-theme-text-primary">
            {glitchText}
          </h1>
          <p className="mb-8 text-xl text-theme-text-secondary">
            embrace the connection between worlds
          </p>
          <button
            onClick={handleEnterWeave}
            className="group relative overflow-hidden rounded-full px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(233,30,140,0.5)]"
            style={{
              background:
                "linear-gradient(135deg, #ff6b9d 0%, #e91e8c 25%, #a855f7 50%, #6366f1 75%, #00d4ff 100%)",
              backgroundSize: "200% 200%",
              animation: "gradient-shift 3s ease infinite",
              boxShadow:
                "0 4px 30px rgba(233,30,140,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider">
              {isMainSongPlaying ? "now vibing" : "enter the weave"}
            </span>
            {/* Shine effect */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transform: "translateX(-100%)",
                animation: "shine 2s infinite",
              }}
            />
          </button>
        </section>

        <section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/releases">
            <div className="theme-card rounded-lg p-6 transition-all hover:scale-[1.02]">
              <Palmtree className="mb-4 h-12 w-12 text-theme-icon-pink" />
              <h2 className="mb-2 text-2xl font-bold text-theme-text-primary">
                Releases
              </h2>
              <p className="text-theme-text-secondary">
                Immerse yourself in the nostalgia of the 60s and 70s.
              </p>
            </div>
          </Link>
          <Link href="/discover">
            <div className="theme-card rounded-lg p-6 transition-all hover:scale-[1.02]">
              <AudioWaveform className="mb-4 h-12 w-12 text-theme-icon-cyan" />
              <h2 className="mb-2 text-2xl font-bold text-theme-text-primary">
                Discover
              </h2>
              <p className="text-theme-text-secondary">
                Search millions of songs with real-time audio visualization.
              </p>
            </div>
          </Link>
          <Link href="/lab">
            <div className="theme-card rounded-lg p-6 transition-all hover:scale-[1.02]">
              <Sparkles className="mb-4 h-12 w-12 text-theme-icon-purple" />
              <h2 className="mb-2 text-2xl font-bold text-theme-text-primary">
                Audio Lab
              </h2>
              <p className="text-theme-text-secondary">
                Slow down, add reverb, lo-fi filter, and vinyl crackle.
              </p>
            </div>
          </Link>
          <div className="theme-card cursor-not-allowed rounded-lg p-6 opacity-60">
            <Headphones className="mb-4 h-12 w-12 text-theme-icon-orange" />
            <h2 className="mb-2 text-2xl font-bold text-theme-text-primary">
              Playlists
            </h2>
            <p className="text-theme-text-secondary">
              Let the waves of synthesizer melodies wash over you.
            </p>
          </div>
          <div className="theme-card cursor-not-allowed rounded-lg p-6 opacity-60">
            <Radio className="mb-4 h-12 w-12 text-theme-icon-pink" />
            <h2 className="mb-2 text-2xl font-bold text-theme-text-primary">
              Radio
            </h2>
            <p className="text-theme-text-secondary">
              24/7 vaporwave radio streams from the digital void.
            </p>
          </div>
          <div className="theme-card cursor-not-allowed rounded-lg p-6 opacity-60">
            <Tv className="mb-4 h-12 w-12 text-theme-icon-cyan" />
            <h2 className="mb-2 text-2xl font-bold text-theme-text-primary">
              Visuals
            </h2>
            <p className="text-theme-text-secondary">
              Generate retro VHS-style visuals for your music.
            </p>
          </div>
          <div className="theme-card cursor-not-allowed rounded-lg p-6 opacity-60">
            <Sunset className="mb-4 h-12 w-12 text-theme-icon-purple" />
            <h2 className="mb-2 text-2xl font-bold text-theme-text-primary">
              Moods
            </h2>
            <p className="text-theme-text-secondary">
              Curated atmospheres for every aesthetic moment.
            </p>
          </div>
          <div className="theme-card cursor-not-allowed rounded-lg p-6 opacity-60">
            <ShoppingBag className="mb-4 h-12 w-12 text-theme-icon-orange" />
            <h2 className="mb-2 text-2xl font-bold text-theme-text-primary">
              Merch
            </h2>
            <p className="text-theme-text-secondary">
              Physical artifacts from the digital realm.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
