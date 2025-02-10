"use client";

import React from "react";
import themes from "react95/dist/themes";
import { Select } from "react95";
import { type SelectOption } from "react95/dist/Select/Select.types";

import { useWin95ThemePickerContext } from "./theme-picker-context";

import { DEFAULT_THEME_ID } from "./const";

export const Win95ThemePicker = () => {
  const { setTheme } = useWin95ThemePickerContext();

  const options = Object.keys(themes).map((label, value) => ({ value, label }));

  const onChange = ({ label }: SelectOption<number>) => {
    if (!label) return;
    if (!(label in themes)) return;

    setTheme(themes[label as keyof typeof themes]);
  };

  return (
    <Select
      defaultValue={DEFAULT_THEME_ID}
      options={options}
      menuMaxHeight={160}
      width={160}
      onChange={onChange}
    />
  );
};
