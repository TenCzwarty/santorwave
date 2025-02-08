/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
 * [...] most of the frequencies will come back as having no audio in them,
 * as most of the sounds we hear every day are in a certain lower frequency range [...]
 *
 * we are cutting off "empty" frequencies using the RANGE const
 */

const RANGE = 0.58;
const SMOOTHING_TIME = 0.9; // IMPORTANT do not set smoothingTimeConstant to 1 - all frequencies will equal to 0

export const createAudioAnalyser = (htmlAudioElement: HTMLAudioElement) => {
  const context = new AudioContext();

  const analyser = context.createAnalyser();
  const source = context.createMediaElementSource(htmlAudioElement);

  source.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = SMOOTHING_TIME;

  const frequency = Math.floor(analyser.frequencyBinCount * RANGE);
  const audioArray = new Uint8Array(frequency);

  return { analyser, audioArray };
};
