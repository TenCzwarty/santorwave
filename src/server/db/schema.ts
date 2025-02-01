import {
  text,
  singlestoreTableCreator,
  bigint,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `santorwave_${name}`,
);

export const artists_table = createTable("artists_table", {
  id: bigint("id", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement(),

  name: text("name").notNull(),
});

export const songs_table = createTable("songs_table", {
  id: bigint("id", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement(),

  title: text("title").notNull(),
});

export const carriers_table = createTable("carriers_table", {
  id: bigint("id", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement(),

  title: text("title").notNull(),
});
