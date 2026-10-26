"use client";

import { cn } from "@/lib/utils";
import "./styles.css";

export interface PlayerCDProps {
  isPlaying: boolean;
  albumTitle?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: { disc: "w-16 h-16", hole: "w-4 h-4", text: "w-16" },
  md: { disc: "w-32 h-32", hole: "w-8 h-8", text: "w-32" },
  lg: { disc: "w-48 h-48", hole: "w-12 h-12", text: "w-48" },
};

export function PlayerCD({
  isPlaying,
  albumTitle,
  size = "md",
  className,
}: PlayerCDProps) {
  const sizes = sizeClasses[size];

  return (
    <div className={cn("relative", className)}>
      {/* CD Disc */}
      <div
        className={cn(
          "cd-disc rounded-full flex items-center justify-center relative",
          sizes.disc,
          isPlaying && "playing"
        )}
      >
        {/* Rainbow overlay */}
        <div className="cd-rainbow absolute inset-0 rounded-full opacity-60" />

        {/* Center Hole */}
        <div className={cn("cd-hole rounded-full relative z-10", sizes.hole)} />
      </div>

      {/* Marquee text when playing */}
      {albumTitle && isPlaying && size !== "sm" && (
        <div className={cn("overflow-hidden mt-2", sizes.text)}>
          <p className="cd-marquee text-[10px] text-white/80 whitespace-nowrap">
            ♪ {albumTitle} ♪
          </p>
        </div>
      )}
    </div>
  );
}
