import { Knex } from "knex";
import { ObjectKeysToArray } from "./Globals.type";

type DbRow<RowType> = Knex.DbRecordArr<RowType>;

interface Mapper<ObjectType, RowType> {
  objectToDbRow: (data: ObjectType) => DbRow<RowType>;
  dbRowToObject: (data: RowType) => ObjectType;
}

interface SqlWhereClause<RowType> {
  columnName: Extract<keyof RowType, string>;
  operator?: "=" | "<" | ">" | "<>" | "<=" | ">=";
  searchValue: Knex.Value;
  selectedField?: ObjectKeysToArray<RowType>;
}
type DatabaseClient = Knex<any, unknown[]>;

type DbTransaction<T> = Knex.Transaction<DbRow<T>>;

type TransactionCallBack<Type> = (
  transaction: DbTransaction<Type>
) => Promise<Type>;
type Transaction = <Type = void>(
  p2: TransactionCallBack<Type>
) => Promise<Type>;


export {
  DatabaseClient,
  DbRow,
  DbTransaction,
  Mapper,
  SqlWhereClause,
  Transaction,
  TransactionCallBack,
};