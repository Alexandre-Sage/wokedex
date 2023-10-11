import { Knex } from "knex";
import { wokemonAttackAssoc } from "../src/infra/database/table/wokemonsAttacks.table";
import { createTable } from "../src/modules/knex/table";

export async function up(knex: Knex): Promise<void> {
  return createTable(knex, "wokemons_attacks", wokemonAttackAssoc, false);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("wokemons_attacks");
}
