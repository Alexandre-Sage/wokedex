import { randomUUID } from "crypto";
import { Transaction, TypeId, Wokemon, WokemonId, WokemonType } from "../types";
import {
  createBatchWokemonType,
  createWokemon,
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
  }: Pick<Wokemon, "description" | "name" | "height" | "weight">,
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
};

const getAll = (database: Transaction) => getAllWokemon(database);

const getById = (database: Transaction, id: WokemonId) =>
  getWokemonById(database, id);
export { create, getAll, getById };
