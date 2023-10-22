import { z, string, date, nullable, optional, number, coerce,array } from "zod";
import { Wokemon } from "../types";

const ZodWokemon = z.object({
  name: string().min(1),
  description: optional(string()),
  height: coerce.number(),
  weight: coerce.number(),
  encounterPlace: optional(string()),
  types: array(string()),
  attacks: array(string())
});




type WokemonPayload = z.infer<typeof ZodWokemon>;

export { WokemonPayload, ZodWokemon };
