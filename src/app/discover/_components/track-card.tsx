"use client";

import Image from "next/image";
import { Pause } from "lucide-react";
import type { DeezerTrack } from "../_lib/types";

interface TrackCardProps {
  track: DeezerTrack;
  isPlaying: boolean;
  onSelect: () => void;
}

export function TrackCard({ track, isPlaying, onSelect }: TrackCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`group relative bg-theme-glass rounded-xl p-3 border transition-all text-left hover:bg-theme-glass-hover hover:scale-[1.02] ${
        isPlaying
          ? "border-theme-accent ring-2 ring-theme-accent/50"
          : "border-theme-glass-border"
      }`}
    >
      {/* Album Cover */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
        <Image
          src={track.album.cover_medium}
          alt={track.album.title}
          fill
          className="object-cover saturate-75"
          unoptimized
        />
        {/* Vaporwave gradient overlay */}
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-60 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #ff6b9d 0%, transparent 50%, #00d4ff 100%)"
          }}
        />
        {/* Scanline effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
          }}
        />
        {/* Play/Pause overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center ${
            isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-theme-glass backdrop-blur-sm flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
            )}
          </div>
        </div>
        {/* Now playing indicator */}
        {isPlaying && (
          <div className="absolute bottom-2 right-2 flex items-end gap-0.5">
            <div className="w-1 h-3 bg-theme-accent rounded-full animate-pulse" />
            <div
              className="w-1 h-4 bg-theme-highlight rounded-full animate-pulse"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-1 h-2 bg-theme-accent rounded-full animate-pulse"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}
      </div>

      {/* Track Info */}
      <h3 className="font-medium text-sm truncate text-theme-text-primary">{track.title}</h3>
      <p className="text-xs text-theme-text-secondary truncate">{track.artist.name}</p>
    </button>
  );
}
