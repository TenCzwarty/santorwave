"use client";

import { Play, Pause } from "lucide-react";
import { PlayerVinyl, PlayerCD, PlayerCassette } from "@/components/player";
import { cn } from "@/lib/utils";

import type { Release, ReleaseType } from "../_lib/types";
import {
  TYPE_CONFIG,
  DEFAULT_TYPE_CONFIG,
  getAlbumPattern,
  getPlayerType,
} from "../_lib/constants";

interface ReleaseCardProps {
  item: Release;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export function ReleaseCard({
  item,
  isPlaying,
  onPlay,
  onPause,
}: ReleaseCardProps) {
  const config = TYPE_CONFIG[item.type as ReleaseType] ?? DEFAULT_TYPE_CONFIG;
  const IconComponent = config.icon;
  const title = item.title ?? "Unknown Title";

  return (
    <div
      className={cn(
        "release-card group relative overflow-hidden rounded-2xl",
        "bg-theme-glass backdrop-blur-md",
        "border border-theme-glass-border",
        "shadow-lg",
        isPlaying && "ring-2 ring-theme-accent ring-offset-2 ring-offset-transparent"
      )}
    >
      {/* Album Art / Cover */}
      <div
        className="relative aspect-square overflow-hidden"
        style={{ background: getAlbumPattern(item.id) }}
      >
        {/* Scanline overlay */}
        <div className="scanlines absolute inset-0" />

        {/* Pattern overlay for texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Artist initials watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-white/20 select-none">
            {item.artist
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>

        {/* Media player - shown when playing (based on type) */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 animate-in fade-in duration-300">
            {getPlayerType(item.type) === "cd" ? (
              <PlayerCD isPlaying={isPlaying} albumTitle={title} size="md" />
            ) : getPlayerType(item.type) === "cassette" ? (
              <PlayerCassette isPlaying={isPlaying} albumTitle={title} size="md" />
            ) : (
              <PlayerVinyl isPlaying={isPlaying} albumTitle={title} size="md" />
            )}
          </div>
        )}

        {/* Play/Pause button overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-black/0 transition-all duration-300",
            !isPlaying && "group-hover:bg-black/40"
          )}
        >
          {isPlaying ? (
            <button
              onClick={onPause}
              className="absolute bottom-3 right-3 p-3 rounded-full bg-theme-accent text-theme-text-primary shadow-lg hover:brightness-110 transition-all z-10"
              aria-label="Pause"
            >
              <Pause className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="p-4 rounded-full bg-theme-surface text-theme-accent shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              aria-label="Play"
            >
              <Play className="w-8 h-8 ml-1" />
            </button>
          )}
        </div>

        {/* Type badge */}
        <div
          className={cn(
            "absolute top-3 left-3 px-2.5 py-1 rounded-full type-badge",
            config.bgColor
          )}
        >
          <div className="flex items-center gap-1.5">
            <IconComponent className={cn("w-3.5 h-3.5", config.color)} />
            <span className={cn("text-xs font-medium", config.color)}>
              {config.label}
            </span>
          </div>
        </div>

        {/* Year badge */}
        {item.year && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full type-badge bg-black/30">
            <span className="text-xs font-medium text-white/90">{item.year}</span>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-theme-text-primary truncate" title={title}>
          {title}
        </h3>
        <p className="text-sm text-theme-text-secondary truncate">{item.artist}</p>
        {item.w && (
          <p className="text-xs text-theme-text-muted truncate">Label: {item.w}</p>
        )}
      </div>
    </div>
  );
}
