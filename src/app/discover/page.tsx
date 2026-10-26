"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { usePlayer } from "@/components/player-provider";

import { TrackCard, SearchForm, PageHeader } from "./_components";
import { DEFAULT_SEARCH_QUERY } from "./_lib/constants";
import type { DeezerTrack, DeezerSearchResponse } from "./_lib/types";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH_QUERY);
  const [searchResults, setSearchResults] = useState<DeezerTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Global player. `playTrack` toggles pause when handed the current track.
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const handleSelectTrack = (track: DeezerTrack) => {
    const proxiedUrl = `/api/audio-proxy?url=${encodeURIComponent(track.preview)}`;

    void playTrack(proxiedUrl, {
      id: String(track.id),
      title: track.title,
      artist: track.artist.name,
      coverUrl: track.album.cover_medium,
    });
  };

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch(
        `/api/deezer/search?q=${encodeURIComponent(searchQuery)}&limit=12`
      );

      if (!response.ok) {
        throw new Error("Failed to search");
      }

      const data = (await response.json()) as DeezerSearchResponse;

      if (data.error) {
        throw new Error(data.error.message);
      }

      // Filter out tracks without preview URLs
      const tracksWithPreviews = data.data.filter((track) => track.preview);
      setSearchResults(tracksWithPreviews);

      if (tracksWithPreviews.length === 0) {
        setSearchError("No tracks with previews found. Try a different search.");
      }
    } catch (error: unknown) {
      setSearchError(
        error instanceof Error ? error.message : "Failed to search. Please try again."
      );
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Search on initial load
  useEffect(() => {
    void handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen text-theme-text-primary">
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <PageHeader />

          {/* Search Bar */}
          <SearchForm
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSubmit={handleSearch}
            isSearching={isSearching}
          />

          {/* Error Message */}
          {searchError && (
            <div className="flex items-center justify-center gap-2 text-theme-highlight mb-6">
              <AlertCircle className="w-5 h-5" />
              <span>{searchError}</span>
            </div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  isPlaying={isPlaying && currentTrack?.id === String(track.id)}
                  onSelect={() => handleSelectTrack(track)}
                />
              ))}
            </div>
          )}

          {/* Powered by note */}
          <p className="text-center text-theme-text-muted text-xs mt-12">
            Powered by Deezer • 30-second previews
          </p>
        </div>
      </div>

      {/* Spacer for the player */}
      <div className="h-32" />
    </div>
  );
}
