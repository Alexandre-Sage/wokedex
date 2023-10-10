import { Type } from "./TypeDto.type";

interface WokemonPayload {
  name: string;
  description: string;
  weight: number;
  height: number;
  encounterPlace: string;
  // image: File;
  types: string[];
  image:FormData
}

export { type WokemonPayload };
