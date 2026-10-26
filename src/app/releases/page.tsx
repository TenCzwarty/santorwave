"use client";

import { usePlayer } from "@/components/player-provider";

import { ReleaseCard, SearchControls, EmptyState } from "./_components";
import { USE_LOCAL_AUDIO, LOCAL_AUDIO_URL, DEEZER_PREVIEW_URL } from "./_lib/constants";
import type { Release } from "./_lib/types";
import { useReleasesFilter } from "./_lib/use-releases-filter";

import data from "@/server/db/mock.json";

const playlistData = data.releases as Release[];

export default function ReleasesPage() {
  // Filter and sort releases
  const {
    searchQuery,
    sortBy,
    filterBy,
    setSearchQuery,
    setSortBy,
    setFilterBy,
    filteredReleases,
    totalCount,
    filteredCount,
  } = useReleasesFilter(playlistData);

  // Global player
  const { playTrack, pause, currentTrack, isPlaying } = usePlayer();

  // Audio URL - local file or proxied Deezer preview
  const audioUrl = USE_LOCAL_AUDIO 
    ? LOCAL_AUDIO_URL 
    : `/api/audio-proxy?url=${encodeURIComponent(DEEZER_PREVIEW_URL)}`;

  // Handle play
  const handlePlay = (item: Release) => {
    void playTrack(
      audioUrl,
      {
        id: item.id,
        title: item.title ?? "Unknown Title",
        artist: item.artist,
        type: item.type,
      },
      { loop: true },
    );
  };

  // Handle pause
  const handlePause = () => {
    pause();
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="glitch-text mb-8 text-center text-6xl font-bold text-theme-text-primary">
        Releases
      </h1>

      {/* Search and Filter Controls */}
      <SearchControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterBy={filterBy}
        onFilterChange={setFilterBy}
        totalCount={totalCount}
        filteredCount={filteredCount}
      />

      {/* Releases Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredReleases.map((item) => (
            <ReleaseCard
              key={item.id}
              item={item}
              isPlaying={isPlaying && currentTrack?.id === item.id}
              onPlay={() => handlePlay(item)}
              onPause={handlePause}
            />
          ))}
        </div>

        {filteredReleases.length === 0 && <EmptyState />}
      </div>
    </main>
  );
}
