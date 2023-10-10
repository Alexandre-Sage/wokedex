import { create, getAll, getOne } from ".";
import {
  Transaction,
  Wokemon,
  WokemonId,
  WokemonImage,
  WokemonRow,
  WokemonType,
} from "../../domain/types";
const table = "wokemons";
const image_table = "wokemons_images";

const createWokemon = (database: Transaction, wokemon: Wokemon) =>
  create(database, {
    table,
    data: wokemon,
  });

const getAllWokemon = (database: Transaction) =>
  getAll<Wokemon>(database, {
    table,
  });

const getWokemonById = (database: Transaction, id: WokemonId) =>
  getOne<Wokemon, WokemonRow>(database, {
    table,
    where: {
      searchValue: id,
      columnName: "id",
      operator: "=",
    },
  });

const createBatchWokemonType = (
  database: Transaction,
  wokemonType: WokemonType[]
) =>
  create(database, {
    table: "wokemons_types",
    data: wokemonType,
  });

const createWokemonImage = (
  database: Transaction,
  data: WokemonImage[] | WokemonImage
) =>
  create(database, {
    table: image_table,
    data,
  });

export {
  createBatchWokemonType,
  createWokemon,
  getAllWokemon,
  getWokemonById,
  createWokemonImage,
};
