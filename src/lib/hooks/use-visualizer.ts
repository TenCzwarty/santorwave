"use client";

import { useEffect, useRef } from "react";

import { useCanvas } from "@/components/audio-visualizer/components/canvas";
import { ANALYSER_RANGE } from "@/lib/audio";

/**
 * Draws the frequency bars for `analyser` for as long as one is attached.
 *
 * The animation loop lives in an effect keyed on the analyser, so swapping or
 * detaching one always cancels the previous frame. The old callback-based API
 * (`handleAnalyserReady`) could start a second loop on top of a running one,
 * which drew the canvas twice per frame.
 */
export function useVisualizer(analyser: AnalyserNode | null) {
  const [canvasElement, canvas] = useCanvas();

  // `canvas` is a fresh object each render; read it through a ref so the effect
  // does not restart on every parent render.
  const canvasRef = useRef(canvas);
  canvasRef.current = canvas;

  useEffect(() => {
    if (!analyser) return;

    const binCount = Math.floor(analyser.frequencyBinCount * ANALYSER_RANGE);
    const audioArray = new Uint8Array(binCount);
    let frame = 0;

    const renderFrame = () => {
      analyser.getByteFrequencyData(audioArray);
      canvasRef.current.drawBarsFrame(audioArray);
      frame = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => cancelAnimationFrame(frame);
  }, [analyser]);

  return canvasElement;
}
