import {
  HStack,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Text,
} from "@chakra-ui/react";
import { WokedexMenu } from "./Menu";
import { AppReducer } from "./AppReducer";

const WokedexHeader = ({ appReducer }: { appReducer: AppReducer }) => {
  return (
    <HStack
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"}
      bgColor={"white"}
      // h={"5%"}
    >
      <HStack w={"95%"} alignItems={"center"} justifyContent={"space-between"}>
        <WokedexMenu appReducer={appReducer} />
        <Heading as={"h1"} size={"lg"}>
          Wokedex
        </Heading>
        <Breadcrumb separator={">"}>
          <BreadcrumbItem>
            <Text>Wokedex</Text>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
    </HStack>
  );
};

export { WokedexHeader };
