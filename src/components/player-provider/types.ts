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
  pause: () => void;
  stop: () => Promise<void>;
}
