import { Knex } from "knex";
import { images } from "../src/infra/database/table";
import { createTable } from "../src/modules/knex/table";

export async function up(knex: Knex): Promise<void> {
  return createTable(knex, "images", images);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("images");
}
