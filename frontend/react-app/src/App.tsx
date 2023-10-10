import {
  Box,
  Button,
  ChakraProvider,
  Input,
  VStack,
  extendTheme
} from "@chakra-ui/react";
import { useState } from "react";
import "./app.css";
import { CreateWokemonForm } from "./components/wokemons/createWokemon/WokemonForm";
import { AppShell } from "./components/shared/appshell/AppShell";
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
            onFormChange("image", URL.createObjectURL(item.target.files![0]));
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
