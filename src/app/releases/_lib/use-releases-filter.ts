"use client";

import { useState, useMemo } from "react";

import type { Release } from "./types";

export type SortOption = "title" | "artist" | "year";
export type FilterOption = "all" | "vinyl" | "cd" | "cassette" | "video";

interface UseReleasesFilterOptions {
  initialSearchQuery?: string;
  initialSortBy?: SortOption;
  initialFilterBy?: FilterOption;
}

export function useReleasesFilter(
  releases: Release[],
  options: UseReleasesFilterOptions = {}
) {
  const {
    initialSearchQuery = "",
    initialSortBy = "title",
    initialFilterBy = "all",
  } = options;

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState<SortOption>(initialSortBy);
  const [filterBy, setFilterBy] = useState<FilterOption>(initialFilterBy);

  const filteredReleases = useMemo(() => {
    return releases
      .filter((item) => {
        const title = item.title ?? "";
        const matchesSearch =
          title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.artist.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter =
          filterBy === "all" ||
          (filterBy === "vinyl" && ["LP", "EP", "SP", "GR"].includes(item.type)) ||
          (filterBy === "cd" && item.type === "CD") ||
          (filterBy === "cassette" && item.type === "CC") ||
          (filterBy === "video" && item.type === "video");

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const titleA = a.title ?? "";
        const titleB = b.title ?? "";

        switch (sortBy) {
          case "title":
            return titleA.localeCompare(titleB);
          case "artist":
            return a.artist.localeCompare(b.artist);
          case "year":
            return (b.year ?? "0").localeCompare(a.year ?? "0");
          default:
            return 0;
        }
      });
  }, [releases, searchQuery, sortBy, filterBy]);

  return {
    // State
    searchQuery,
    sortBy,
    filterBy,
    // Setters
    setSearchQuery,
    setSortBy,
    setFilterBy,
    // Results
    filteredReleases,
    // Metadata
    totalCount: releases.length,
    filteredCount: filteredReleases.length,
  };
}
