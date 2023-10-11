import { getColumns } from "../../../modules/knex/columns";
import { attackIdFk } from "./attack.table";
import { wokemonIdFk } from "./wokemon.table";

const wokemonAttackAssoc = getColumns({ ...wokemonIdFk }, { ...attackIdFk });

export { wokemonAttackAssoc };

