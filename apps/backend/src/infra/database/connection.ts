import knex, { Knex } from "knex";
import { TransactionCallBack } from "../../domain/types";
import { curry } from "ramda";

const databaseTransaction = async <Type = void>(
  databaseInstance: Knex,
  callBack: TransactionCallBack<Type>
) =>
  databaseInstance.transaction<Type>(
    async (transaction) => await callBack(transaction)
  );

const connection = (connection: Knex) => curry(databaseTransaction)(connection);

export { connection };
