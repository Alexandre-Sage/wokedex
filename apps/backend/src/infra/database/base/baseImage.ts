import { randomUUID } from "crypto";
import { ImageRow } from "../../../domain/types";
import { indexBy, prop } from "ramda";

export const baseImages: ImageRow[] = [
  {
    id: randomUUID(),
    created_at: new Date(),
    path: "base/meluche.jpg",
  },
  {
    id: randomUUID(),
    created_at: new Date(),
    path: "base/common_banshee.jpg",
  },
  {
    id: randomUUID(),
    created_at: new Date(),
    path: "base/serge_ayoub.jpg",
  },
  {
    id: randomUUID(),
    created_at: new Date(),
    path: "base/ben_laden.jpg",
  },
];

export const baseImageIndexedByPath = indexBy(prop("path"), baseImages);
