import { z, string, date, nullable, optional, number } from "zod";

const ZodWokemon = z.object({
  name: string().min(1),
  description: optional(string()),
  height: string(),
  weight: string(),
});

type WokemonPayload = z.infer<typeof ZodWokemon>;

export { WokemonPayload, ZodWokemon };
