/**
 * Colour maths shared by everything that needs to know whether it is painting
 * on a light or a dark surface. Single source of truth — this used to be
 * copy-pasted (with three subtly different formulas) into the theme context,
 * the themed background and the theme demo page.
 */

/** Relative luminance, WCAG 2.x. Accepts `#rgb`, `#rrggbb` and `rgb()/rgba()`. */
export function getLuminance(color: string): number {
  let r = 0;
  let g = 0;
  let b = 0;

  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const fullHex =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    const num = Number.parseInt(fullHex, 16);
    if (Number.isNaN(num)) return 0.5;
    r = ((num >> 16) & 0xff) / 255;
    g = ((num >> 8) & 0xff) / 255;
    b = (num & 0xff) / 255;
  } else if (color.startsWith("rgb")) {
    const match = color.match(/\d+(\.\d+)?/g);
    if (!match || match.length < 3) return 0.5;
    const [red = 0, green = 0, blue = 0] = match.map(Number);
    r = red / 255;
    g = green / 255;
    b = blue / 255;
  } else {
    // Named colours and anything exotic — assume mid grey rather than guessing.
    return 0.5;
  }

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Biased slightly toward "dark" (0.45 rather than 0.5) because light text on a
 * mid surface reads better than dark text does.
 */
export const DARK_SURFACE_THRESHOLD = 0.45;

export function isDarkColor(color: string): boolean {
  return getLuminance(color) < DARK_SURFACE_THRESHOLD;
}

/** A two-stop gradient counts as dark when its average luminance is dark. */
export function isGradientDark(from: string, to: string): boolean {
  return (getLuminance(from) + getLuminance(to)) / 2 < DARK_SURFACE_THRESHOLD;
}
