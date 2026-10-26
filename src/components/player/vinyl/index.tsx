"use client";

import { cn } from "@/lib/utils";
import "./styles.css";

export interface PlayerVinylProps {
  isPlaying: boolean;
  albumTitle?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: { record: "w-16 h-16", label: "w-6 h-6", hole: "w-1.5 h-1.5", text: "w-16" },
  md: { record: "w-32 h-32", label: "w-12 h-12", hole: "w-2 h-2", text: "w-32" },
  lg: { record: "w-48 h-48", label: "w-16 h-16", hole: "w-3 h-3", text: "w-48" },
};

export function PlayerVinyl({
  isPlaying,
  albumTitle,
  size = "md",
  className,
}: PlayerVinylProps) {
  const sizes = sizeClasses[size];

  return (
    <div className={cn("relative", className)}>
      {/* Vinyl Record */}
      <div
        className={cn(
          "vinyl-record rounded-full flex items-center justify-center",
          sizes.record,
          isPlaying && "playing"
        )}
      >
        {/* Center Label */}
        <div
          className={cn(
            "vinyl-label rounded-full flex items-center justify-center",
            sizes.label
          )}
        >
          {/* Center Hole */}
          <div className={cn("vinyl-hole rounded-full", sizes.hole)} />
        </div>
      </div>

      {/* Marquee text when playing */}
      {albumTitle && isPlaying && size !== "sm" && (
        <div className={cn("overflow-hidden mt-2", sizes.text)}>
          <p className="vinyl-marquee text-[10px] text-white/80 whitespace-nowrap">
            ♪ {albumTitle} ♪
          </p>
        </div>
      )}
    </div>
  );
}
