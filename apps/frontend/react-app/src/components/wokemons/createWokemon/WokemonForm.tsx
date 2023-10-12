import { Button, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { theme } from "../../../App";
import { createWokemon, createWokemonImage } from "../../../api/wokemon.api";
import { WokemonPayload } from "../../../types/Wokemon.type";
import { TypeDragAndDrop } from "../../type/TypesDragAndDrop";
import { WokemonFormRightCol } from "./components/WokemonFormRightCol";
import { useAttacks } from "../../../api/attack.api";
import { AttackDragAndDrop } from "../../attack/AttackDragAndDrop";
export const Attack = () => {
  const { refetch, attacks } = useAttacks();
  return <VStack>HELLO</VStack>;
};
const CreateWokemonForm = () => {
  const [newWokemon, setNewWokemon] = useState<WokemonPayload>({
    types: [] as string[],
    image: new FormData(),
    attacks: [] as string[],
  } as WokemonPayload);
  const onFormChange = (
    key: keyof WokemonPayload,
    data: WokemonPayload[keyof WokemonPayload]
  ) => {
    setNewWokemon((newWokemon) => {
      const newData = Array.isArray(newWokemon[key])
        ? [...(newWokemon[key] as Array<any>), data]
        : data;
      return {
        ...newWokemon,
        [key]: newData,
      };
    });
  };
  const setWokemonImage = (imageToAdd: File) =>
    setNewWokemon((wokemon) => {
      // wokemon.image.append("wokemonImage", imageToAdd);
      const f = new FormData();
      f.append("wokemonImage", imageToAdd);
      return {
        ...wokemon,
        image: f,
      };
    });
  console.log({ newWokemon });
  return (
    <VStack>
      <HStack>
        <VStack>
          <WokemonFormRightCol
            onFormChange={onFormChange}
            setImage={setWokemonImage}
          />
        </VStack>
        <VStack
          bgColor={theme.config.colors.darkGrey}
          borderRadius={5}
          w="xl"
          h="xl"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <HStack>
            <TypeDragAndDrop onChange={(e) => onFormChange("types", e)} />
          </HStack>
          <HStack border={"1px solid red"} h="60" w="sm">
            <AttackDragAndDrop onChange={(e) => onFormChange("attacks", e)} />
          </HStack>
        </VStack>
      </HStack>
      <HStack>
        <Button
          w={"4xl"}
          h="16"
          onClick={async () => {
            const { success, payload } = await createWokemon(newWokemon);
            if (!success) throw new Error("Failed to save wokemon");
            await createWokemonImage(newWokemon.image, payload.id);
          }}
        >
          Add Wokemon
        </Button>
      </HStack>
    </VStack>
  );
};

export { CreateWokemonForm };
