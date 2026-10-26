"use client";

import { cn } from "@/lib/utils";
import "./styles.css";

export interface PlayerCassetteProps {
  isPlaying: boolean;
  albumTitle?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: { width: 80, height: 52, reelSize: 14, labelHeight: 18, textWidth: "w-20" },
  md: { width: 140, height: 90, reelSize: 24, labelHeight: 30, textWidth: "w-36" },
  lg: { width: 200, height: 130, reelSize: 36, labelHeight: 44, textWidth: "w-52" },
};

export function PlayerCassette({
  isPlaying,
  albumTitle,
  size = "md",
  className,
}: PlayerCassetteProps) {
  const config = sizeConfig[size];

  return (
    <div className={cn("relative", className)}>
      {/* Cassette Body */}
      <div
        className="cassette-body rounded-lg relative overflow-hidden"
        style={{ width: config.width, height: config.height }}
      >
        {/* Label */}
        <div
          className="cassette-label absolute left-2 right-2 top-1 rounded flex items-center justify-center overflow-hidden"
          style={{ height: config.labelHeight }}
        >
          {albumTitle && (
            <span
              className="text-gray-700 font-medium truncate px-1"
              style={{ fontSize: size === "sm" ? 6 : size === "md" ? 8 : 10 }}
            >
              {albumTitle.slice(0, 20)}
            </span>
          )}
        </div>

        {/* Tape Window */}
        <div
          className="cassette-window absolute left-1/2 -translate-x-1/2 rounded flex items-center justify-around px-2"
          style={{
            top: config.labelHeight + 8,
            width: config.width * 0.75,
            height: config.height - config.labelHeight - 16,
          }}
        >
          {/* Left Reel */}
          <div
            className={cn("cassette-reel rounded-full", isPlaying && "playing")}
            style={{ width: config.reelSize, height: config.reelSize }}
          />

          {/* Tape */}
          <div
            className="cassette-tape flex-1 mx-1"
            style={{ height: 2 }}
          />

          {/* Right Reel */}
          <div
            className={cn("cassette-reel rounded-full", isPlaying && "playing")}
            style={{ width: config.reelSize, height: config.reelSize }}
          />
        </div>

        {/* Screws */}
        <div className="cassette-screw absolute bottom-1 left-2 w-2 h-2 rounded-full" />
        <div className="cassette-screw absolute bottom-1 right-2 w-2 h-2 rounded-full" />
      </div>

      {/* Marquee text when playing */}
      {albumTitle && isPlaying && size !== "sm" && (
        <div className={cn("overflow-hidden mt-2", config.textWidth)}>
          <p className="cassette-marquee text-[10px] text-white/80 whitespace-nowrap">
            ♪ {albumTitle} ♪
          </p>
        </div>
      )}

      {/* Playing indicator */}
      {isPlaying && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      )}
    </div>
  );
}
