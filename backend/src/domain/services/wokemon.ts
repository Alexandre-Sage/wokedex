import { randomUUID } from "crypto";
import { create } from "../../infra/repositories";
import { Transaction, Wokemon } from "../types";

const createWokemon = (
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
    table: "wokemons",
    data: newWokemon,
  });
};

export { createWokemon };
