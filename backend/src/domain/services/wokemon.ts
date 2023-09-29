import { randomUUID } from "crypto";
import { Transaction, Wokemon, WokemonId } from "../types";
import {
  createWokemon,
  getAllWokemon,
  getWokemonById,
} from "../../infra/repositories";
const create = async (
  database: Transaction,
  {
    description,
    height,
    name,
    weight,
  }: Pick<Wokemon, "description" | "name" | "height" | "weight">
) => {
  const newWokemon: Wokemon = {
    id: randomUUID(),
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
    height,
    name,
    weight,
    number: 0,
  };
  return createWokemon(database, newWokemon);
};

const getAll = (database: Transaction) => getAllWokemon(database);

const getById = (database: Transaction, id: WokemonId) =>
  getWokemonById(database, id);
export { create, getAll, getById };
