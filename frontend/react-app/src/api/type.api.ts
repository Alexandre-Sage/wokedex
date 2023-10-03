import { useState, useEffect } from "react";
import { urlRegistry } from "../urlRegistry";
import { functionalFetch } from "./functional/functional";
import { Type } from "../types/TypeDto.type";

const fetchTypes = () =>
  functionalFetch<Type[]>({
    method: "GET",
    url: urlRegistry.types.base,
    responseType: "JSON",
    dataPath: "payload",
  });

const useTypes = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const refetch = async () => {
    const reply = await fetchTypes();
    setTypes(reply);
  };
  useEffect(() => {
    (async () => await refetch())();
  }, []);
  return { types, refetch };
};

export { useTypes };
