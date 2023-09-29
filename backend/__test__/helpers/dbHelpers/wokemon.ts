import { Transaction, Wokemon, WokemonRow } from "../../../src/domain/types";
import { WokemonBuilder } from "../builders";

const getDbWokemeonByName = (
  name: string,
  databaseTransaction: Transaction
): Promise<WokemonRow> =>
  databaseTransaction((tsx) =>
    tsx
      .table("wokemons")
      .select("*")
      .where({
        name,
      })
      .first()
  );

const createDbWokemon = (
  wokemon: WokemonRow[] | WokemonRow,
  databaseTransaction: Transaction
) => databaseTransaction((tsx) => tsx.table("wokemons").insert(wokemon));

export { getDbWokemeonByName, createDbWokemon };
