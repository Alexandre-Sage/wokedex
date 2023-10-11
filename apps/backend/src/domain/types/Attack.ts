import { ObjectToDbTypeMapper } from "./Globals.type";
import { MetaData } from "./MetaData.type";
import { TypeId } from "./WokemonType.type";

type AttackId = string;

interface Attack extends MetaData {
  id: AttackId;
  name: string;
  specialEffect: string;
  typeId: TypeId;
  strength: number;
  description: string;
}

interface AttackRow extends ObjectToDbTypeMapper<Attack> {}

export { Attack, AttackId, AttackRow };
