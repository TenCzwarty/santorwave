export type AudioEffectsState = {
  /** Playback rate, 0.6–1.0. */
  speed: number;
  /** `true` = slowing down also lowers pitch, the way a record does. */
  pitchShift: boolean;
  lofi: boolean;
  reverb: boolean;
};

export const DEFAULT_AUDIO_EFFECTS: AudioEffectsState = {
  speed: 1,
  pitchShift: true,
  lofi: false,
  reverb: false,
};

export const VAPORWAVE_AUDIO_EFFECTS: AudioEffectsState = {
  speed: 0.8,
  pitchShift: true,
  lofi: true,
  reverb: true,
};

/**
 * The vaporwave button is a preset, not a fifth piece of state — derive whether
 * it is "on" instead of tracking it separately and letting the two desync.
 */
export function isVaporwavePreset(effects: AudioEffectsState): boolean {
  return (
    effects.speed === VAPORWAVE_AUDIO_EFFECTS.speed &&
    effects.lofi &&
    effects.reverb
  );
}
