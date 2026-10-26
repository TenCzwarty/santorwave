/**
 * The page background is a two-stop gradient built from two colours of the
 * active react95 theme, so it always belongs to the theme the user picked.
 */
export type ThemeKey =
  | "canvasTextDisabledShadow"
  | "desktopBackground"
  | "headerBackground"
  | "headerNotActiveBackground"
  | "hoverBackground"
  | "progress"
  | "material"
  | "focusSecondary"
  | "borderDark"
  | "borderLight"
  | "canvas"
  | "borderDarkest";

export type GradientPair = readonly [ThemeKey, ThemeKey];

export const GRADIENT_OPTIONS: readonly GradientPair[] = [
  ["canvasTextDisabledShadow", "desktopBackground"],
  ["headerBackground", "headerNotActiveBackground"],
  ["hoverBackground", "headerBackground"],
  ["headerBackground", "progress"],
  ["desktopBackground", "material"],
  ["progress", "desktopBackground"],
  ["hoverBackground", "desktopBackground"],
  ["borderDark", "borderLight"],
  ["canvas", "headerBackground"],
  ["progress", "hoverBackground"],
  ["headerBackground", "borderDarkest"],
];

type ThemeColors = Record<string, string>;

/** Gradients whose two stops actually differ for this theme. */
function validGradients(theme: ThemeColors): readonly GradientPair[] {
  const usable = GRADIENT_OPTIONS.filter(
    ([from, to]) => theme[from] !== theme[to],
  );
  return usable.length > 0 ? usable : [GRADIENT_OPTIONS[0]!];
}

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Deterministic pick, used for the first render.
 *
 * This must not use `Math.random()`: the provider is a client component but
 * Next still renders it on the server, so a random pick produced a different
 * gradient on each side and React threw away the server HTML.
 */
export function gradientForTheme(theme: ThemeColors, seed: string): GradientPair {
  const options = validGradients(theme);
  return options[hash(seed) % options.length]!;
}

/** Random pick, only ever called from an event handler / effect on the client. */
export function randomGradient(theme: ThemeColors): GradientPair {
  const options = validGradients(theme);
  return options[Math.floor(Math.random() * options.length)]!;
}
