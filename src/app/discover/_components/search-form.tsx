"use client";

import { Search, Loader2 } from "lucide-react";

interface SearchFormProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isSearching: boolean;
}

export function SearchForm({
  searchQuery,
  onSearchChange,
  onSubmit,
  isSearching,
}: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="flex gap-2 max-w-xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for songs, artists..."
            className="w-full bg-theme-glass border border-theme-glass-border rounded-xl pl-12 pr-4 py-3 text-theme-text-primary placeholder-theme-text-muted focus:outline-none focus:border-theme-accent focus:bg-theme-glass-hover transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="theme-button px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {isSearching ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          Search
        </button>
      </div>
    </form>
  );
}
