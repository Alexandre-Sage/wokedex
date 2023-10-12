import {
  Box,
  Button,
  ChakraProvider,
  Input,
  VStack,
  extendTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import "./app.css";
import { AppShell } from "./components/shared/appshell/AppShell";
import { CreateWokemonForm } from "./components/wokemons/createWokemon/WokemonForm";
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
  onFormChange: (imageToAdd: File) => void;
}) => {
  const [selectedPreview, setSelectedPreview] = useState<any>("");
  return (
    <Box
      h={{ xl: "2xs", md: "3xs", sm: "5xs" }}
      w={{ xl: "2xs", md: "3xs", sm: "5xs" }}
      border={"1px solid green"}
    >
      <Button bgRepeat={"no-repeat"} zIndex={1} w="fit-content" h="fit-content">
        <Input
          bgImage={selectedPreview}
          // h="2xs"
          h={{ xl: "2xs", md: "3xs", sm: "20" }}
          onChange={(item) => {
            onFormChange(item.target.files![0]);
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
