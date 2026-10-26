/** Lowpass cutoff when the lo-fi filter is on. */
export const LOFI_CUTOFF_HZ = 1800;
/** Effectively "no filtering" — above human hearing. */
export const OPEN_CUTOFF_HZ = 20000;
export const LOFI_Q = 0.7;

export const REVERB_DURATION_SECONDS = 2.5;
export const REVERB_DECAY = 2.5;
/** Wet/dry mix used when reverb is on. */
export const REVERB_WET_GAIN = 0.5;
export const REVERB_DRY_GAIN = 0.8;

/** Fade in/out length, in seconds. */
export const FADE_DURATION_SECONDS = 1.5;

export const ANALYSER_FFT_SIZE = 256;
export const ANALYSER_SMOOTHING = 0.9;
/** Fraction of the frequency bins the visualizer draws (the top end is quiet). */
export const ANALYSER_RANGE = 0.58;

export const MIN_SPEED = 0.6;
export const MAX_SPEED = 1;
