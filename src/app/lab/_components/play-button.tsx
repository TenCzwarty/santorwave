"use client";

import { Play, Pause } from "lucide-react";

interface PlayButtonProps {
  isPlaying: boolean;
  isFadingOut: boolean;
  onToggle: () => void;
}

export function PlayButton({ isPlaying, isFadingOut, onToggle }: PlayButtonProps) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={onToggle}
        disabled={isFadingOut}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isFadingOut
            ? "bg-theme-accent/50 animate-pulse"
            : "theme-button hover:scale-105"
        }`}
      >
        {isPlaying ? (
          <Pause className="w-7 h-7" />
        ) : (
          <Play className="w-7 h-7 ml-1" />
        )}
      </button>
    </div>
  );
}
