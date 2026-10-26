"use client";

import React from "react";

import { usePlayer } from "@/components/player-provider";
import { MAIN_TRACK } from "@/components/player-provider/constants";
import {
  DEFAULT_AUDIO_EFFECTS,
  isVaporwavePreset,
  VAPORWAVE_AUDIO_EFFECTS,
} from "@/lib/audio";

import {
  EffectToggles,
  PlayButton,
  VaporwaveButton,
  VinylVisual,
  VolumeSliders,
} from "./_components";

/**
 * Audio Lab Page
 *
 * A full-page control panel for the global player: speed, lo-fi filter,
 * reverb, vinyl crackle and volume, applied to whatever is playing right now.
 * It used to own a second `<audio>` element and play its own song on top of
 * the global one; now it only drives the player's chain.
 */
export default function AudioLabPage() {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    resume,
    pause,
    chain,
    volume,
    setVolume,
    crackle,
  } = usePlayer();
  const { effects, setEffect, applyPreset, isFadingOut } = chain;

  const vaporwaveMode = isVaporwavePreset(effects);

  const toggleVaporwave = () => {
    const enabling = !vaporwaveMode;
    applyPreset(enabling ? VAPORWAVE_AUDIO_EFFECTS : DEFAULT_AUDIO_EFFECTS);
    if (enabling) crackle.setEnabled(true);
  };

  const togglePlay = () => {
    if (isPlaying) return pause();
    // Nothing loaded yet: start the theme song rather than doing nothing.
    if (!currentTrack) {
      void playTrack(MAIN_TRACK.url, MAIN_TRACK.info, MAIN_TRACK.options);
      return;
    }
    void resume();
  };

  return (
    <div className="min-h-screen text-theme-text-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="glitch-text mb-3 text-4xl font-bold">
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

            {/* Now playing */}
            <div className="mb-6 text-center">
              {currentTrack ? (
                <>
                  <p className="font-bold">{currentTrack.title}</p>
                  <p className="text-sm text-theme-text-secondary">
                    {currentTrack.artist}
                  </p>
                </>
              ) : (
                <p className="text-sm text-theme-text-muted">
                  Nothing playing — press play for {MAIN_TRACK.info.title}, or
                  pick a track in Releases or Discover.
                </p>
              )}
            </div>

            <PlayButton
              isPlaying={isPlaying}
              isFadingOut={isFadingOut}
              onToggle={togglePlay}
            />

            <VaporwaveButton
              isActive={vaporwaveMode}
              onToggle={toggleVaporwave}
            />

            <EffectToggles
              pitchShift={effects.pitchShift}
              onPitchShiftChange={(value) => setEffect("pitchShift", value)}
              lofiEnabled={effects.lofi}
              onLofiChange={(value) => setEffect("lofi", value)}
              reverbEnabled={effects.reverb}
              onReverbChange={(value) => setEffect("reverb", value)}
              vinylEnabled={crackle.enabled}
              onVinylChange={crackle.setEnabled}
            />

            <VolumeSliders
              speed={effects.speed}
              onSpeedChange={(value) => setEffect("speed", value)}
              musicVolume={volume}
              onMusicVolumeChange={setVolume}
              crackleVolume={crackle.volume}
              onCrackleVolumeChange={crackle.setVolume}
              vinylEnabled={crackle.enabled}
            />

            {/* Info */}
            <div className="mt-8 rounded-xl border border-theme-glass-border bg-theme-glass p-4 text-center">
              <p className="text-xs text-theme-text-muted">
                🎧 Best experienced with headphones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
