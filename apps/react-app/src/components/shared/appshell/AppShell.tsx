import { VStack } from "@chakra-ui/react";
import { theme } from "../../../App";
import { WokedexHeader } from "./Header";
import { useReducer } from "react";
import { ObjectValue } from "../../../types";
import { AppReducer } from "./AppReducer";


const AppShell = ({
  children,
  appReducer,
}: {
  children: JSX.Element;
  appReducer: AppReducer;
}) => {
  return (
    <VStack bgColor={theme.config.colors.background} h={"100vh"} w={"100vw"}>
      <WokedexHeader appReducer={appReducer}/>
      <VStack>{children}</VStack>
    </VStack>
  );
};

export { AppShell };
