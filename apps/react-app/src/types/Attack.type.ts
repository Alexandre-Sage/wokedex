import { TypeId } from "./TypeDto.type";

type AttackId = string;

interface Attack {
  id: AttackId;
  name: string;
  specialEffect: string;
  typeId: TypeId;
  strength: number;
  description: string;
}

export { type Attack, type AttackId };
