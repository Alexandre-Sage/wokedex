import { useEffect, useState } from "react";
import { Attack } from "../types/Attack.type";
import { urlRegistry } from "../urlRegistry";
import { functionalFetch } from "./functional/functional";

const fetchAttacks = () =>
  functionalFetch<Attack[]>({
    method: "GET",
    url: urlRegistry.attack.base,
    responseType: "JSON",
    dataPath: "payload",
  });

const useAttacks = () => {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const refetch = async () => {
    const reply = await fetchAttacks();
    setAttacks(reply);
  };
  useEffect(() => {
    (async () => await refetch())();
  }, []);
  return { attacks, refetch };
};

export { useAttacks };
