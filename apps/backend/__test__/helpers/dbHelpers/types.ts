import { map, prop } from "ramda";
import { Transaction, TypeId, TypeRow } from "../../../src/domain/types";

const getTypesIds = (db: Transaction): Promise<TypeId[]> =>
  db(async (tsx) =>
    map<TypeRow, TypeId>(prop("id"), await tsx.table("types").select("id"))
  );

export { getTypesIds };
