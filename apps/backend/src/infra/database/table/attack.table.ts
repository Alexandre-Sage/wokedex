import { getColumns, getForeignKey } from "../../../modules/knex/columns";
import { typeIdFk } from "./type.table";

const attack = getColumns(
  { name: "name", type: "string", nullable: false, unique: true },
  { name: "strength", type: "decimal", nullable: true },
  { name: "special_effect", type: "string", nullable: true },
  { name: "description", type: "string", nullable: true },
  { ...typeIdFk }
);

const attackIdFk = getForeignKey({
  name: "attack_id",
  type: "uuid",
  foreignKey: {
    fk_field: "id",
    table: "atack",
  },
});

export { attack, attackIdFk };
