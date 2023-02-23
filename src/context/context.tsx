import React, { useContext, createContext, useReducer } from "react";
import { initialState, Actions } from "./state-actions";
import { reducer } from "./reducer";
import { UserDetails } from "./interfaces";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/app-theme";

type AppState = typeof initialState;

interface AppContext extends AppState {
  login: () => void;
  logout: () => void;
  setUsers: (userList: UserDetails[]) => void;
  blacklistUser: (userId: string) => void;
  activateUser: (userId: string) => void;
  toggleMobileDrawer: () => void;
}

const AppContext = createContext<AppContext | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = () => {
    dispatch({ type: Actions.LOGIN });
  };

  const logout = () => {
    dispatch({ type: Actions.LOGOUT });
  };

  const setUsers = (userList: UserDetails[]) => {
    dispatch({ type: Actions.SET_USERS, payload: userList });
  };

  const blacklistUser = (userId: string) => {
    dispatch({ type: Actions.BLACK_LIST_USER, payload: userId });
  };

  const activateUser = (userId: string) => {
    dispatch({ type: Actions.ACTIVATE_USER, payload: userId });
  };

  const toggleMobileDrawer = () => {
    dispatch({ type: Actions.TOGGLE_MOBILE_DRAWER });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        setUsers,
        blacklistUser,
        activateUser,
        toggleMobileDrawer,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useContext must be inside a Provider with a value");

  return context;
};

export { AppProvider, useAppContext };
