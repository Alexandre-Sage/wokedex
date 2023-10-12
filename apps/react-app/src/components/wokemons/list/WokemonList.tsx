import { Stack, VStack,Text } from "@chakra-ui/react";
import { useAllWokemons } from "../../../api/wokemon.api";

interface WokemonListProps {}
const WokemonList = () => {
  const { refetch, wokemons } = useAllWokemons();
  const wokemonsTsx = wokemons.map(wokemon => (
    <Stack>
      <Text>{wokemon.name}</Text>
    </Stack>
  ))
  return <VStack></VStack>;
};

export { WokemonList };
