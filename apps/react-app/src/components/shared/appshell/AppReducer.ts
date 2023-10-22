import { useReducer } from "react";
import { ObjectValue } from "../../../types";
import { WokemonDto } from "../../../types/Wokemon.type";

export interface AppReducerState {
  displayWokemonForm: boolean;
  displayWokemonList: boolean;
  displayWokemonDetails: boolean;
}

export const reducerAction = {
  CREATE_WOKEMON: "CREATE_WOKEMON",
  WOKEMON_LIST: "WOKEMON_LIST",
  WOKEMON_DETAILS: "WOKEMON_DETAILS",
} as const;

type ReducerActionKey = ObjectValue<typeof reducerAction>;

interface ReducerAction {
  type: ReducerActionKey;
  payload?: {
    wokemonId: string;
  };
}

export const useAppReducer = () => {
  const [state, dispatch] = useReducer(
    (state: AppReducerState, action: ReducerAction) => {
      switch (action.type) {
        case "CREATE_WOKEMON":
          return {
            displayWokemonForm: true,
            displayWokemonList: false,
            displayWokemonDetails: false,
          };
        case "WOKEMON_LIST":
          return {
            displayWokemonForm: false,
            displayWokemonList: true,
            displayWokemonDetails: false,
          };
        case "WOKEMON_DETAILS":
          return {
            displayWokemonForm: false,
            displayWokemonList: false,
            displayWokemonDetails: true,
          };
        default:
          return {
            ...state,
          };
      }
    },
    {
      displayWokemonForm: true,
      displayWokemonList: false,
      displayWokemonDetails: false,
    }
  );
  return {
    appReducerState: state,
    appReducerDispatch: dispatch,
  };
};
export type AppReducer = ReturnType<typeof useAppReducer>;
