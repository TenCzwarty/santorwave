"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  GroupBox,
  Separator,
  Slider,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";

import type { CrackleControls } from "@/components/player-provider/types";
import {
  DEFAULT_AUDIO_EFFECTS,
  isVaporwavePreset,
  MAX_SPEED,
  MIN_SPEED,
  VAPORWAVE_AUDIO_EFFECTS,
  type AudioChain,
} from "@/lib/audio";

const WINDOW_WIDTH = 280;
const WINDOW_HEIGHT = 450;
const EDGE_MARGIN = 20;

type AudioEffectsProps = {
  /** The effects chain owned by the player provider. */
  chain: AudioChain;
  /** Vinyl crackle, also owned by the player provider. */
  crackle: CrackleControls;
  /** Track info to display */
  trackInfo?: {
    title: string;
    artist: string;
    coverUrl?: string;
  };
  /** Callback when stop is clicked */
  onStop?: () => void | Promise<void>;
  /** Whether audio is currently playing */
  isPlaying?: boolean;
};

// Slider is 0-100; map it onto the MIN_SPEED..MAX_SPEED range.
const SPEED_RANGE = MAX_SPEED - MIN_SPEED;
const speedToSlider = (speed: number) =>
  Math.round(((speed - MIN_SPEED) / SPEED_RANGE) * 100);
const sliderToSpeed = (value: number) =>
  MIN_SPEED + (value / 100) * SPEED_RANGE;

/**
 * The floating Win95 window that drives the audio chain. Purely UI — the Web
 * Audio graph lives in `useAudioChain`.
 */
export const AudioEffects = ({
  chain,
  crackle,
  trackInfo,
  onStop,
  isPlaying = true,
}: AudioEffectsProps) => {
  const { effects, setEffect, applyPreset, isFadingOut, fadeOut } = chain;
  const vaporwave = isVaporwavePreset(effects);

  const [coverFailed, setCoverFailed] = useState(false);
  useEffect(() => setCoverFailed(false), [trackInfo?.coverUrl]);

  // Window drag state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const maxX = window.innerWidth - WINDOW_WIDTH;
      const maxY = window.innerHeight - 100;

      setPosition({
        x: Math.max(0, Math.min(e.clientX - dragOffset.current.x, maxX)),
        y: Math.max(0, Math.min(e.clientY - dragOffset.current.y, maxY)),
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  /**
   * Park the window bottom-right the first time it appears. `null` rather than
   * `{x: 0, y: 0}` as the initial value, so dragging it into the top-left
   * corner does not look like "never positioned" and snap it back.
   */
  useEffect(() => {
    if (!isPlaying || position) return;

    setPosition({
      x: window.innerWidth - WINDOW_WIDTH - EDGE_MARGIN,
      y: window.innerHeight - WINDOW_HEIGHT,
    });
  }, [isPlaying, position]);

  const toggleVaporwave = () => {
    applyPreset(vaporwave ? DEFAULT_AUDIO_EFFECTS : VAPORWAVE_AUDIO_EFFECTS);
  };

  // `onStop` (the provider's `stop`) already fades out; fading here as well
  // ran two back-to-back fades and doubled the wait.
  const handleFadeOutAndStop = async () => {
    if (isFadingOut) return;
    await (onStop ? onStop() : fadeOut());
  };

  if (!isPlaying || !position) return null;

  return (
    <div
      ref={windowRef}
      className="fixed z-50"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      <Window style={{ width: WINDOW_WIDTH }}>
        <WindowHeader
          className="flex select-none items-center justify-between gap-2"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={handleMouseDown}
        >
          <div className="marquee-container pointer-events-none min-w-0 flex-1">
            <span className="marquee-text">
              {trackInfo
                ? `${trackInfo.title} — ${trackInfo.artist}`
                : "Audio Player"}
            </span>
          </div>
          {onStop && (
            <Button
              size="sm"
              onClick={handleFadeOutAndStop}
              disabled={isFadingOut}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <span style={{ fontWeight: "bold" }}>×</span>
            </Button>
          )}
        </WindowHeader>

        <WindowContent>
          {trackInfo && (
            <div className="mb-3 flex items-center gap-3">
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center border-2 border-gray-400 bg-black text-2xl"
                style={{ borderStyle: "inset" }}
              >
                {trackInfo.coverUrl && !coverFailed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={trackInfo.coverUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={() => setCoverFailed(true)}
                  />
                ) : (
                  <span aria-hidden>💿</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{trackInfo.title}</p>
                <p className="truncate text-xs">{trackInfo.artist}</p>
              </div>
            </div>
          )}

          <Separator className="my-2" />

          <Button
            fullWidth
            active={vaporwave || undefined}
            onClick={toggleVaporwave}
            style={{ marginBottom: 8 }}
          >
            ✨ {vaporwave ? "Vaporwave ON" : "Enable Vaporwave"}
          </Button>

          <GroupBox
            label={`Speed: ${effects.speed.toFixed(2)}x`}
            className="mb-2"
          >
            <Slider
              min={0}
              max={100}
              value={speedToSlider(effects.speed)}
              onChange={(value) => setEffect("speed", sliderToSpeed(value))}
              marks={[
                { value: 0, label: `${MIN_SPEED.toFixed(1)}x` },
                { value: 50, label: "0.8x" },
                { value: 100, label: `${MAX_SPEED.toFixed(1)}x` },
              ]}
            />
          </GroupBox>

          <GroupBox label="Effects" className="mb-2">
            <div className="win95-checkbox-list">
              <Checkbox
                checked={effects.pitchShift}
                onChange={() => setEffect("pitchShift", !effects.pitchShift)}
                label="Pitch follows speed (vinyl)"
              />
              <Checkbox
                checked={effects.lofi}
                onChange={() => setEffect("lofi", !effects.lofi)}
                label="Lo-Fi filter"
              />
              <Checkbox
                checked={effects.reverb}
                onChange={() => setEffect("reverb", !effects.reverb)}
                label="Reverb"
              />
              <Checkbox
                checked={crackle.enabled}
                onChange={() => crackle.setEnabled(!crackle.enabled)}
                label="Vinyl crackle"
              />
            </div>
          </GroupBox>

          {onStop && (
            <Button
              fullWidth
              onClick={handleFadeOutAndStop}
              disabled={isFadingOut}
            >
              {isFadingOut ? "Fading out..." : "⏹ Stop"}
            </Button>
          )}
        </WindowContent>
      </Window>
    </div>
  );
};
