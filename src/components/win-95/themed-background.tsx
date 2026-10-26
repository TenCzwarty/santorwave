"use client";

import React from "react";

import { useWin95ThemePickerContext } from "./theme-picker-context";

/**
 * Paints the themed page background. Purely presentational — the gradient and
 * its light/dark decision both live in the theme context, which is also the
 * only writer of the `--theme-*` variables.
 */
export const ThemedBackground = ({ children }: Children) => {
  const { gradient } = useWin95ThemePickerContext();

  return (
    <div
      className={`min-h-screen font-ms-sans-serif transition-all duration-500 ${
        gradient.isDark ? "text-white" : "text-gray-900"
      }`}
      style={{ background: gradient.css }}
      data-theme-dark={gradient.isDark}
    >
      {children}
    </div>
  );
};
