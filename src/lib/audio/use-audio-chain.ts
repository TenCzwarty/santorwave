"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  ANALYSER_FFT_SIZE,
  ANALYSER_SMOOTHING,
  FADE_DURATION_SECONDS,
  LOFI_CUTOFF_HZ,
  LOFI_Q,
  OPEN_CUTOFF_HZ,
  REVERB_DECAY,
  REVERB_DRY_GAIN,
  REVERB_DURATION_SECONDS,
  REVERB_WET_GAIN,
} from "./constants";
import {
  getAudioContext,
  getMediaElementSource,
  resumeAudioContext,
} from "./context";
import { createReverbImpulse } from "./reverb";
import { DEFAULT_AUDIO_EFFECTS, type AudioEffectsState } from "./types";

type ChainNodes = {
  lofi: BiquadFilterNode;
  dry: GainNode;
  wet: GainNode;
  analyser: AnalyserNode;
  master: GainNode;
};

type UseAudioChainOptions = {
  initialEffects?: Partial<AudioEffectsState>;
  /** Target gain for `fadeIn`, 0–1. */
  volume?: number;
};

export type AudioChain = ReturnType<typeof useAudioChain>;

/**
 * Builds and owns the vaporwave effects chain for one `<audio>` element:
 *
 *   source → lofi ─┬─────────────────→ dry ─┬→ analyser → master → destination
 *                  └→ convolver → wet ──────┘
 *
 * Speed and pitch live on the element itself (`playbackRate` /
 * `preservesPitch`); everything else is Web Audio nodes.
 *
 * This used to exist twice — once inside the floating `AudioEffects` window and
 * once inline in the Audio Lab page — and the two copies had already drifted
 * apart. One implementation, two consumers.
 */
