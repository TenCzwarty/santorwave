"use client";

import React, { useState } from "react";

import { DEFAULT_THEME } from "./const";

type Win95ThemeType = typeof DEFAULT_THEME;

type Win95ThemePickerContextType = {
  theme: Win95ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<Win95ThemeType>>;
};

const Win95ThemePickerContext =
  React.createContext<Win95ThemePickerContextType>({
    theme: DEFAULT_THEME,
    setTheme: () => {
      console.warn(
        "Win95ThemePickerContext setTheme function is not implemented yet",
      );
    },
  });

export const Win95ThemePickerContextProvider = ({ children }: Children) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  return (
    <Win95ThemePickerContext.Provider value={{ theme, setTheme }}>
      {children}
    </Win95ThemePickerContext.Provider>
  );
};

export const useWin95ThemePickerContext = () =>
  React.useContext(Win95ThemePickerContext);
