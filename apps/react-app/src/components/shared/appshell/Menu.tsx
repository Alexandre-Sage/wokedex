import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { theme } from "../../../App";
import { FaChevronCircleDown } from "react-icons/fa";
const WokedexMenu = () => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            h={"6"}
            w={"3xs"}
            bgColor={theme.config.colors.darkGrey}
            textColor={"white"}
            _hover={{
              // color: theme.config.colors.background,
              bgColor: theme.config.colors.background,
            }}
            rightIcon={<FaChevronCircleDown />}
          >
            {isOpen ? "Close" : "Menu"}
          </MenuButton>
          <MenuList>
            <MenuItem>Create Wokemon</MenuItem>
            <MenuItem>List</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
export { WokedexMenu };
