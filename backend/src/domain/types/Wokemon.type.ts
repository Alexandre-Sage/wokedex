import { ObjectToDbTypeMapper } from "./Globals.type";
import { MetaData, MetaDataRow } from "./MetaData.type";

type WokemonId = string;

interface Wokemon extends MetaData {
  id: WokemonId;
  number:number;
  name: string;
  type?: string[];
  weight: number;
  height: number;
  description: string;
}

interface WokemonRow extends ObjectToDbTypeMapper<Omit<Wokemon, "type">> {}

export { Wokemon, WokemonId, WokemonRow };
