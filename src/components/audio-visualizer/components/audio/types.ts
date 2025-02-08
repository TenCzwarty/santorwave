export type AudioArrayType = Uint8Array<ArrayBufferLike> | null;

export type GetAudioReturnType = [
  React.JSX.Element,
  {
    play: (onPlay: VoidFunction) => void;
    pause: () => void;
    getCurrentAudioArray: () =>
      | { audioArray: AudioArrayType | undefined; isPaused: boolean }
      | undefined;
  },
];
