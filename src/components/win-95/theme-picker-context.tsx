"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { DEFAULT_THEME } from "./const";
import { gradientForTheme, randomGradient, type GradientPair } from "./gradients";
import { isGradientDark } from "./theme-colors";

type Win95ThemeType = typeof DEFAULT_THEME;

type Gradient = {
  from: string;
  to: string;
  /** Whether the rendered gradient needs light text on top of it. */
  isDark: boolean;
  css: string;
};

type Win95ThemePickerContextType = {
  theme: Win95ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<Win95ThemeType>>;
  gradient: Gradient;
};

const buildGradient = (
  theme: Record<string, string>,
  [fromKey, toKey]: GradientPair,
): Gradient => {
  const from = theme[fromKey] ?? "#000000";
  const to = theme[toKey] ?? "#ffffff";

  return {
    from,
    to,
    isDark: isGradientDark(from, to),
    css: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
  };
};

const DEFAULT_GRADIENT = buildGradient(
  DEFAULT_THEME as unknown as Record<string, string>,
  gradientForTheme(
    DEFAULT_THEME as unknown as Record<string, string>,
    DEFAULT_THEME.name,
  ),
);

const Win95ThemePickerContext = React.createContext<Win95ThemePickerContextType>(
  {
    theme: DEFAULT_THEME,
    setTheme: () => {
      console.warn(
        "Win95ThemePickerContext setTheme function is not implemented yet",
      );
    },
    gradient: DEFAULT_GRADIENT,
  },
);

/**
 * Publishes the active theme as CSS custom properties.
 *
 * This is the *only* place that writes `--theme-*`. `ThemedBackground` used to
 * write the text/glass variables too, and because React flushes child effects
 * before parent ones the provider always won — so the background's contrast
 * calculation never had any effect. `isDark` now comes from the gradient that
 * is actually painted.
 */
const setThemeCssVariables = (theme: Win95ThemeType, isDark: boolean) => {
  const root = document.documentElement;

  // Main colors useful for gradients
  root.style.setProperty("--win95-header", theme.headerBackground);
  root.style.setProperty("--win95-desktop", theme.desktopBackground);
  root.style.setProperty("--win95-progress", theme.progress);
  root.style.setProperty("--win95-material", theme.material);
  root.style.setProperty("--win95-canvas", theme.canvas);
  root.style.setProperty("--win95-anchor", theme.anchor);
  root.style.setProperty("--win95-focus", theme.focusSecondary);

  // Text colors
  root.style.setProperty("--win95-text", theme.materialText);
  root.style.setProperty("--win95-text-invert", theme.materialTextInvert);

  // Border colors
  root.style.setProperty("--win95-border-dark", theme.borderDark);
  root.style.setProperty("--win95-border-darkest", theme.borderDarkest);
  root.style.setProperty("--win95-border-light", theme.borderLight);

  // Semantic colors for UI components
  root.style.setProperty("--theme-accent", theme.headerBackground);
  root.style.setProperty(
    "--theme-accent-hover",
    theme.headerNotActiveBackground,
  );
  root.style.setProperty("--theme-highlight", theme.progress);

  // Surface colors for cards/panels
  root.style.setProperty("--theme-surface", theme.material);
  root.style.setProperty("--theme-surface-alt", theme.canvas);

  root.style.setProperty("--theme-is-dark", isDark ? "1" : "0");

  // Text colors that work on the painted background
  root.style.setProperty(
    "--theme-text-primary",
    isDark ? "#ffffff" : "#1a1a1a",
  );
  root.style.setProperty(
    "--theme-text-secondary",
    isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
  );
  root.style.setProperty(
    "--theme-text-muted",
    isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
  );

  // Glass/overlay colors that adapt to the background
  root.style.setProperty(
    "--theme-glass",
    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
  );
  root.style.setProperty(
    "--theme-glass-hover",
    isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
  );
  root.style.setProperty(
    "--theme-glass-border",
    isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
  );

  // Contrasting icon colors - vaporwave palette that provides visual variety
  root.style.setProperty("--theme-icon-pink", isDark ? "#ff6b9d" : "#e91e8c");
  root.style.setProperty("--theme-icon-cyan", isDark ? "#00d4ff" : "#0891b2");
  root.style.setProperty("--theme-icon-purple", isDark ? "#a78bfa" : "#7c3aed");
  root.style.setProperty("--theme-icon-orange", isDark ? "#fb923c" : "#ea580c");
};

export const Win95ThemePickerContextProvider = ({ children }: Children) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const themeColors = theme as unknown as Record<string, string>;

  // Deterministic on the first render so server and client agree; re-rolled at
  // random whenever the user switches theme (a client-only event).
  const [pair, setPair] = useState<GradientPair>(() =>
    gradientForTheme(themeColors, theme.name),
  );

  const previousThemeName = useRef(theme.name);

  useEffect(() => {
    if (previousThemeName.current === theme.name) return;
    previousThemeName.current = theme.name;
    setPair(randomGradient(themeColors));
  }, [theme.name, themeColors]);

  const gradient = useMemo(
    () => buildGradient(themeColors, pair),
    [themeColors, pair],
  );

  useEffect(() => {
    setThemeCssVariables(theme, gradient.isDark);
  }, [theme, gradient.isDark]);

  const value = useMemo(
    () => ({ theme, setTheme, gradient }),
    [theme, gradient],
  );

  return (
    <Win95ThemePickerContext.Provider value={value}>
      {children}
    </Win95ThemePickerContext.Provider>
  );
};

export const useWin95ThemePickerContext = () =>
  React.useContext(Win95ThemePickerContext);
