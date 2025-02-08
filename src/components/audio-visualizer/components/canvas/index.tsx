import React from "react";
import { useWindowSize } from "@uidotdev/usehooks";

import type {
  GetCanvasReturnType,
  Canvas2DContextType,
  BarDimensionsType,
  BarColorType,
  HeightsArrayType,
} from "./types";

import { BAR_RADIUS, MAX_HEIGTH, SCALE_HEIGHT } from "./const";

const useCanvas = () => {
  const { width, height } = useWindowSize();

  const ref = React.useRef<HTMLCanvasElement>(null);

  const [canvasContext, setCanvasContext] =
    React.useState<Canvas2DContextType>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const canvas = ref.current;

    canvas.width = width ?? 0;
    canvas.height = height ?? 0;

    setCanvasContext(canvas.getContext("2d"));
  }, [ref.current]);

  const clearCanvas = () => {
    if (!canvasContext) return;

    canvasContext.reset();
  };

  const drawSingleBar = (
    { x, h, w }: BarDimensionsType,
    { r, g, b }: BarColorType,
  ) => {
    if (!canvasContext) return;

    canvasContext.fillStyle = `rgb(${r},${g},${b})`;
    canvasContext.beginPath();
    canvasContext.roundRect(x, (height ?? 0) - h, w, h, [
      BAR_RADIUS,
      BAR_RADIUS,
      0,
      0,
    ]);
    canvasContext.fill();
  };

  const drawBars = (audioArray: HeightsArrayType) => {
    const numberOfBars = audioArray.length;
    const barWidth = (width ?? 0) / numberOfBars;

    let xOffset = 0;

    for (let i = 0; i < numberOfBars; i++) {
      const barHeight =
        ((audioArray[i] ?? 0) / (MAX_HEIGTH / SCALE_HEIGHT)) * (height ?? 0);

      drawSingleBar(
        { x: xOffset, h: barHeight, w: barWidth },
        {
          r: barHeight,
          g: barHeight,
          b: barHeight,
        },
      );

      xOffset += barWidth + 1;
    }
  };

  const drawBarsFrame = (heightsArray: HeightsArrayType) => {
    clearCanvas();
    drawBars(heightsArray);
  };

  return { ref, drawBarsFrame };
};

export const getCanvas = (): GetCanvasReturnType => {
  const { ref, drawBarsFrame } = useCanvas();

  const element = (
    <canvas
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 -z-10 h-full w-full mix-blend-soft-light"
    />
  );

  return [element, { drawBarsFrame }];
};
