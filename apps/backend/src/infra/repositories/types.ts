import {
  Transaction,
  Type,
  TypeId,
  TypeRow,
  WokemonId,
  WokemonType,
} from "../../domain/types";
import { getAll, getOne } from "./functionalRepository";
const table = "types";
const getAllTypes = (database: Transaction) =>
  getAll<Type>(database, {
    table,
  });

const getTypeById = (database: Transaction, id: TypeId) =>
  getOne<Type, TypeRow>(database, {
    table,
    where: {
      columnName: "id",
      searchValue: id,
      operator: "=",
    },
  });

const getWokemonTypes = async (database: Transaction, wokemonId: WokemonId) => {
  const wokemonTypes = await getAll<WokemonType>(database, {
    table: "wokemons_types",
    where: {
      columnName: "wokemon_id",
      searchValue: wokemonId,
      operator: "=",
    },
  });
  return Promise.all(
    wokemonTypes.map(({ typeId }) => getTypeById(database, typeId))
  );
};
export { getAllTypes, getTypeById, getWokemonTypes };
