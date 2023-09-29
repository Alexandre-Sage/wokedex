import { Button, ChakraProvider, HStack, VStack } from "@chakra-ui/react";
// import "./App.css";
import { extendTheme } from "@chakra-ui/react";
import { TextAreaInput, TextInput } from "./components/shared/inputs";
const theme = extendTheme({
  colors: {
    background: "#f7fafc",
  },
});

const CreateWokemonForm = () => {
  return (
    <VStack>
      <HStack>
        <VStack>
          <TextInput label="Wokemon name" />
        </VStack>
        <VStack>
          <TextAreaInput label="Description" />
        </VStack>
      </HStack>
      <HStack>
        <Button>HELLO</Button>
      </HStack>
    </VStack>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <HStack
        bgImage={asset}
        h={"container.xl"}
        w={"container.xl"}
        bgRepeat={"no-repeat"}
      >

      </HStack> */}
      <CreateWokemonForm />
    </ChakraProvider>
  );
}

export default App;
