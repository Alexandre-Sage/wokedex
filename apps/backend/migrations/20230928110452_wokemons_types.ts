import { Knex } from "knex";
import { createTable } from "../src/modules/knex/table";
import { wokemonTypeAssoc } from "../src/infra/database/table";

export async function up(knex: Knex): Promise<void> {
  return createTable(knex, "wokemons_types", wokemonTypeAssoc, false);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("wokemons_types");
}
