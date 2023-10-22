import { randomUUID } from "crypto";
import {
  WokemonAttackRow,
  WokemonImageRow,
  WokemonRow,
  WokemonTypeRow,
} from "../../../domain/types";
import { typeByName } from "./baseType";
import { indexBy, prop } from "ramda";
import { baseImageIndexedByPath } from "./baseImage";
import { baseAttacksIndexedByName } from "./baseAttacks";

export const baseWokemons: WokemonRow[] = [
  {
    id: randomUUID(),
    name: "Meluche",
    description:
      "Le plus grand des tartuffe attention a son haleine fétide de vieux communiste",
    weight: 0,
    height: 0,
    number: 0,
    encounter_place: "Paris",
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Common banshee",
    description: "Common banshee can be found everywhere",
    weight: 50,
    height: 150,
    number: 1,
    encounter_place: "Earth",
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Batskin",
    description:
      "Beware of this fascist leader, former hooligans he has no mercy for immigrates",
    weight: 80,
    height: 175,
    number: 2,
    encounter_place: "France",
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ben laden",
    description:
      "Beware of this fascist leader, former hooligans he has no mercy for immigrates",
    weight: 70,
    height: 175,
    number: 3,
    encounter_place: "Afganistan",
    created_at: new Date(),
  },
];

const wokemonByName = indexBy<WokemonRow, WokemonRow["name"]>(
  prop("name"),
  baseWokemons
);

export const baseWokemonTypes: WokemonTypeRow[] = [
  {
    created_at: new Date(),
    type_id: typeByName["comunist"].id,
    wokemon_id: wokemonByName["Meluche"].id,
  },
  {
    created_at: new Date(),
    type_id: typeByName["leftist"].id,
    wokemon_id: wokemonByName["Meluche"].id,
  },
  {
    created_at: new Date(),
    type_id: typeByName["leftist"].id,
    wokemon_id: wokemonByName["Common banshee"].id,
  },
  {
    created_at: new Date(),
    type_id: typeByName["feminist"].id,
    wokemon_id: wokemonByName["Common banshee"].id,
  },
  {
    created_at: new Date(),
    type_id: typeByName["rightarted"].id,
    wokemon_id: wokemonByName["Batskin"].id,
  },
  {
    created_at: new Date(),
    type_id: typeByName["nazi"].id,
    wokemon_id: wokemonByName["Batskin"].id,
  },
  {
    created_at: new Date(),
    type_id: typeByName["arab"].id,
    wokemon_id: wokemonByName["Ben laden"].id,
  },
  {
    created_at: new Date(),
    type_id: typeByName["muslim"].id,
    wokemon_id: wokemonByName["Ben laden"].id,
  },
];

export const baseWokemonImage: WokemonImageRow[] = [
  {
    wokemon_id: wokemonByName["Meluche"].id,
    created_at: new Date(),
    image_id: baseImageIndexedByPath["base/meluche.jpg"].id,
  },
  {
    wokemon_id: wokemonByName["Common banshee"].id,
    created_at: new Date(),
    image_id: baseImageIndexedByPath["base/common_banshee.jpg"].id,
  },
  {
    wokemon_id: wokemonByName["Batskin"].id,
    created_at: new Date(),
    image_id: baseImageIndexedByPath["base/serge_ayoub.jpg"].id,
  },
  {
    wokemon_id: wokemonByName["Ben laden"].id,
    created_at: new Date(),
    image_id: baseImageIndexedByPath["base/ben_laden.jpg"].id,
  },
];

export const baseWokemonsAttack: WokemonAttackRow[] = [
  {
    wokemon_id: wokemonByName["Meluche"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Allah uakbar"].id,
  },
  {
    wokemon_id: wokemonByName["Meluche"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Abuse of power"].id,
  },
  {
    wokemon_id: wokemonByName["Meluche"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Critical race theory"].id,
  },
  {
    wokemon_id: wokemonByName["Meluche"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Tax de riches"].id,
  },
  //
  {
    wokemon_id: wokemonByName["Common banshee"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Banshee scream"].id,
  },
  {
    wokemon_id: wokemonByName["Common banshee"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Men are trash"].id,
  },
  {
    wokemon_id: wokemonByName["Common banshee"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Cut them balls"].id,
  },
  //
  {
    wokemon_id: wokemonByName["Batskin"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Ratonade"].id,
  },
  {
    wokemon_id: wokemonByName["Batskin"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Heil Hitler"].id,
  },
  {
    wokemon_id: wokemonByName["Batskin"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Hooligan tackle"].id,
  },
  {
    wokemon_id: wokemonByName["Ben laden"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Allah uakbar"].id,
  },
  {
    wokemon_id: wokemonByName["Ben laden"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Kamikaze plane"].id,
  },
  {
    wokemon_id: wokemonByName["Ben laden"].id,
    created_at: new Date(),
    attack_id: baseAttacksIndexedByName["Mass slaughter"].id,
  },
];
