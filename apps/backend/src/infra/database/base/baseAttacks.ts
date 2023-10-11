import { randomUUID } from "crypto";
import { AttackRow } from "../../../domain/types/Attack";
import { baseType, typeByName } from "./baseType";

const typesIds = baseType.map(({ name_en }) => name_en);
const setType = (param: keyof typeof typeByName) => typeByName[param].id;
export const baseAtack: AttackRow[] = [
  {
    id: randomUUID(),
    name: "Banshee scream",
    type_id: typeByName["feminist"].id,
    description: "",
    special_effect: "",
    strength: 1,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Allah uakbar",
    type_id: typeByName["muslim"].id,
    description: "Everything is going to explode beware",
    special_effect: "",
    strength: 1,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Heil Hitler",
    type_id: typeByName["nazi"].id,
    description: "Fatal attack",
    special_effect: "",
    strength: 1,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Earthquake",
    type_id: typeByName["fatty"].id,
    description: "Fatal attack",
    special_effect: "",
    strength: 1,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Stealth Stealing",
    type_id: typeByName["arab"].id,
    description: "Fatal attack",
    special_effect: "",
    strength: 1,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Posisoning Tofu",
    type_id: typeByName["vegan"].id,
    description: "Fatal attack",
    special_effect: "",
    strength: 1,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Puck Blaster",
    type_id: typeByName["clodo"].id,
    description: "Fatal attack",
    special_effect: "",
    strength: 1,
    created_at: new Date(),
  },
];
