import { getAllTypes, getTypeById } from "../../infra/repositories";
import { Transaction } from "../types";

const getAll = (database: Transaction) => getAllTypes(database);

const getById = (database: Transaction, id: string) =>
  getTypeById(database, id);

export { getAll, getById };
