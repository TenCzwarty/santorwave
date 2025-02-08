"use client";

import React from "react";

import { useAudioAnalyser } from "./helpers/use-audio-analyser";

import type { GetAudioReturnType } from "./types";

const useAudio = () => {
  const [isPaused, setIsPaused] = React.useState(true);

  const [ref, analyser] = useAudioAnalyser();

  const play = (onPlay: VoidFunction) => {
    if (!ref?.current) return;
    if (!isPaused) return;

    ref.current.play();
    onPlay();
  };

  const pause = () => {
    if (!ref?.current) return;

    ref.current.pause();
  };

  const getCurrentAudioArray = () => {
    if (!ref?.current) return;

    const currentAudioArray = analyser.getCurrentAudioArray();

    if (!currentAudioArray) return;

    const { audioArray, isQuiet } = currentAudioArray;

    const isAudioPaused = ref.current.paused && isQuiet;

    setIsPaused(isAudioPaused);

    return { audioArray, isPaused: isAudioPaused };
  };

  return { ref, play, pause, getCurrentAudioArray };
};

export const getAudio = (src: string): GetAudioReturnType => {
  const { ref, play, pause, getCurrentAudioArray } = useAudio();

  const element = <audio ref={ref} className="hidden" src={src} />;

  return [element, { play, pause, getCurrentAudioArray }];
};
