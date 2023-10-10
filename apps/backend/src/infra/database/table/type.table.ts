import { getColumns, getForeignKey } from "../../../modules/knex/columns";

const type = getColumns(
  { name: "name_en", type: "string", nullable: true },
  { name: "name_fr", type: "string", nullable: true }
);

const typeIdFk = getForeignKey({
  name: "type_id",
  type: "uuid",
  foreignKey: {
    fk_field: "id",
    table: "types",
  },
});

export { type, typeIdFk };
