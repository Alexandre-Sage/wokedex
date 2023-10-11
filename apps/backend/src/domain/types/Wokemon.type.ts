import { AtackId } from "./Attack";
import { ObjectToDbTypeMapper } from "./Globals.type";
import { ImageId } from "./Images.types";
import { MetaData, MetaDataRow } from "./MetaData.type";

type WokemonId = string;

interface Wokemon extends MetaData {
  id: WokemonId;
  number: number;
  name: string;
  type?: string[];
  weight: number;
  height: number;
  description: string;
  encounterPlace: string;
}

interface WokemonRow extends ObjectToDbTypeMapper<Omit<Wokemon, "type">> {}

interface WokemonImage extends MetaData {
  wokemonId: WokemonId;
  imageId: ImageId;
}

interface WokemonImageRow extends ObjectToDbTypeMapper<WokemonImage> {}

interface WokemonAttack extends MetaData {
  wokemonId: WokemonId;
  attackId: AtackId;
}

interface WokemonAttackRow extends ObjectToDbTypeMapper<WokemonImage> {}

export {
  Wokemon,
  WokemonId,
  WokemonRow,
  WokemonImageRow,
  WokemonImage,
  WokemonAttack,
  WokemonAttackRow,
};
