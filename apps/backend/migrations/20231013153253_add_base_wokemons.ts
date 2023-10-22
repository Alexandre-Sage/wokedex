import { Knex } from "knex";
import {
  baseWokemonImage,
  baseWokemonTypes,
  baseWokemons,
  baseWokemonsAttack,
} from "../src/infra/database/base/baseWokemon";
import { baseImages } from "../src/infra/database/base/baseImage";

export async function up(knex: Knex): Promise<void> {
  await knex.table("images").insert(baseImages);
  await knex.table("wokemons").insert(baseWokemons);
  await Promise.all([
    knex.table("wokemons_types").insert(baseWokemonTypes),
    knex.table("wokemons_attacks").insert(baseWokemonsAttack),
    knex.table("wokemons_images").insert(baseWokemonImage),
  ]);
}

export async function down(knex: Knex): Promise<void> {}
