"use client";

interface VinylVisualProps {
  isPlaying: boolean;
  isFadingOut: boolean;
  speed: number;
}

export function VinylVisual({ isPlaying, isFadingOut, speed }: VinylVisualProps) {
  return (
    <div className="flex justify-center mb-8">
      <div
        className={`relative w-40 h-40 ${isPlaying && !isFadingOut ? "animate-spin" : ""}`}
        style={{ animationDuration: `${3 / speed}s` }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-xl" />
        <div className="absolute inset-2 rounded-full border-4 border-neutral-700/50" />
        <div className="absolute inset-5 rounded-full border-2 border-neutral-700/30" />
        <div className="absolute inset-8 rounded-full border border-neutral-700/20" />
        <div className="absolute inset-11 rounded-full border border-neutral-700/10" />
        <div className="absolute inset-14 rounded-full bg-theme-accent flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-neutral-900" />
        </div>
      </div>
    </div>
  );
}
