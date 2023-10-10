import { assoc, lens, prop, set } from "ramda";
import { Wokemon } from "../../domain/types";

const nameLens = lens<Wokemon, string>(prop("name"), assoc("name"));
const setName = (wokemon: Wokemon, name: string) =>
  set(nameLens, name, wokemon);

export { nameLens, setName };
