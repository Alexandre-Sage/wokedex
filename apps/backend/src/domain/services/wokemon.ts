import { randomUUID } from "crypto";
import {
  createBatchWokemonAttacks,
  createBatchWokemonType,
  createWokemon,
  createWokemonImage,
  getAllWokemon,
  getWokemonById,
  getWokemonImages,
  getWokemonTypes,
} from "../../infra/repositories";
import {
  ImageId,
  Transaction,
  TypeId,
  Wokemon,
  WokemonAttack,
  WokemonId,
  WokemonType
} from "../types";
import { AttackId } from "../types/Attack";
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
  typeIds: TypeId[],
  attackIds: AttackId[]
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
  const wokemonTypes = typeIds.map<WokemonType>((typeId) => ({
    typeId,
    wokemonId: id,
    createdAt: new Date(),
  }));

  const wokemonAttacks = attackIds.map<WokemonAttack>((attackId) => ({
    attackId,
    wokemonId: id,
    createdAt: new Date(),
  }));

  await createWokemon(database, newWokemon),
  await Promise.all([
    createBatchWokemonType(database, wokemonTypes),
    createBatchWokemonAttacks(database, wokemonAttacks),
  ]);
  return { id };
};

const getAll = async (database: Transaction) => {
  const wokemons = await getAllWokemon(database);
  return Promise.all(
    wokemons.map(async (wokemon) => ({
      ...wokemon,
      types: await getWokemonTypes(database, wokemon.id),
      images: await getWokemonImages(database, wokemon.id),
    }))
  );
};

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
export { create, createImage, getAll, getById };

