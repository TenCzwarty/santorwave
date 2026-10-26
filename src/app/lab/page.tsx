"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  DEFAULT_AUDIO_EFFECTS,
  isVaporwavePreset,
  useAudioChain,
  VAPORWAVE_AUDIO_EFFECTS,
} from "@/lib/audio";

import {
  EffectToggles,
  PlayButton,
  VaporwaveButton,
  VinylVisual,
  VolumeSliders,
} from "./_components";
import { MUSIC_URL, VINYL_CRACKLE_URL } from "./_lib/constants";

/**
 * Audio Lab Page
 *
 * A full-page playground for the same effects chain the floating player uses:
 * speed, lo-fi filter, reverb, vinyl crackle and fades. The Web Audio graph
 * itself lives in `useAudioChain` — this page is only UI and local state.
 */
export default function AudioLabPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [vinylEnabled, setVinylEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(0.8);
  const [crackleVolume, setCrackleVolume] = useState(0.3);

  const musicRef = useRef<HTMLAudioElement>(null);
  const crackleRef = useRef<HTMLAudioElement>(null);
  const [musicElement, setMusicElement] = useState<HTMLAudioElement | null>(
    null,
  );

  useEffect(() => {
    setMusicElement(musicRef.current);
  }, []);

  const { effects, setEffect, applyPreset, isFadingOut, prepare, fadeIn, fadeOut } =
    useAudioChain(musicElement, { volume: musicVolume });

  const vaporwaveMode = isVaporwavePreset(effects);

  // Crackle is a plain audio element, deliberately outside the effects chain.
  useEffect(() => {
    if (crackleRef.current) {
      crackleRef.current.volume = vinylEnabled ? crackleVolume : 0;
    }
  }, [crackleVolume, vinylEnabled]);

  const toggleVaporwave = () => {
    const enabling = !vaporwaveMode;
    applyPreset(enabling ? VAPORWAVE_AUDIO_EFFECTS : DEFAULT_AUDIO_EFFECTS);
    if (enabling) setVinylEnabled(true);
  };

  const handlePlay = async () => {
    const music = musicRef.current;
    const crackle = crackleRef.current;
    if (!music || !crackle) return;

    try {
      await prepare();
      await music.play();
      await crackle.play();
      setIsPlaying(true);
      await fadeIn();
    } catch (error) {
      console.error("Play error:", error);
      setIsPlaying(false);
    }
  };

  const handlePause = async () => {
    const music = musicRef.current;
    const crackle = crackleRef.current;
    if (!music || !crackle || isFadingOut) return;

    await fadeOut();
    music.pause();
    crackle.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    void (isPlaying ? handlePause() : handlePlay());
  };

  return (
    <div className="min-h-screen text-theme-text-primary">
      {/* Audio Elements */}
      <audio ref={musicRef} src={MUSIC_URL} loop crossOrigin="anonymous" />
      <audio ref={crackleRef} src={VINYL_CRACKLE_URL} loop />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="glitch-text text-4xl font-bold mb-3">
              ✨ Audio Lab
            </h1>
            <p className="text-theme-text-secondary">
              Slow it down • Add reverb • Lo-fi filter • Vinyl crackle
            </p>
          </div>

          {/* Main Card */}
          <div className="theme-card rounded-3xl p-8 shadow-2xl">
            <VinylVisual
              isPlaying={isPlaying}
              isFadingOut={isFadingOut}
              speed={effects.speed}
            />

            <PlayButton
              isPlaying={isPlaying}
              isFadingOut={isFadingOut}
              onToggle={togglePlay}
            />

            <VaporwaveButton isActive={vaporwaveMode} onToggle={toggleVaporwave} />

            <EffectToggles
              pitchShift={effects.pitchShift}
              onPitchShiftChange={(value) => setEffect("pitchShift", value)}
              lofiEnabled={effects.lofi}
              onLofiChange={(value) => setEffect("lofi", value)}
              reverbEnabled={effects.reverb}
              onReverbChange={(value) => setEffect("reverb", value)}
              vinylEnabled={vinylEnabled}
              onVinylChange={setVinylEnabled}
            />

            <VolumeSliders
              speed={effects.speed}
              onSpeedChange={(value) => setEffect("speed", value)}
              musicVolume={musicVolume}
              onMusicVolumeChange={setMusicVolume}
              crackleVolume={crackleVolume}
              onCrackleVolumeChange={setCrackleVolume}
              vinylEnabled={vinylEnabled}
            />

            {/* Info */}
            <div className="mt-8 p-4 bg-theme-glass rounded-xl text-center border border-theme-glass-border">
              <p className="text-xs text-theme-text-muted">🎧 Best experienced with headphones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
