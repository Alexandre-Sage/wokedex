import { VStack, HStack, Button, Stack } from "@chakra-ui/react";
import { ImageInput, theme } from "../../../../App";
import { WokemonPayload } from "../../../../types/Wokemon.type";
import { TextAreaInput } from "../../../shared/inputs";
import { WokemonInfo } from "./WokemonInfo";
import { FormSectionLayout } from "../WokemonForm";

const WokemonFormRightCol = ({
  onFormChange,
  setImage,
}: {
  onFormChange: (
    key: keyof WokemonPayload,
    data: WokemonPayload[keyof WokemonPayload]
  ) => void;
  setImage: (imageToAdd: File) => void;
}) => {
  return (
    <FormSectionLayout>
      <Stack
        direction={{ xl: "row", md: "row", sm: "column", base: "column" }}
        gap={{ xl: 10, md: 5, sm: 4, base: 4 }}
      >
        <VStack>
          <ImageInput onFormChange={setImage} />
        </VStack>
        <VStack>
          <WokemonInfo onFormChange={onFormChange} />
        </VStack>
      </Stack>
      <HStack>
        <TextAreaInput
          label="Description"
          // w="lg"
          w={{ xl: "lg", md: "2md", sm: "sm", base: "xs" }}
          onChange={({ target: { value } }) =>
            onFormChange("description", value)
          }
        />
      </HStack>
    </FormSectionLayout>
  );
};

export { WokemonFormRightCol };
