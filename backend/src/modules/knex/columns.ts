import { Knex } from "knex";
import { Column } from "./table";

const tableMetadata = (table: Knex.CreateTableBuilder) => (
  table.date("created_at").notNullable(),
  table.date("updated_at").nullable(),
  table.date("deleted_at").nullable()
);

const tableId = (table: Knex.CreateTableBuilder) =>
  table.uuid("id").primary().unique().notNullable();

const getColumns = (...args: Column[]) => args;
const getForeignKey = (arg: Column) => arg;

export { tableId, tableMetadata, getColumns, getForeignKey };
