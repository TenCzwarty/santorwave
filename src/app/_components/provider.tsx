"use client";

import { ThemeProvider } from "styled-components";

import original from "react95/dist/themes/original";

export const Provider: FCWithChildren = ({ children }) => (
  <ThemeProvider theme={original}>{children}</ThemeProvider>
);
