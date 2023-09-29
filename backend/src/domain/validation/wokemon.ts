import { z, string, date, nullable, optional, number } from "zod";

const ZodWokemon = z.object({
  name: string().min(1),
  description: optional(string()),
  height: number(),
  weight: number(),
});

type WokemonPayload = z.infer<typeof ZodWokemon>;

export { WokemonPayload, ZodWokemon };
