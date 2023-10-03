import { MetaData } from "./MetaData.type";

type TypeId = string;

interface Type extends MetaData {
  id: TypeId;
  nameEn: string;
  nameFr: string;
}

export { type Type, type TypeId };
