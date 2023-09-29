import knex from "knex";
import { connection } from "../database";
import {
  DbRow,
  DbTransaction,
  ObjectToDbTypeMapper,
  SqlWhereClause,
  Transaction,
  TransactionCallBack,
} from "../../domain/types";
import { dbRowToObject, objectToDbRow } from "../../modules/database/mapper";
import { filter, map, prop } from "ramda";

const create = <ObjectType extends Object>(
  database: Transaction,
  {
    data,
    table,
  }: {
    table: string;
    data: ObjectType;
    //where: SqlWhereClause<ObjectType>;
    //field: keyof DbRowType;
  }
) => {
  const rows = objectToDbRow(data);
  return database<void>(async (tsx) => await tsx.table(table).insert(rows));
};

const getAll = async <Type>(
  database: Transaction,
  {
    table,
  }: {
    table: string;
  }
) => {
  const rows = await database<ObjectToDbTypeMapper<Type>[]>((tsx) =>
    tsx.table(table).select("*")
  );
  return map(dbRowToObject, rows) as Type[];
};

const getOne = async <Type, Row>(
  database: Transaction,
  {
    table,
    where: { searchValue, columnName, operator },
  }: {
    table: string;
    where: SqlWhereClause<Type>;
    //field: keyof DbRowType;
  }
) => {
  const row = await database<ObjectToDbTypeMapper<Type>>((tsx) =>
    tsx
      .table(table)
      .select("*")
      .where(columnName, operator || "=", searchValue)
      .first()
  );
  return dbRowToObject(row) as Type;
};

export { create, getAll, getOne };
