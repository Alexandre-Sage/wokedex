import { Type } from "./TypeDto.type";

interface WokemonPayload {
  name: string;
  description: string;
  weight: number;
  height: number;
  encounterPlace: string;
  // image: File;
  types: string[];
  image: FormData;
  attacks: string[];
}

interface WokemonDto {
  id:string,
  name: string;
  description: string;
  weight: number;
  height: number;
  encounterPlace: string;
  // image: File;
  types: {
    id: string;
    nameEn: string;
  }[];
  images: {
    id: string;
    path: string;
  }[];
}

export { type WokemonPayload, type WokemonDto };
