"use client";

import { SLIDER_CLASS } from "../_lib/constants";

interface VolumeSlidersProps {
  speed: number;
  onSpeedChange: (value: number) => void;
  musicVolume: number;
  onMusicVolumeChange: (value: number) => void;
  crackleVolume: number;
  onCrackleVolumeChange: (value: number) => void;
  vinylEnabled: boolean;
}

export function VolumeSliders({
  speed,
  onSpeedChange,
  musicVolume,
  onMusicVolumeChange,
  crackleVolume,
  onCrackleVolumeChange,
  vinylEnabled,
}: VolumeSlidersProps) {
  return (
    <div className="space-y-5">
      {/* Speed */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-theme-text-secondary">🐢 Speed</span>
          <span className="text-theme-accent font-mono">{speed.toFixed(2)}x</span>
        </div>
        <input
          type="range"
          min="0.6"
          max="1"
          step="0.05"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className={SLIDER_CLASS}
        />
      </div>

      {/* Music Volume */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-theme-text-secondary">🎵 Music Volume</span>
          <span className="text-theme-accent">{Math.round(musicVolume * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={musicVolume}
          onChange={(e) => onMusicVolumeChange(parseFloat(e.target.value))}
          className={SLIDER_CLASS}
        />
      </div>

      {/* Vinyl Crackle Volume */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-theme-text-secondary">📀 Vinyl Crackle</span>
          <span className="text-theme-accent">{Math.round(crackleVolume * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={crackleVolume}
          onChange={(e) => onCrackleVolumeChange(parseFloat(e.target.value))}
          disabled={!vinylEnabled}
          className={`${SLIDER_CLASS} disabled:opacity-50`}
        />
      </div>
    </div>
  );
}
