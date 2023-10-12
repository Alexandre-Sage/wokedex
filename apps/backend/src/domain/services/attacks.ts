import { getAllAttacks, getAttackById } from "../../infra/repositories";
import { Transaction } from "../types";

const getAll = (database: Transaction) => getAllAttacks(database);

const getById = (database: Transaction, id: string) =>
  getAttackById(database, id);

export { getAll, getById };
