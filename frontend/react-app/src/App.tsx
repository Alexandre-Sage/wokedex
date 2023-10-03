import {
  Box,
  Button,
  ChakraProvider,
  HStack,
  Image,
  Input,
  Tag,
  VStack,
} from "@chakra-ui/react";
import "./app.css";
import { extendTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { functionalFetch } from "./api/functional/functional";
import { AppShell } from "./components/shared/appshell/AppShell";
import { DragAndDrop } from "./components/shared/draggable/DragAndDrop";
import { TextAreaInput, TextInput } from "./components/shared/inputs";
import { NumberInput } from "./components/shared/inputs/NumberInput";
import { Type } from "./types/TypeDto.type";
import { urlRegistry } from "./urlRegistry";
import { useTypes } from "./api/type.api";
import { lens, prop } from "ramda";
import { CreateWokemonForm } from "./components/createWokemon/WokemonForm";
import { WokemonPayload } from "./types/Wokemon.type";
export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    colors: {
      background: "#252525",
      darkGrey: "#636363",
      // appShell: {},
    },
  },
});

export const ImageInput = ({
  onFormChange,
}: {
  onFormChange: (
    key: keyof WokemonPayload,
    data: WokemonPayload[keyof WokemonPayload]
  ) => void;
}) => {
  const [selectedPreview, setSelectedPreview] = useState<any>("");
  return (
    <Box>
      <Button bgRepeat={"no-repeat"} zIndex={1} w="fit-content" h="fit-content">
        <Input
          bgImage={selectedPreview}
          h="2xs"
          onChange={(item) => {
            onFormChange("image", item.target.value);
            setSelectedPreview(URL.createObjectURL(item.target.files![0]));
          }}
          bgSize={"cover"}
          type="file"
          bgColor={"white"}
          textColor={"white"}
          placeholder="Hello"
        />
      </Button>
    </Box>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppShell>
        <VStack>
          <CreateWokemonForm />
        </VStack>
      </AppShell>
    </ChakraProvider>
  );
}

export default App;
