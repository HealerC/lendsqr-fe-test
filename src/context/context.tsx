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
  toggleFilterModal: () => void;
  sortUsers: (by: keyof UserDetails) => void;
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
    const userListSummary = {
      totalUsers: userList.length,
      activeUsers: Math.floor(Math.random() * userList.length),
      loanUsers: Math.floor(Math.random() * userList.length),
      savingsUsers: Math.floor(Math.random() * userList.length),
    };
    dispatch({
      type: Actions.SET_USERS,
      payload: { userList, userListSummary },
    });
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

  const toggleFilterModal = () => {
    dispatch({ type: Actions.TOGGLE_FILTER_MODAL });
  };

  const sortUsers = (by: keyof UserDetails) => {
    // Basically if the `by` in state and the incoming `by` is the same
    // switch the sorting order, otherwise the incoming `by` replaces
    // the one in state and the order is default descending true
    const { by: stateBy, desc: stateDesc } = state.sort;
    if (by === stateBy) {
      dispatch({ type: Actions.SORT_USERS, payload: { by, desc: !stateDesc } });
      return;
    }
    dispatch({ type: Actions.SORT_USERS, payload: { by, desc: true } });
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
        toggleFilterModal,
        sortUsers,
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
