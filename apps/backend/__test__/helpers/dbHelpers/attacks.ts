import { map, prop } from "ramda";
import { Transaction, TypeId, TypeRow } from "../../../src/domain/types";
import { AttackId, AttackRow } from "../../../src/domain/types/Attack";

const getAttacksIds = (db: Transaction): Promise<TypeId[]> =>
  db(async (tsx) =>
    map<AttackRow, AttackId>(prop("id"), await tsx.table("attacks").select("id"))
  );

export { getAttacksIds  };
