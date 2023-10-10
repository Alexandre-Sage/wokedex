import { Knex } from "knex";
import { tableId, tableMetadata } from "./columns";

interface Column {
  name: string;
  type: ColumnTypes;
  nullable?: boolean;
  unique?: boolean;
  foreignKey?: {
    table: string;
    fk_field: string;
  };
}

type ColumnTypes = keyof Pick<
  Knex.CreateTableBuilder,
  "string" | "date" | "dateTime" | "uuid" | 'smallint' | "bigInteger" | "bigint" | "decimal"
>;

const createTable = (knex: Knex, tableName: string, columns: Column[], primaryKeys = true) =>
  knex.schema.createTable(tableName, (table) => {
    primaryKeys && tableId(table);
    for (const { name, type, nullable, unique, foreignKey } of columns) {
      let col = table[type](name);
      let fkCol: Knex.ReferencingColumnBuilder | null = null;
      if (unique) col = col.unique();
      if (nullable) col = col.nullable();
      else col = col.notNullable();
      if (foreignKey)
        fkCol = table
          .foreign(name)
          .references(`${foreignKey.table}.${foreignKey.fk_field}`)
          .onDelete("CASCADE");
      col;
      fkCol;
    }
    tableMetadata(table);
  });

export { ColumnTypes, Column, createTable };