export function useAudioChain(
  audioElement: HTMLAudioElement | null,
  { initialEffects, volume = 1 }: UseAudioChainOptions = {},
) {
  const [effects, setEffects] = useState<AudioEffectsState>(() => ({
    ...DEFAULT_AUDIO_EFFECTS,
    ...initialEffects,
  }));
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const nodesRef = useRef<ChainNodes | null>(null);
  const builtForRef = useRef<HTMLAudioElement | null>(null);
  const fadeOutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read inside callbacks without making them depend on the value.
  const effectsRef = useRef(effects);
  effectsRef.current = effects;
  const volumeRef = useRef(volume);
  volumeRef.current = volume;

  /** Build the graph for `element`, or return the graph already built for it. */
  const buildChain = useCallback((element: HTMLAudioElement): ChainNodes => {
    if (builtForRef.current === element && nodesRef.current) {
      return nodesRef.current;
    }

    const context = getAudioContext();
    const source = getMediaElementSource(element);
    const current = effectsRef.current;

    const lofi = context.createBiquadFilter();
    lofi.type = "lowpass";
    lofi.frequency.value = current.lofi ? LOFI_CUTOFF_HZ : OPEN_CUTOFF_HZ;
    lofi.Q.value = LOFI_Q;

    const convolver = context.createConvolver();
    convolver.buffer = createReverbImpulse(
      context,
      REVERB_DURATION_SECONDS,
      REVERB_DECAY,
    );

    const wet = context.createGain();
    wet.gain.value = current.reverb ? REVERB_WET_GAIN : 0;

    const dry = context.createGain();
    dry.gain.value = current.reverb ? REVERB_DRY_GAIN : 1;

    const analyserNode = context.createAnalyser();
    analyserNode.fftSize = ANALYSER_FFT_SIZE;
    analyserNode.smoothingTimeConstant = ANALYSER_SMOOTHING;

    const master = context.createGain();
    master.gain.value = 0; // fadeIn ramps this up

    source.connect(lofi);
    lofi.connect(dry);
    lofi.connect(convolver);
    convolver.connect(wet);
    dry.connect(analyserNode);
    wet.connect(analyserNode);
    analyserNode.connect(master);
    master.connect(context.destination);

    const nodes: ChainNodes = {
      lofi,
      dry,
      wet,
      analyser: analyserNode,
      master,
    };

    nodesRef.current = nodes;
    builtForRef.current = element;
    setAnalyser(analyserNode);

    return nodes;
  }, []);

  /**
   * Call from a user gesture before playing: resumes the context (see
   * `resumeAudioContext`) and makes sure the graph exists.
   */
  const prepare = useCallback(async () => {
    if (!audioElement) return null;
    await resumeAudioContext();
    return buildChain(audioElement);
  }, [audioElement, buildChain]);

  const fadeIn = useCallback(async () => {
    const nodes = await prepare();
    if (!nodes) return;

    const context = getAudioContext();
    const { gain } = nodes.master;

    if (fadeOutTimerRef.current) {
      clearTimeout(fadeOutTimerRef.current);
      fadeOutTimerRef.current = null;
    }
    setIsFadingOut(false);

    gain.cancelScheduledValues(context.currentTime);
    gain.setValueAtTime(gain.value, context.currentTime);
    gain.linearRampToValueAtTime(
      volumeRef.current,
      context.currentTime + FADE_DURATION_SECONDS,
    );
  }, [prepare]);

  /** Ramps to silence and resolves once the ramp has finished. */
  const fadeOut = useCallback(async () => {
    const nodes = nodesRef.current;
    if (!nodes) return;

    const context = await resumeAudioContext();
    const { gain } = nodes.master;

    setIsFadingOut(true);
    gain.cancelScheduledValues(context.currentTime);
    gain.setValueAtTime(gain.value, context.currentTime);
    gain.linearRampToValueAtTime(0, context.currentTime + FADE_DURATION_SECONDS);

    await new Promise<void>((resolve) => {
      fadeOutTimerRef.current = setTimeout(() => {
        fadeOutTimerRef.current = null;
        resolve();
      }, FADE_DURATION_SECONDS * 1000);
    });

    setIsFadingOut(false);
  }, []);

  const setEffect = useCallback(
    <K extends keyof AudioEffectsState>(key: K, value: AudioEffectsState[K]) => {
      setEffects((previous) => ({ ...previous, [key]: value }));
    },
    [],
  );

  const applyPreset = useCallback((preset: AudioEffectsState) => {
    setEffects(preset);
  }, []);

  // --- push state into the graph / element -------------------------------

  useEffect(() => {
    if (audioElement) audioElement.playbackRate = effects.speed;
  }, [audioElement, effects.speed]);

  useEffect(() => {
    // preservesPitch === false means pitch follows speed, i.e. vinyl-style.
    if (audioElement) audioElement.preservesPitch = !effects.pitchShift;
  }, [audioElement, effects.pitchShift]);

  useEffect(() => {
    const nodes = nodesRef.current;
    if (!nodes) return;
    nodes.lofi.frequency.value = effects.lofi
      ? LOFI_CUTOFF_HZ
      : OPEN_CUTOFF_HZ;
  }, [effects.lofi]);

  useEffect(() => {
    const nodes = nodesRef.current;
    if (!nodes) return;
    nodes.wet.gain.value = effects.reverb ? REVERB_WET_GAIN : 0;
    nodes.dry.gain.value = effects.reverb ? REVERB_DRY_GAIN : 1;
  }, [effects.reverb]);

  // Only on an actual volume change. Keying this on `isFadingOut` too would
  // slam the gain back to full the moment a fade-out finished, which undid both
  // the fade-out and the next fade-in.
  const isFadingOutRef = useRef(isFadingOut);
  isFadingOutRef.current = isFadingOut;

  useEffect(() => {
    const nodes = nodesRef.current;
    if (!nodes || isFadingOutRef.current) return;
    // Assigning `.value` is ignored while a fade-in ramp is still scheduled,
    // so drop the ramp and jump straight to the new volume.
    const { gain } = nodes.master;
    const now = getAudioContext().currentTime;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(volume, now);
  }, [volume]);

  useEffect(
    () => () => {
      if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);
    },
    [],
  );

  return {
    effects,
    setEffect,
    applyPreset,
    analyser,
    isFadingOut,
    prepare,
    fadeIn,
    fadeOut,
  };
}
