"use client";

import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import {
  Music,
  Video,
  Play,
  Pause,
  Search,
  SortAsc,
  Filter,
  CassetteTape,
  Disc,
  Disc3,
  SquareAsterisk,
  Disc2,
  Circle,
  LucideProps,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const playlistData = [
  {
    id: "1",
    type: "CD",
    title: "Warszawa Ja I Ty",
    artist: "Irena Santor",
    duration: "7:20",
  },
  {
    id: "2",
    type: "CC",
    title: "Obejmij mnie",
    artist: "Irena Santor",
    duration: "3:48",
  },
  {
    id: "3",
    type: "LP",
    title: "Dla Ciebie",
    artist: "Irena Santor",
    duration: "19:36",
  },
  {
    id: "4",
    type: "SP",
    title: "Kowalem Swego Szczęścia Każdy Bywa Sam",
    artist: "Irena Santor",
    duration: "3:32",
  },
  {
    id: "5",
    type: "video",
    title: "Sopot",
    artist: "Irena Santor",
    duration: "4:15",
  },
  {
    id: "6",
    type: "GR",
    title: "Maleńki znak",
    artist: "Irena Santor",
    duration: "4:15",
  },
  {
    id: "7",
    type: "EP",
    title: "Maleńki znak",
    artist: "Irena Santor",
    duration: "4:15",
  },
];

const getIcon = (type: string) => {
  const icons = {
    CC: CassetteTape,
    CD: Circle,

    SP: Disc2,
    LP: Disc3,
    EP: Disc,

    GR: SquareAsterisk,
    video: Video,
  } as Record<
    string,
    ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
  >;

  const Elem = icons[type] || Music;

  return <Elem className="mr-4 h-6 w-6 text-indigo-300" />;
};

export default function VaporwavePlaylist() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [filterBy, setFilterBy] = useState("all");

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="glitch-text mb-8 text-center text-6xl font-bold">
        Vaporwave Playlist
      </h1>

      {/* Search, Sort, and Filter Controls */}
      <div className="mx-auto mb-8 w-full max-w-3xl space-y-4">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-indigo-300" />
          <Input
            type="text"
            placeholder="Search tracks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow text-white placeholder-gray-300"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-grow items-center space-x-2">
            <SortAsc className="h-5 w-5 text-indigo-300" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by Title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Sort by Title</SelectItem>
                <SelectItem value="artist">Sort by Artist</SelectItem>
                <SelectItem value="duration">Sort by Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-grow items-center space-x-2">
            <Filter className="h-5 w-5 text-indigo-300" />
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="song">Songs Only</SelectItem>
                <SelectItem value="video">Videos Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
        {playlistData.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="mb-4 overflow-hidden rounded-lg bg-white bg-opacity-20 backdrop-blur-sm"
          >
            <AccordionTrigger className="px-4 py-2 transition-colors hover:bg-white hover:bg-opacity-10">
              <div className="flex w-full items-center">
                {getIcon(item.type)}
                <div className="flex-grow text-left">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-300">{item.artist}</p>
                </div>
                <div className="mr-4 text-sm text-gray-300">
                  {item.duration}
                </div>
                {playing === item.id ? (
                  <Pause
                    className="h-6 w-6 cursor-pointer text-pink-300 transition-colors hover:text-pink-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlaying(null);
                    }}
                  />
                ) : (
                  <Play
                    className="h-6 w-6 cursor-pointer text-pink-300 transition-colors hover:text-pink-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlaying(item.id);
                    }}
                  />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2 text-gray-200">
              more info
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
