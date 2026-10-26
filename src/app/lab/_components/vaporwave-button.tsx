"use client";

import { Sparkles } from "lucide-react";

interface VaporwaveButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export function VaporwaveButton({ isActive, onToggle }: VaporwaveButtonProps) {
  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
          isActive
            ? "theme-button shadow-lg"
            : "bg-theme-glass text-theme-text-secondary hover:bg-theme-glass-hover"
        }`}
      >
        <Sparkles className="w-5 h-5" />
        {isActive ? "Vaporwave Mode ON" : "Vaporwave Mode"}
      </button>
    </div>
  );
}
