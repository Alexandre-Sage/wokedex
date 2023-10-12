import { Transaction, Type } from "../../domain/types";
import { AttackId, Attack, AttackRow } from "../../domain/types/Attack";
import { getAll, getOne } from "./functionalRepository";
const table = "attacks";
const getAllAttacks = (database: Transaction) =>
  getAll<Type>(database, {
    table,
  });

const getAttackById = (database: Transaction, id: AttackId) =>
  getOne<Attack, AttackRow>(database, {
    table,
    where: {
      columnName: "id",
      searchValue: id,
      operator: "=",
    },
  });

export { getAllAttacks, getAttackById };
