import {
  Music,
  Video,
  CassetteTape,
  Disc,
  Disc3,
  Disc2,
  Circle,
} from "lucide-react";
import type { ReleaseType, TypeConfig, PlayerType } from "./types";

export const TYPE_CONFIG: Record<ReleaseType, TypeConfig> = {
  CC: {
    icon: CassetteTape,
    label: "Cassette",
    color: "text-amber-300",
    bgColor: "bg-amber-500/20",
  },
  CD: {
    icon: Circle,
    label: "CD",
    color: "text-cyan-300",
    bgColor: "bg-cyan-500/20",
  },
  SP: {
    icon: Disc2,
    label: "Single",
    color: "text-pink-300",
    bgColor: "bg-pink-500/20",
  },
  LP: {
    icon: Disc3,
    label: "LP",
    color: "text-purple-300",
    bgColor: "bg-purple-500/20",
  },
  EP: {
    icon: Disc,
    label: "EP",
    color: "text-indigo-300",
    bgColor: "bg-indigo-500/20",
  },
  GR: {
    icon: Disc3,
    label: "Vinyl",
    color: "text-rose-300",
    bgColor: "bg-rose-500/20",
  },
  video: {
    icon: Video,
    label: "Video",
    color: "text-emerald-300",
    bgColor: "bg-emerald-500/20",
  },
};

export const DEFAULT_TYPE_CONFIG: TypeConfig = {
  icon: Music,
  label: "Music",
  color: "text-gray-300",
  bgColor: "bg-gray-500/20",
};

export const ALBUM_PATTERNS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
];

export const getAlbumPattern = (id: string): string => {
  const index = parseInt(id, 10) % ALBUM_PATTERNS.length;
  return ALBUM_PATTERNS[index] ?? ALBUM_PATTERNS[0]!;
};

export const getPlayerType = (releaseType: string): PlayerType => {
  if (releaseType === "CD") return "cd";
  if (releaseType === "CC") return "cassette";
  return "vinyl"; // LP, EP, SP, GR, and others default to vinyl
};

// Audio configuration
export const USE_LOCAL_AUDIO = true;
export const LOCAL_AUDIO_URL = "/audio/warszawave.mp3";
export const DEEZER_PREVIEW_URL = "https://cdns-preview-e.dzcdn.net/stream/c-e77d23e0c8ed7567a507a6d1b6a9ca1b-9.mp3";
