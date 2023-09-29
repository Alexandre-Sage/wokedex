import { randomUUID } from "crypto";
import { create, getAll } from "../../infra/repositories";
import { Transaction, Wokemon } from "../types";
import { ZodWokemon } from "../validation";
const table = "wokemons";
const createWokemon = async (
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
  return create(database, {
    table,
    data: newWokemon,
  });
};

const getAllWokemon = (database: Transaction) =>
  getAll(database, {
    table,
  });

export { createWokemon, getAllWokemon };
