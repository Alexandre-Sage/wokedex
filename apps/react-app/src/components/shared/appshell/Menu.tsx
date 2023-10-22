import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { theme } from "../../../App";
import { FaChevronCircleDown } from "react-icons/fa";
import { AppReducer } from "./AppReducer";
const WokedexMenu = ({ appReducer }: { appReducer: AppReducer }) => {
  const { appReducerDispatch } = appReducer;
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
            <MenuItem
              onClick={() => appReducerDispatch({ type: "CREATE_WOKEMON" })}
            >
              Create Wokemon
            </MenuItem>
            <MenuItem
              onClick={() => appReducerDispatch({ type: "WOKEMON_LIST" })}
            >
              List
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
export { WokedexMenu };
