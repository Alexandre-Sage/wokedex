import { beforeEach } from "vitest";
import { Transaction } from "../../../src/domain/types";
import { WokemonBuilder } from "../builders";
import { map, prop } from "ramda";
const toInsert = WokemonBuilder.buildManyForDb(10);
const insertedWokemonIds = map(prop("id"), toInsert);
const wokemonSetUp = (database: Transaction) =>
  database((tsx) => tsx.table("wokemons").insert(toInsert));

export { wokemonSetUp, insertedWokemonIds };
