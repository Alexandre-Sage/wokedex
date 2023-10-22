import { useEffect, useState } from "react";
import { WokemonDto, WokemonPayload } from "../types/Wokemon.type";
import { urlRegistry } from "../urlRegistry";
import { functionalFetch } from "./functional/functional";

const createWokemon = ({ types, attacks, ...wokemon }: WokemonPayload) =>
  functionalFetch<{ success: boolean; payload: { id: string } }>({
    method: "POST",
    url: urlRegistry.wokemons.base,
    body: { wokemon, types, attacks },
  });

const createWokemonImage = async (image: FormData, id: string) => {
  const reply = await fetch(urlRegistry.wokemons.postImages(id), {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
    },
    body: image,
  });
  return reply.json();
};

const getAllWokemons = () =>
  functionalFetch<WokemonDto[]>({
    method: "GET",
    url: urlRegistry.wokemons.base,
    dataPath: "payload",
  });

const useAllWokemons = () => {
  const [wokemons, setWokemons] = useState<WokemonDto[]>([]);
  const refetch = async () => {
    const reply = await getAllWokemons();
    setWokemons(reply);
  };
  useEffect(() => {
    (async () => await refetch())();
  }, []);
  return { wokemons, refetch };
};

export { createWokemon, useAllWokemons, createWokemonImage };
