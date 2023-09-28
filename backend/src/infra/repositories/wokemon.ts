import knex from "knex";
import { connection } from "../database";
import { SqlWhereClause, Transaction } from "../../domain/types";
import { objectToDbRow } from "../../modules/database/mapper";

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
 console.log('#########################  HERE  #########################')
  const rows = objectToDbRow(data);
  console.log({ rows,data  })
  return database(async (tsx) =>await  tsx.table(table).insert(rows));
};

export { create };
