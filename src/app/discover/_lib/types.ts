export type DeezerTrack = {
  id: number;
  title: string;
  preview: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_medium: string;
  };
};

export type DeezerSearchResponse = {
  data: DeezerTrack[];
  error?: { message: string };
};
