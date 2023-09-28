import { getColumns } from "../../../modules/knex/columns";
import { typeIdFk } from "./type.table";
import { wokemonIdFk } from "./wokemon.table";

const wokemonTypeAssoc = getColumns({ ...wokemonIdFk }, { ...typeIdFk });

export { wokemonTypeAssoc };
