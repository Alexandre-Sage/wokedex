import { VStack, HStack, Button } from "@chakra-ui/react";
import { ImageInput, theme } from "../../../../App";
import { WokemonPayload } from "../../../../types/Wokemon.type";
import { TextAreaInput } from "../../../shared/inputs";
import { WokemonInfo } from "./WokemonInfo";

const WokemonFormRightCol = ({
  onFormChange,
  setImage
}: {
  onFormChange: (
    key: keyof WokemonPayload,
    data: WokemonPayload[keyof WokemonPayload]
  ) => void;
  setImage:(imageToAdd: File) => void
}) => {
  return (
    <VStack
      bgColor={theme.config.colors.darkGrey}
      borderRadius={5}
      w="xl"
      h="xl"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <HStack gap={10}>
        <VStack>
          <ImageInput onFormChange={setImage} />
        </VStack>
        <VStack>
          <WokemonInfo onFormChange={onFormChange} />
        </VStack>
      </HStack>
      <HStack>
        <TextAreaInput
          label="Description"
          w="lg"
          onChange={({ target: { value } }) =>
            onFormChange("description", value)
          }
        />
      </HStack>
      
    </VStack>
  );
};

export { WokemonFormRightCol };
