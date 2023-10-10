import { Transaction, Type, TypeId, TypeRow } from "../../domain/types";
import { getAll, getOne } from "./functionalRepository";
const table = "types";
const getAllTypes = (database: Transaction) =>
  getAll<Type>(database, {
    table,
  });

const getTypeById = (database: Transaction, id: TypeId) =>
  getOne<Type, TypeRow>(database, {
    table,
    where: {
      columnName: "id",
      searchValue: id,
      operator: "=",
    },
  });

export { getAllTypes, getTypeById };
