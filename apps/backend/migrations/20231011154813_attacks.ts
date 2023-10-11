import { Knex } from "knex";
import { attack } from "../src/infra/database/table";
import { createTable } from "../src/modules/knex/table";

export async function up(knex: Knex): Promise<void> {
  return createTable(knex, "attacks", attack);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("attacks");
}


