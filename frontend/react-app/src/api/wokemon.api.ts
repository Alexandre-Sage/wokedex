import { useEffect, useState } from "react";
import { WokemonPayload } from "../types/Wokemon.type";
import { urlRegistry } from "../urlRegistry";
import { functionalFetch } from "./functional/functional";

const createWokemon =async ({ types, image, ...wokemon }: WokemonPayload) =>{
  await functionalFetch({
    method: "POST",
    url: urlRegistry.wokemons.base,
    body: { wokemon, types },
  });}

const getAllWokemons = () =>
  functionalFetch<WokemonPayload[]>({
    method: "GET",
    url: urlRegistry.wokemons.base,
    dataPath: "payload",
  });

const useAllWokemons = () => {
  const [wokemons, setWokemons] = useState<WokemonPayload[]>([]);
  const refetch = async () => {
    const reply = await getAllWokemons();
    setWokemons(reply);
  };
  useEffect(() => {
    (async () => await refetch())();
  }, []);
  return { wokemons, refetch };
};

export { createWokemon, useAllWokemons };
