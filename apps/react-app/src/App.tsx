import { ChakraProvider, VStack, extendTheme } from "@chakra-ui/react";
import "./app.css";
import { AppShell } from "./components/shared/appshell/AppShell";
import { CreateWokemonForm } from "./components/wokemons/createWokemon/WokemonForm";
import { useAppReducer } from "./components/shared/appshell/AppReducer";
import { WokemonList } from "./components/wokemons/list/WokemonList";
import { Wokemon } from "./components/wokemons/wokemon/Wokemon";
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

function App() {
  const { appReducerDispatch, appReducerState } = useAppReducer();
  return (
    <ChakraProvider theme={theme}>
      <AppShell appReducer={{ appReducerDispatch, appReducerState }}>
        <VStack>
          {appReducerState.displayWokemonForm && <CreateWokemonForm />}
          {appReducerState.displayWokemonList && <WokemonList appReducer={{ appReducerDispatch, appReducerState }}/>}
          {appReducerState.displayWokemonDetails && <Wokemon appReducer={{ appReducerDispatch, appReducerState }}/>}
        </VStack>
      </AppShell>
    </ChakraProvider>
  );
}

export default App;
