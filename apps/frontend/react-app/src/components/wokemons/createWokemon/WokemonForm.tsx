import { Button, HStack, VStack, Stack } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
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

export const FormSectionLayout = ({ children }: { children: ReactNode }) => (
  <VStack
    bgColor={theme.config.colors.darkGrey}
    borderRadius={5}
    h={{ xl: "xl", md: "md", sm: "md",base:"md" }}
    w={{ xl: "xl", md: "md", sm: "sm",base:"xs" }}
    alignItems={"center"}
    justifyContent={"center"}
  >
    {children}
  </VStack>
);
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
  return (
    <VStack
      alignItems={{ base: "center" }}
      justify={{ xl: "center", md: "center", sm: "flex-end" }}
      direction={"column"}
    >
      <Stack
        border={"1px solid red"}
        alignItems={{ base: "center" }}
        justify={{ xl: "center", md: "center", sm: "flex-end" }}
        direction={{ xl: "row", md: "row", sm: "column", base: "column" }}
        h={{ xl: "3xl", md: "xl", sm: "4xl",base:"4xl" }}
      >
        <WokemonFormRightCol
          onFormChange={onFormChange}
          setImage={setWokemonImage}
        />
        <FormSectionLayout>
          <HStack>
            <TypeDragAndDrop onChange={(e) => onFormChange("types", e)} />
          </HStack>
          <HStack /* border={"1px solid red"} h="60" w="sm" */>
            <AttackDragAndDrop onChange={(e) => onFormChange("attacks", e)} />
          </HStack>
        </FormSectionLayout>
      </Stack>
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
