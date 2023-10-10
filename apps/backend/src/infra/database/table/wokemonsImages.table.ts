import { getColumns } from "../../../modules/knex/columns";
import { imageIdFk } from "./images.table";
import { wokemonIdFk } from "./wokemon.table";

const wokemonImageAssoc = getColumns({ ...wokemonIdFk }, { ...imageIdFk });

export { wokemonImageAssoc };
