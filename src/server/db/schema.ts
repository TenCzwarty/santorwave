import {
  singlestoreTableCreator,
  text,
  bigint,
  json,
} from "drizzle-orm/singlestore-core";

const createTable = singlestoreTableCreator((name) => `santorwave_${name}`);

const getId = (name = "id") =>
  bigint("id", { mode: "number", unsigned: true }).notNull();

const getPrimaryKey = () => getId().primaryKey().autoincrement();

export const songs_table = createTable("songs_table", {
  id: getPrimaryKey(),
  title: text("title").notNull(),
  variants: json().$type<number[]>(),
});

export const artists_table = createTable("artists_table", {
  id: getPrimaryKey(),
  name: text("name").notNull(),
});

export const releases_table = createTable("releases_table", {
  id: getPrimaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),

  source_url: text("source_url"),
  discogs_url: text("discogs_url"),
  spotify_playlist_url: text("spotify_playlist_url"),
  tidal_playlist_url: text("tidal_playlist_url"),
});

export const relationship_song_artist_table = createTable(
  "relationship_song_artist_table",
  {
    id: getPrimaryKey(),
    artist_id: bigint("artist_id", { mode: "number", unsigned: true }),
    song_id: bigint("song_id", { mode: "number", unsigned: true }),
  },
);

export const relationship_song_release_table = createTable(
  "relationship_song_release_table",
  {
    id: getPrimaryKey(),
    song_id: getId("song_id"),
    release_id: getId("release_id"),
  },
);
