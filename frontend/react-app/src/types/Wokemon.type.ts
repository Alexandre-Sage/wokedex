import { Type } from "./TypeDto.type";

interface WokemonPayload {
  name: string;
  description: string;
  weight: number;
  height: number;
  encounter: string;
  image: File;
  types: string[];
}

export { type WokemonPayload };
