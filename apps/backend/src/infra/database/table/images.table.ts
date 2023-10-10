import { getColumns, getForeignKey } from "../../../modules/knex/columns";

const images = getColumns({
  name: "path",
  type: "string",
  nullable: false,
  unique: true,
});

const imageIdFk = getForeignKey({
  name: "image_id",
  type: "uuid",
  foreignKey: {
    fk_field: "id",
    table: "images",
  },
});

export { images, imageIdFk };
