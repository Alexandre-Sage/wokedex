import { Stack } from "@chakra-ui/react";
import { useAllWokemons } from "../../../api/wokemon.api";
import { WokemonListItem } from "./WokemonListItem";
import { AppReducer } from "../../shared/appshell/AppReducer";

interface WokemonListProps {
  appReducer: AppReducer;
}

const WokemonList = ({ appReducer }: WokemonListProps) => {
  const { wokemons } = useAllWokemons();
  const wokemonsTsx = wokemons.map((wokemon) => (
    <WokemonListItem wokemon={wokemon} />
  ));
  return (
    <Stack
      w={"4xl"}
      h="90vh"
      wrap={"wrap"}
      direction={"row"}
      justifyContent={"center"}
      gap={5}
      align={"center"}
      overflow={"scroll"}
    >
      {[
        ...wokemonsTsx,
        ...wokemonsTsx,
        ...wokemonsTsx,
        ...wokemonsTsx,
        ...wokemonsTsx,
      ]}
    </Stack>
  );
};

export { WokemonList };
