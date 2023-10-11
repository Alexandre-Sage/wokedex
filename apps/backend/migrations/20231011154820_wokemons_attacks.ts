import { Knex } from "knex";
import { createTable } from "../src/modules/knex/table";
import { wokemonImageAssoc } from "../src/infra/database/table";
import { wokemonAttackAssoc } from "../src/infra/database/table/wokemonsAttacks.table";

export async function up(knex: Knex): Promise<void> {
  return createTable(knex, "wokemons_attacks", wokemonAttackAssoc, false);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("wokemons_attacks");
}
