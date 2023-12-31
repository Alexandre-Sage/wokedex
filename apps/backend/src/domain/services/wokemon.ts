import { randomUUID } from "crypto";
import {
  ImageId,
  Transaction,
  TypeId,
  Wokemon,
  WokemonAttack,
  WokemonId,
  WokemonImage,
  WokemonType,
} from "../types";
import {
  createBatchWokemonAttacks,
  createBatchWokemonType,
  createWokemon,
  createWokemonImage,
  getAllWokemon,
  getWokemonById,
} from "../../infra/repositories";
import { map } from "ramda";
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

  await Promise.all([
    createWokemon(database, newWokemon),
    createBatchWokemonType(database, wokemonTypes),
    createBatchWokemonAttacks(database, wokemonAttacks),
  ]);
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
