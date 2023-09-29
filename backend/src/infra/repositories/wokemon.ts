import knex from "knex";
import { connection } from "../database";
import {
  DbRow,
  DbTransaction,
  ObjectToDbTypeMapper,
  SqlWhereClause,
  Transaction,
  TransactionCallBack,
  Wokemon,
  WokemonId,
  WokemonRow,
} from "../../domain/types";
import { dbRowToObject, objectToDbRow } from "../../modules/database/mapper";
import { filter, map, prop } from "ramda";
import { create, getAll, getOne } from ".";
const table = "wokemons";

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

export { createWokemon, getAllWokemon, getWokemonById };
