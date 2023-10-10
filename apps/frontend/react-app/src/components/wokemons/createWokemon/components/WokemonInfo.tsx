import { VStack, HStack } from "@chakra-ui/react";
import { WokemonPayload } from "../../../../types/Wokemon.type";
import { TextInput } from "../../../shared/inputs";
import { NumberInput } from "../../../shared/inputs/NumberInput";

const WokemonInfo = ({
  onFormChange,
}: {
  onFormChange: (
    key: keyof WokemonPayload,
    data: WokemonPayload[keyof WokemonPayload]
  ) => void;
}) => {
  return (
    <VStack gap={6}>
      <HStack>
        <TextInput
          label="Wokemon name"
          onChange={({ target: { value } }) => onFormChange("name", value)}
        />
      </HStack>
      <HStack gap={10}>
        <NumberInput
          label="Weight"
          onChange={(value) => onFormChange("weight", value)}
        />
        <NumberInput
          label="Height"
          onChange={(value) => onFormChange("height", value)}
        />
      </HStack>
      <HStack>
        <TextInput
          label="Encounter"
          onChange={({ target: { value } }) => onFormChange("encounterPlace", value)}
        />
      </HStack>
    </VStack>
  );
};

export { WokemonInfo };
