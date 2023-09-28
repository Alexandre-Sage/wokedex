import { ObjectToDbTypeMapper } from "./Globals.type";
import { MetaData } from "./MetaData.type";

type TypeId = string;

interface Type extends MetaData {
  id: TypeId;
  name_en: string;
  name_fr:string;
}

interface TypeRow extends ObjectToDbTypeMapper<Type> {}

export { Type, TypeId, TypeRow };
