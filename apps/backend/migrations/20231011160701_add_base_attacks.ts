import { Knex } from "knex";
import { baseType } from "../src/infra/database/base/baseType";
import { baseAtack } from "../src/infra/database/base/baseAttacks";

export async function up(knex: Knex): Promise<void> {
  return knex.table("attacks").insert(baseAtack);
}

export async function down(knex: Knex): Promise<void> {}
