export type HeightsArrayType = Uint8Array<ArrayBufferLike>;
export type Canvas2DContextType = CanvasRenderingContext2D | null;

export type GetCanvasReturnType = [
  React.ReactNode,
  { drawBarsFrame: (audioArray: HeightsArrayType) => void },
];

export type BarDimensionsType = {
  x: number;
  h: number;
  w: number;
};

export type BarColorType = {
  r: number;
  g: number;
  b: number;
};
