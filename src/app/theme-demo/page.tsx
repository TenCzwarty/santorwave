"use client";

import { useWin95ThemePickerContext } from "@/components/win-95/theme-picker-context";
import { isDarkColor } from "@/components/win-95/theme-colors";

// Check if a value looks like a color (hex, rgb, or color name)
function isColorValue(value: unknown): value is string {
  if (typeof value !== "string") return false;
  // Check for hex colors
  if (value.startsWith("#")) return true;
  // Check for rgb/rgba
  if (value.startsWith("rgb")) return true;
  // Check for common color keywords (basic check)
  const colorKeywords = ["black", "white", "red", "blue", "green", "gray", "grey", "transparent"];
  if (colorKeywords.some(kw => value.toLowerCase().includes(kw))) return true;
  // Check if it's a short string that could be a color (exclude long text)
  if (value.length <= 20 && !value.includes(" ")) return true;
  return false;
}

// Color swatch component
function ColorSwatch({ name, color }: { name: string; color: string }) {
  const isLight = !isDarkColor(color);
  
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-24 h-20 rounded-lg shadow-lg border border-white/20 flex items-center justify-center p-1"
        style={{ backgroundColor: color }}
      >
        <span 
          className={`text-[10px] font-mono text-center break-all ${isLight ? "text-black" : "text-white"}`}
          style={{ textShadow: isLight ? "0 0 2px white" : "0 0 2px black" }}
        >
          {color}
        </span>
      </div>
      <span className="mt-2 text-xs text-theme-text-secondary text-center max-w-24 break-words">
        {name}
      </span>
    </div>
  );
}

// Section component
function ColorSection({ title, colors }: { title: string; colors: [string, string][] }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-theme-text-primary mb-4">{title}</h2>
      <div className="flex flex-wrap gap-4">
        {colors.map(([name, color]) => (
          <ColorSwatch key={name} name={name} color={color} />
        ))}
      </div>
    </div>
  );
}

// Gradient swatch component
function GradientSwatch({ 
  fromName, 
  fromColor, 
  toName, 
  toColor 
}: { 
  fromName: string; 
  fromColor: string; 
  toName: string; 
  toColor: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-40 h-24 rounded-lg shadow-lg border border-white/20"
        style={{ 
          background: `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)` 
        }}
      />
      <span className="mt-2 text-[10px] text-theme-text-secondary text-center max-w-40">
        {fromName} → {toName}
      </span>
    </div>
  );
}

