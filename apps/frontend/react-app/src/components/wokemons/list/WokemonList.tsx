import { VStack } from "@chakra-ui/react";
import { useAllWokemons } from "../../../api/wokemon.api";

interface WokemonListProps {}
const WokemonList = () => {
  const { refetch, wokemons } = useAllWokemons();
  return <VStack></VStack>;
};

export { WokemonList };
