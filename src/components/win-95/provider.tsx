import StyledComponentsRegistry from "@/lib/registry";

import { Win95ThemePickerContextProvider } from "@/components/win-95/theme-picker-context";
import { Win95StyledComponentsThemeProvider } from "@/components/win-95/styled-components-provider";

export const Win95ThemeProvider = ({ children }: Children) => (
  <StyledComponentsRegistry>
    <Win95ThemePickerContextProvider>
      <Win95StyledComponentsThemeProvider>
        {children}
      </Win95StyledComponentsThemeProvider>
    </Win95ThemePickerContextProvider>
  </StyledComponentsRegistry>
);
