"use client";

import { Search, SortAsc, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { SortOption, FilterOption } from "../_lib/use-releases-filter";

interface SearchControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filterBy: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  totalCount: number;
  filteredCount: number;
}

export function SearchControls({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
  totalCount,
  filteredCount,
}: SearchControlsProps) {
  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-theme-text-muted" />
            <Input
              type="text"
              placeholder="Search releases..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-theme-glass border-theme-glass-border text-theme-text-primary placeholder:text-theme-text-muted focus:border-theme-accent focus:ring-theme-accent/20"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-text-muted hover:text-theme-text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SortAsc className="h-5 w-5 text-theme-text-muted hidden sm:block" />
            <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
              <SelectTrigger className="w-[140px] bg-theme-glass border-theme-glass-border text-theme-text-primary">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-theme-text-muted hidden sm:block" />
            <Select value={filterBy} onValueChange={(value) => onFilterChange(value as FilterOption)}>
              <SelectTrigger className="w-[140px] bg-theme-glass border-theme-glass-border text-theme-text-primary">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vinyl">Vinyl</SelectItem>
                <SelectItem value="cd">CD</SelectItem>
                <SelectItem value="cassette">Cassette</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-theme-text-secondary">
          Showing {filteredCount} of {totalCount} releases
        </div>
      </div>
    </div>
  );
}
