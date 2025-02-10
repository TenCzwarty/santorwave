"use client";

import React from "react";
import { ThemeProvider } from "styled-components";

import { useWin95ThemePickerContext } from "./theme-picker-context";

export const Win95StyledComponentsThemeProvider: FCWithChildren = ({
  children,
}) => {
  const { theme } = useWin95ThemePickerContext();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
