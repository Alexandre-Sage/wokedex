import { VStack, Text } from "@chakra-ui/react";
import { AppReducer } from "../../shared/appshell/AppReducer";

interface WokemonProps {
  appReducer: AppReducer;
}

const Wokemon = ({ appReducer }: WokemonProps) => {
  return (
    <VStack>
      <Text>Hello</Text>
    </VStack>
  );
};
export { Wokemon };
