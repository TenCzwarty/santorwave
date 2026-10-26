"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { AudioEffects } from "@/components/audio-effects";
import { useAudioChain } from "@/lib/audio";
import { useVisualizer } from "@/lib/hooks/use-visualizer";

import { PlayerContext } from "./context";
import type { PlayOptions, TrackInfo } from "./types";

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

  const chain = useAudioChain(audioElement);
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

  const value = useMemo(
    () => ({ isPlaying, currentTrack, playTrack, pause, stop }),
    [isPlaying, currentTrack, playTrack, pause, stop],
  );

  return (
    <PlayerContext.Provider value={value}>
      <audio ref={audioRef} crossOrigin="anonymous" onEnded={handleEnded} />

      {/* Background visualizer canvas */}
      <div className="opacity-30">{canvasElement}</div>

      <AudioEffects
        chain={chain}
        isPlaying={isPlaying}
        trackInfo={currentTrack ?? undefined}
        onStop={stop}
      />

      {children}
    </PlayerContext.Provider>
  );
}

// Re-export hook and types
export { usePlayer } from "./context";
export type { TrackInfo, PlayOptions, PlayerContextValue } from "./types";
