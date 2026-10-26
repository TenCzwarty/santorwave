"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { usePathname } from "next/navigation";

import { AudioEffects } from "@/components/audio-effects";
import { useAudioChain } from "@/lib/audio";
import { useVisualizer } from "@/lib/hooks/use-visualizer";

import { PlayerContext } from "./context";
import type { CrackleControls, PlayOptions, TrackInfo } from "./types";

const VINYL_CRACKLE_URL = "/audio/vinyl-crackle.mp3";
const DEFAULT_VOLUME = 1;
const DEFAULT_CRACKLE_VOLUME = 0.3;

/** Pages that render their own full controls for the player. */
const PAGES_WITH_OWN_CONTROLS = ["/lab"];

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  /**
   * One `<audio>` element for the lifetime of the app, with its `src` swapped
   * per track. Creating a new `Audio()` per track leaked the old element (and
   * its `ended` listener, and its source node) every time, and each one needed
   * its own `AudioContext`.
   */
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null,
  );

  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Publish the element once mounted so the effects chain can attach to it.
  useEffect(() => {
    setAudioElement(audioRef.current);
  }, []);

  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const chain = useAudioChain(audioElement, { volume });
  const { prepare, fadeIn, fadeOut } = chain;
  const canvasElement = useVisualizer(chain.analyser);

  const playTrack = useCallback(
    async (url: string, trackInfo: TrackInfo, options: PlayOptions = {}) => {
      const audio = audioRef.current;
      if (!audio) return;

      // Same track: toggle. This is the only implementation of the toggle —
      // callers used to reimplement it and get the `isPlaying` flag wrong.
      if (currentTrack?.id === trackInfo.id) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
          return;
        }

        try {
          await prepare();
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Failed to resume playback:", error);
        }
        return;
      }

      audio.loop = options.loop ?? false;
      audio.src = url;
      setCurrentTrack(trackInfo);

      try {
        // Resumes the AudioContext from within the click that got us here.
        await prepare();
        await audio.play();
        setIsPlaying(true);
        await fadeIn();
      } catch (error) {
        console.error("Failed to play:", error);
        setIsPlaying(false);
        // Forget the track, or the next click on it would take the "resume"
        // path and retry the same failed element instead of reloading it.
        setCurrentTrack(null);
      }
    },
    [currentTrack, isPlaying, prepare, fadeIn],
  );

  const resume = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    try {
      await prepare();
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to resume playback:", error);
    }
  }, [currentTrack, prepare]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(async () => {
    await fadeOut();
    audioRef.current?.pause();
    setIsPlaying(false);
    setCurrentTrack(null);
  }, [fadeOut]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTrack(null);
  }, []);

  /**
   * Vinyl crackle: a plain element straight to the speakers, outside the
   * effects chain. Lives here — not in a UI component — so the floating window
   * and the Audio Lab control the same crackle instead of each playing its own.
   */
  const crackleRef = useRef<HTMLAudioElement>(null);
  const [crackleEnabled, setCrackleEnabled] = useState(true);
  const [crackleVolume, setCrackleVolume] = useState(DEFAULT_CRACKLE_VOLUME);

  useEffect(() => {
    const crackle = crackleRef.current;
    if (!crackle) return;

    crackle.volume = crackleVolume;
    if (isPlaying && crackleEnabled) {
      crackle.play().catch(console.error);
    } else {
      crackle.pause();
    }
  }, [isPlaying, crackleEnabled, crackleVolume]);

  const crackle = useMemo<CrackleControls>(
    () => ({
      enabled: crackleEnabled,
      setEnabled: setCrackleEnabled,
      volume: crackleVolume,
      setVolume: setCrackleVolume,
    }),
    [crackleEnabled, crackleVolume],
  );

  const pathname = usePathname();
  const showFloatingControls = !PAGES_WITH_OWN_CONTROLS.includes(pathname);

  const value = useMemo(
    () => ({
      isPlaying,
      currentTrack,
      playTrack,
      resume,
      pause,
      stop,
      chain,
      volume,
      setVolume,
      crackle,
    }),
    [
      isPlaying,
      currentTrack,
      playTrack,
      resume,
      pause,
      stop,
      chain,
      volume,
      crackle,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>
      <audio ref={audioRef} crossOrigin="anonymous" onEnded={handleEnded} />
      <audio ref={crackleRef} src={VINYL_CRACKLE_URL} loop preload="auto" />

      {/* Background visualizer canvas */}
      <div className="opacity-30">{canvasElement}</div>

      {showFloatingControls && (
        <AudioEffects
          chain={chain}
          crackle={crackle}
          isPlaying={isPlaying}
          trackInfo={currentTrack ?? undefined}
          onStop={stop}
        />
      )}

      {children}
    </PlayerContext.Provider>
  );
}

// Re-export hook and types
export { usePlayer } from "./context";
export type {
  TrackInfo,
  PlayOptions,
  PlayerContextValue,
  CrackleControls,
} from "./types";
