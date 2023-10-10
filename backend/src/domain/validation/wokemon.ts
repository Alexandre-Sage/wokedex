import { z, string, date, nullable, optional, number, coerce } from "zod";
import { Wokemon } from "../types";

const ZodWokemon = z.object({
  name: string().min(1),
  description: optional(string()),
  height: coerce.number(),
  weight: coerce.number(),
  encounterPlace: optional(string()),
});




type WokemonPayload = z.infer<typeof ZodWokemon>;

export { WokemonPayload, ZodWokemon };
