import { HStack, VStack, Heading, Tag, Text, Image } from "@chakra-ui/react";
import { WokemonDto } from "../../../types/Wokemon.type";
import { baseUrl } from "../../../urlRegistry";
import { theme } from "../../../App";
import { AppReducer } from "../../shared/appshell/AppReducer";
interface WokemonListItemProps {
  appReducer: AppReducer;
  wokemon: WokemonDto;
}
const WokemonListItem = ({ wokemon, appReducer }: WokemonListItemProps) => (
  <HStack
    onClick={() => appReducer.appReducerDispatch({type:"WOKEMON_DETAILS",payload:{wokemonId:wokemon.id}})}
    cursor={"pointer"}
    bg={theme.config.colors.darkGrey}
    borderRadius={5}
    h={"xs"}
    w={"3xs"}
    justify={"center"}
  >
    <VStack gap={5}>
      <Heading as={"h3"} size={"md"} color={"white"}>
        {wokemon.name}
      </Heading>
      <VStack>
        <Image
          borderRadius={5}
          w="48"
          h="40"
          src={`${baseUrl}/${wokemon.images[0].path}`}
        />
      </VStack>
      <HStack
        border={"1px solid white"}
        w="44"
        h="12"
        justify={"center"}
        borderRadius={5}
      >
        {wokemon.types.map(({ nameEn }) => {
          console.log({ nameEn });
          return <Tag>{nameEn}</Tag>;
        })}
      </HStack>
    </VStack>
  </HStack>
);

export { WokemonListItem };
