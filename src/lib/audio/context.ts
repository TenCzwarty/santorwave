"use client";

/**
 * One `AudioContext` for the whole app.
 *
 * Chrome caps a page at roughly six contexts and refuses to create more, so a
 * context per track (which is what we used to do) eventually kills playback
 * outright. Everything shares this one instead.
 */
let sharedContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  sharedContext ??= new AudioContext();
  return sharedContext;
}

/**
 * Contexts start out `suspended` under the autoplay policy, and a suspended
 * context's `currentTime` does not advance — which silently breaks every
 * `linearRampToValueAtTime` fade. Call this from a user gesture before scheduling
 * anything.
 */
export async function resumeAudioContext(): Promise<AudioContext> {
  const context = getAudioContext();
  if (context.state === "suspended") {
    await context.resume();
  }
  return context;
}

/**
 * `createMediaElementSource` may only be called once per element — a second
 * call throws `InvalidStateError`. Cache the node so re-running setup is safe.
 */
const sourceNodes = new WeakMap<
  HTMLMediaElement,
  MediaElementAudioSourceNode
>();

export function getMediaElementSource(
  element: HTMLMediaElement,
): MediaElementAudioSourceNode {
  const existing = sourceNodes.get(element);
  if (existing) return existing;

  const source = getAudioContext().createMediaElementSource(element);
  sourceNodes.set(element, source);
  return source;
}
