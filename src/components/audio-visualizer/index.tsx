"use client";

import React from "react";

import { useAudio } from "./components/audio";
import { useCanvas } from "./components/canvas";

import { Play, Pause, Loader } from "lucide-react";

export const AudioVisualizer = () => {
  const [isPaused, setIsPaused] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [canvasElement, canvas] = useCanvas();
  const [audioElement, audio] = useAudio("/warszawave.mp3");

  const animationFrameId = React.useRef(0);

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

  const onPlay = async () => {
    setIsPlaying(true);
    setIsPaused(false);
    await audio.play(renderFrame);
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
