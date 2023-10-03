import { WokemonPayload } from "../types/Wokemon.type";
import { urlRegistry } from "../urlRegistry";
import { functionalFetch } from "./functional/functional";

const createWokemon = ({ types, image, ...wokemon }: WokemonPayload) =>
  functionalFetch({
    method: "POST",
    url: urlRegistry.wokemons.base,
    body: { wokemon, types },
  });

export { createWokemon };
