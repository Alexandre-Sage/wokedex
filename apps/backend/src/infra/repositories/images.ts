import { create } from ".";
import { Image, Transaction } from "../../domain/types";

const table = "images";
const _table = "wokemons_images";
const createImages = (database: Transaction, image: Image) =>
  create(database, {
    table,
    data: image,
  });
export { createImages };