export default function ThemeDemoPage() {
  const { theme } = useWin95ThemePickerContext();

  // Extract all color properties from the theme (handles hex, rgb, and color names)
  const themeColors = Object.entries(theme).filter(([, value]) =>
    isColorValue(value),
  );

  // Group colors by category
  const headerColors = themeColors.filter(([name]) => 
    name.toLowerCase().includes("header")
  );
  
  const borderColors = themeColors.filter(([name]) => 
    name.toLowerCase().includes("border")
  );
  
  const textColors = themeColors.filter(([name]) => 
    name.toLowerCase().includes("text")
  );
  
  const materialColors = themeColors.filter(([name]) => 
    name.toLowerCase().includes("material") && !name.toLowerCase().includes("text")
  );
  
  const otherColors = themeColors.filter(([name]) => 
    !name.toLowerCase().includes("header") &&
    !name.toLowerCase().includes("border") &&
    !name.toLowerCase().includes("text") &&
    !name.toLowerCase().includes("material")
  );

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="glitch-text text-4xl font-bold text-theme-text-primary mb-2">
        Theme Colors Demo
      </h1>
      <p className="text-theme-text-secondary mb-8">
        All colors available from the current Windows 95 theme. Change theme in header to see updates.
      </p>

      {/* All colors in one grid */}
      <div className="theme-card rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-theme-text-primary mb-4">
          All Theme Colors ({themeColors.length} total)
        </h2>
        <div className="flex flex-wrap gap-4">
          {themeColors.map(([name, color]) => (
            <ColorSwatch key={name} name={name} color={color} />
          ))}
        </div>
      </div>

      {/* Grouped by category */}
      <div className="theme-card rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-theme-text-primary mb-6">By Category</h2>
        
        {headerColors.length > 0 && (
          <ColorSection title="Header Colors" colors={headerColors} />
        )}
        
        {materialColors.length > 0 && (
          <ColorSection title="Material/Surface Colors" colors={materialColors} />
        )}
        
        {borderColors.length > 0 && (
          <ColorSection title="Border Colors" colors={borderColors} />
        )}
        
        {textColors.length > 0 && (
          <ColorSection title="Text Colors" colors={textColors} />
        )}
        
        {otherColors.length > 0 && (
          <ColorSection title="Other Colors" colors={otherColors} />
        )}
      </div>

      {/* Gradient Examples */}
      <div className="theme-card rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-theme-text-primary mb-2">Gradient Examples</h2>
        <p className="text-theme-text-secondary text-sm mb-6">
          Preview gradient combinations using theme colors
        </p>
        <div className="flex flex-wrap gap-4">
          {/* Current background gradient */}
          <GradientSwatch 
            fromName="canvasTextDisabledShadow" 
            fromColor={theme.canvasTextDisabledShadow} 
            toName="desktopBackground" 
            toColor={theme.desktopBackground} 
          />
          {/* Header combinations */}
          <GradientSwatch 
            fromName="headerBackground" 
            fromColor={theme.headerBackground} 
            toName="headerNotActiveBackground" 
            toColor={theme.headerNotActiveBackground} 
          />
          <GradientSwatch 
            fromName="hoverBackground" 
            fromColor={theme.hoverBackground} 
            toName="headerBackground" 
            toColor={theme.headerBackground} 
          />
          <GradientSwatch 
            fromName="headerBackground" 
            fromColor={theme.headerBackground} 
            toName="progress" 
            toColor={theme.progress} 
          />
          {/* Desktop/Material combinations */}
          <GradientSwatch 
            fromName="desktopBackground" 
            fromColor={theme.desktopBackground} 
            toName="material" 
            toColor={theme.material} 
          />
          <GradientSwatch 
            fromName="progress" 
            fromColor={theme.progress} 
            toName="desktopBackground" 
            toColor={theme.desktopBackground} 
          />
          {/* Focus/Hover combinations */}
          <GradientSwatch 
            fromName="focusSecondary" 
            fromColor={theme.focusSecondary} 
            toName="headerBackground" 
            toColor={theme.headerBackground} 
          />
          <GradientSwatch 
            fromName="hoverBackground" 
            fromColor={theme.hoverBackground} 
            toName="desktopBackground" 
            toColor={theme.desktopBackground} 
          />
          {/* Border combinations */}
          <GradientSwatch 
            fromName="borderDark" 
            fromColor={theme.borderDark} 
            toName="borderLight" 
            toColor={theme.borderLight} 
          />
          {/* Canvas combinations */}
          <GradientSwatch 
            fromName="canvas" 
            fromColor={theme.canvas} 
            toName="headerBackground" 
            toColor={theme.headerBackground} 
          />
          <GradientSwatch 
            fromName="progress" 
            fromColor={theme.progress} 
            toName="hoverBackground" 
            toColor={theme.hoverBackground} 
          />
          <GradientSwatch 
            fromName="headerBackground" 
            fromColor={theme.headerBackground} 
            toName="borderDarkest" 
            toColor={theme.borderDarkest} 
          />
        </div>
      </div>

      {/* Raw theme object */}
      <div className="theme-card rounded-xl p-6">
        <h2 className="text-xl font-bold text-theme-text-primary mb-4">Raw Theme Object</h2>
        <pre className="bg-black/30 rounded-lg p-4 overflow-auto text-xs text-theme-text-secondary">
          {JSON.stringify(theme, null, 2)}
        </pre>
      </div>
    </main>
  );
}
