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
    data: ObjectType | ObjectType[];
    //where: SqlWhereClause<ObjectType>;
    //field: keyof DbRowType;
  }
) => {
  const rows = Array.isArray(data)
    ? map(objectToDbRow, data)
    : objectToDbRow(data);
  return database<void>(async (tsx) => await tsx.table(table).insert(rows));
};

const getAll = async <Type>(
  database: Transaction,
  {
    table,
    where: { searchValue, columnName, operator } = {} as SqlWhereClause<
      ObjectToDbTypeMapper<Type>
    >,
  }: {
    table: string;
    where?: SqlWhereClause<ObjectToDbTypeMapper<Type>>;
  }
) => {
  const rows = await database<ObjectToDbTypeMapper<Type>[]>((tsx) =>
    !!columnName
      ? tsx
          .table(table)
          .select("*")
          .where(columnName, operator || "=", searchValue)
      : tsx.table(table).select("*")
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
    where: SqlWhereClause<Row>;
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





export class Repository<
  ObjectType extends Object,
  // RowType extends ObjectToDbTypeMapper<ObjectType>
> {
  //protected readonly mapper = new Mapper<ObjectType, RowType>();
  constructor(
    protected readonly transaction: Transaction,
    protected table: string
  ) {}
  readonly createBatch = (data: ObjectType[]) => {
    const rows = data.map((item) => objectToDbRow(item));
    return this.transaction(async (tsx) => tsx.table(this.table).insert(rows));
  };
  readonly create = async (data: ObjectType) => {
    const row = objectToDbRow(data);
    return this.transaction(async (transaction) =>
      transaction.table(this.table).insert(row)
    );
  };
  readonly fetchOne = async ({
    searchValue,
    columnName,
    operator,
    selectedField,
  }: SqlWhereClause<ObjectToDbTypeMapper<ObjectType>>) => {
    // @ts-expect-error
    return this.transaction<Maybe<ObjectType>>(async (transaction) => {
      const row = 
        await transaction
          .table(this.table)
          .select(selectedField ?? "*")
          .where(columnName || "id", operator || "=", searchValue)
          .first()
      
      return dbRowToObject(row);
    });
  };
  readonly fetchAll = ({
    columnName,
    operator,
    searchValue,
    selectedField,
  }: Partial<SqlWhereClause<ObjectToDbTypeMapper<ObjectType>>>) => {
    return this.transaction<ObjectType[]>(async (transaction) => {
      const rows = 
        (await transaction
          .table(this.table)
          .select(selectedField || "*")
          .where(
            columnName || ("id" as any),
            operator || "=",
            searchValue || null
          )) as ObjectToDbTypeMapper<ObjectType>[]
      
      return rows.map((item) => dbRowToObject(item));
    });
  };
  readonly update = async ({
    data,
    searchValue,
    columnName,
    operator,
  }: { data: ObjectType } & Omit<SqlWhereClause<ObjectToDbTypeMapper<ObjectType>>, "selectedField">) => {
    const row = objectToDbRow(data);
    return this.transaction(async (transaction) => {
      await transaction
        .table(this.table)
        .update(row)
        .where(columnName || "id", operator || "=", searchValue);
    });
  };
  readonly delete = (id: string) => {
    return this.transaction(async (transaction) => {
      transaction.table(this.table).delete("*").where("id", "=", id);
    });
  };
} 
