import React from "react";

import { createAudioAnalyser } from "./create-audio-analyser";

import type { AudioArrayType } from "../types";

type AnalyserType = AnalyserNode | null;

type UseAudioAnalyserReturnType = [
  React.RefObject<HTMLAudioElement>,
  {
    getCurrentAudioArray: () =>
      | {
          audioArray: AudioArrayType;
          isQuiet: boolean;
        }
      | undefined;
  },
];

export const useAudioAnalyser = (): UseAudioAnalyserReturnType => {
  const ref = React.useRef<HTMLAudioElement>(null);

  const [analyser, setAnalyser] = React.useState<AnalyserType>(null);
  const [audioArray, setAudioArray] = React.useState<AudioArrayType>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const { analyser, audioArray } = createAudioAnalyser(ref.current);

    setAnalyser(analyser);
    setAudioArray(audioArray);
  }, [ref.current]);

  const getCurrentAudioArray = () => {
    if (!analyser) return;
    if (!audioArray) return;

    analyser.getByteFrequencyData(audioArray);

    const isQuiet = audioArray.every((value) => value === 0);

    return { audioArray, isQuiet };
  };

  return [ref, { getCurrentAudioArray }];
};
