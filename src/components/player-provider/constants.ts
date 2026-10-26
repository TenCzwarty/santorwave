import type { PlayOptions, TrackInfo } from "./types";

/** The site's theme song — what "enter the weave" and the Audio Lab start. */
export const MAIN_TRACK = {
  url: "/audio/warszawave.mp3",
  info: {
    id: "main-song",
    title: "Warszawave",
    artist: "Irena Santor",
  } satisfies TrackInfo,
  options: { loop: true } satisfies PlayOptions,
};
