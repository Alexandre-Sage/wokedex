import { Knex } from "knex";
import { TypeRow } from "../src/domain/types";
import { randomUUID } from "crypto";

export async function up(knex: Knex): Promise<void> {
  return knex.table("types").insert([
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "feminist",
      name_fr: "feministe",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "lgbtqia+",
      name_fr: "lgbtqia+",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "vegan",
      name_fr: "vegan",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "junkie",
      name_fr: "droguer",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "non binary",
      name_fr: "non binaire",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "fragilus",
      name_fr: "fragilus",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "incell",
      name_fr: "incell",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "virgin",
      name_fr: "pucix",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "journalist",
      name_fr: "journalope",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "rightarted",
      name_fr: "droitarder",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "leftist",
      name_fr: "gauchiste",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "minority",
      name_fr: "minoritée",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "go muscu",
      name_fr: "go muscu",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "cheuvreuil",
      name_fr: "cheuvreuil",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "muslim",
      name_fr: "musulman",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "thug",
      name_fr: "racaille",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "nazi",
      name_fr: "nazi",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "fascist",
      name_fr: "facho",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "comunist",
      name_fr: "communiste",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "bolchevick",
      name_fr: "bolchevick",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "bolchevick",
      name_fr: "bolchevick",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "black",
      name_fr: "noir",
    },
    {
      id: randomUUID(),
      created_at: new Date(),
      name_en: "hippie",
      name_fr: "hippie",
    },
  ] as TypeRow[]);
}

export async function down(knex: Knex): Promise<void> {}
