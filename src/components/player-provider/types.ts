import type { AudioChain } from "@/lib/audio";

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  type?: string; // For showing vinyl/cd/cassette player
}

export interface PlayOptions {
  loop?: boolean;
}

export interface CrackleControls {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  /** 0–1 */
  volume: number;
  setVolume: (volume: number) => void;
}

export interface PlayerContextValue {
  // State
  isPlaying: boolean;
  currentTrack: TrackInfo | null;

  // Actions. `playTrack` toggles pause when called with the current track.
  playTrack: (
    url: string,
    trackInfo: TrackInfo,
    options?: PlayOptions,
  ) => Promise<void>;
  /** Resumes the current track, if there is one. */
  resume: () => Promise<void>;
  pause: () => void;
  stop: () => Promise<void>;

  /** The effects chain of the one global `<audio>` element. */
  chain: AudioChain;
  /** Music volume, 0–1. */
  volume: number;
  setVolume: (volume: number) => void;
  crackle: CrackleControls;
}
