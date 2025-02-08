"use client";

import React from "react";

import { getAudio } from "./components/audio";
import { getCanvas } from "./components/canvas";

import { Play, Pause, Loader } from "lucide-react";

export const AudioVisualizer = () => {
  const [isPaused, setIsPaused] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [canvasElement, canvas] = getCanvas();
  const [audioElement, audio] = getAudio("/warszawave.mp3");

  let animationFrameId = React.useRef(0);

  const renderFrame = () => {
    animationFrameId.current = requestAnimationFrame(renderFrame);

    const currentAudioArray = audio.getCurrentAudioArray();

    if (!currentAudioArray) return;

    const { audioArray, isPaused } = currentAudioArray;

    if (!audioArray) return;
    canvas.drawBarsFrame(audioArray);

    if (isPaused) {
      setIsPlaying(false);
      cancelAnimationFrame(animationFrameId.current);
    }
  };

  const onPlay = () => {
    setIsPlaying(true);
    setIsPaused(false);
    audio.play(renderFrame);
  };

  const onPause = () => {
    setIsPaused(true);
    audio.pause();
  };

  return (
    <>
      <div className="p-4">
        {isPaused && isPlaying && <Loader className="animate-spin" />}

        {!isPaused && isPlaying && (
          <button onClick={onPause}>
            <Pause />
          </button>
        )}

        {!isPlaying && (
          <button onClick={onPlay}>
            <Play />
          </button>
        )}
      </div>

      {canvasElement}
      {audioElement}
    </>
  );
};
