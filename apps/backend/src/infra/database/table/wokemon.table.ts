import { getColumns, getForeignKey } from "../../../modules/knex/columns";

const wokemon = getColumns(
  { name: "name", type: "string", nullable: false, unique: true },
  { name: "weight", type: "decimal", nullable: true },
  { name: "height", type: "decimal", nullable: true },
  { name: "description", type: "string", nullable: true },
  { name: "number", type: "bigInteger", nullable: true },
  { name: "encounter_place", type: "string", nullable: true }
);

const wokemonIdFk = getForeignKey({
  name: "wokemon_id",
  type: "uuid",
  foreignKey: {
    fk_field: "id",
    table: "wokemons",
  },
});

export { wokemon, wokemonIdFk };
