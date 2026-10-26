"use client";

interface EffectTogglesProps {
  pitchShift: boolean;
  onPitchShiftChange: (value: boolean) => void;
  lofiEnabled: boolean;
  onLofiChange: (value: boolean) => void;
  reverbEnabled: boolean;
  onReverbChange: (value: boolean) => void;
  vinylEnabled: boolean;
  onVinylChange: (value: boolean) => void;
}

export function EffectToggles({
  pitchShift,
  onPitchShiftChange,
  lofiEnabled,
  onLofiChange,
  reverbEnabled,
  onReverbChange,
  vinylEnabled,
  onVinylChange,
}: EffectTogglesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <button
        onClick={() => onPitchShiftChange(!pitchShift)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          pitchShift
            ? "bg-theme-accent/20 text-theme-text-primary ring-2 ring-theme-accent/50"
            : "bg-theme-glass text-theme-text-muted hover:bg-theme-glass-hover"
        }`}
        title="When ON, slowing down also lowers pitch (authentic vinyl sound)"
      >
        🎵 Pitch Down
      </button>
      <button
        onClick={() => onLofiChange(!lofiEnabled)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          lofiEnabled
            ? "bg-theme-highlight/20 text-theme-text-primary ring-2 ring-theme-highlight/50"
            : "bg-theme-glass text-theme-text-muted hover:bg-theme-glass-hover"
        }`}
      >
        🎚️ Lo-Fi
      </button>
      <button
        onClick={() => onReverbChange(!reverbEnabled)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          reverbEnabled
            ? "bg-theme-accent/20 text-theme-text-primary ring-2 ring-theme-accent/50"
            : "bg-theme-glass text-theme-text-muted hover:bg-theme-glass-hover"
        }`}
      >
        🌊 Reverb
      </button>
      <button
        onClick={() => onVinylChange(!vinylEnabled)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          vinylEnabled
            ? "bg-theme-highlight/20 text-theme-text-primary ring-2 ring-theme-highlight/50"
            : "bg-theme-glass text-theme-text-muted hover:bg-theme-glass-hover"
        }`}
      >
        📀 Vinyl
      </button>
    </div>
  );
}
