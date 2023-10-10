import {
 VStack
} from "@chakra-ui/react";
import { theme } from "../../../App";
import { WokedexHeader } from "./Header";

const AppShell = ({ children }: { children: JSX.Element }) => {
  return (
    <VStack bgColor={theme.config.colors.background} h={"100vh"}>
      <WokedexHeader />
      <VStack>{children}</VStack>
    </VStack>
  );
};

export { AppShell };
