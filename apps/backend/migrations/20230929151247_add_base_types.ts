import { Knex } from "knex";
import { baseType } from "../src/infra/database/base/baseType";

export async function up(knex: Knex): Promise<void> {
  return knex.table("types").insert(baseType);
}

export async function down(knex: Knex): Promise<void> {}
