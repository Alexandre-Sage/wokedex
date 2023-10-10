import { ObjectToDbTypeMapper } from "./Globals.type";
import { MetaData } from "./MetaData.type";
import { WokemonId } from "./Wokemon.type";

type TypeId = string;

interface Type extends MetaData {
  id: TypeId;
  name_en: string;
  name_fr: string;
}

interface TypeRow extends ObjectToDbTypeMapper<Type> {}

interface WokemonType extends MetaData {
  wokemonId: WokemonId;
  typeId: TypeId;
}
interface WokemonTypeRow extends ObjectToDbTypeMapper<WokemonType> {}

export { Type, TypeId, TypeRow, WokemonTypeRow, WokemonType };
