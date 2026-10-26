/**
 * A cheap synthetic impulse response: white noise with an exponential decay
 * envelope. Not a real room, but it is convincing enough for the aesthetic and
 * saves shipping an impulse WAV.
 */
export function createReverbImpulse(
  context: BaseAudioContext,
  durationSeconds: number,
  decay: number,
): AudioBuffer {
  const { sampleRate } = context;
  const length = Math.floor(sampleRate * durationSeconds);
  const impulse = context.createBuffer(2, length, sampleRate);

  for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
    const channelData = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      channelData[i] =
        (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }

  return impulse;
}
