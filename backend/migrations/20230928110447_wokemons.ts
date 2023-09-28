import { Knex } from "knex";
import { createTable } from "../src/modules/knex/table";
import { wokemon } from "../src/infra/database/table";

export async function up(knex: Knex): Promise<void> {
  return createTable(knex, "wokemons", wokemon);
}

export async function down(knex: Knex): Promise<void> {
 return knex.schema.dropTable("wokemons")

}
