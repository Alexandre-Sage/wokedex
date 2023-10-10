import { randomUUID } from "crypto";
import {
  ImageId,
  Transaction,
  TypeId,
  Wokemon,
  WokemonId,
  WokemonImage,
  WokemonType,
} from "../types";
import {
  createBatchWokemonType,
  createWokemon,
  createWokemonImage,
  getAllWokemon,
  getWokemonById,
} from "../../infra/repositories";
import { map } from "ramda";
const create = async (
  database: Transaction,
  {
    description,
    height,
    name,
    weight,
    encounterPlace,
  }: Pick<
    Wokemon,
    "description" | "name" | "height" | "weight" | "encounterPlace"
  >,
  typeIds: TypeId[]
) => {
  const id = randomUUID();

  const newWokemon: Wokemon = {
    id,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
    height,
    name,
    weight,
    number: 0,
    encounterPlace,
  };
  const wokemonTypes = map<TypeId, WokemonType>(
    (typeId) => ({
      typeId,
      wokemonId: id,
      createdAt: new Date(),
    }),
    typeIds
  );
  await createWokemon(database, newWokemon);
  await createBatchWokemonType(database, wokemonTypes);
  return { id };
};

const getAll = (database: Transaction) => getAllWokemon(database);

const getById = (database: Transaction, id: WokemonId) =>
  getWokemonById(database, id);

const createImage = (
  database: Transaction,
  wokemonId: WokemonId,
  imageId: ImageId
) =>
  createWokemonImage(database, {
    imageId,
    wokemonId,
    createdAt: new Date(),
  });
export { create, getAll, getById, createImage };
