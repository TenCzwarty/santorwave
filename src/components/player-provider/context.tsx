"use client";

import { createContext, useContext } from "react";
import type { PlayerContextValue } from "./types";

export const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
