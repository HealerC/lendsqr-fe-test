import React, { useContext, createContext, useReducer, useEffect } from "react";
import { initialState, Actions } from "./state-actions";
import { reducer } from "./reducer";
import { UserDetails, UserDetailsFilter } from "./interfaces";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/app-theme";
import { SelectChangeEvent } from "@mui/material";
import { Dayjs } from "dayjs";

type AppState = typeof initialState;

type DayjsEvent = Dayjs | null;
type InputEvents =
  | SelectChangeEvent<string>
  | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  | DayjsEvent;

interface Context extends AppState {
  login: () => void;
  logout: () => void;
  setUsers: (userList: UserDetails[]) => void;
  blacklistUser: (userId: string) => void;
  activateUser: (userId: string) => void;
  toggleMobileDrawer: () => void;
  toggleFilterModal: () => void;
  sortUsers: (by: keyof UserDetails) => void;
  handleFilter: (event: InputEvents) => void;
  clearFilter: () => void;
  setUsersPerPage: (event: SelectChangeEvent<number>) => void;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<Context | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /* There was a change in one of the filter values (in the filter modal).
  Filter the userList appropriately */
  useEffect(() => {
    let result: UserDetails[] = state.userList;

    if (Object.values(state.filter.values).every((value) => !value)) {
      // No filtering is going on or all the filter input fields are empty.
      // Show ALL users
      dispatch({ type: Actions.SET_FILTER_USERS, payload: { result } });
    } else {
      // Filter users based on the provided filter values
      const filterKeys = Object.keys(state.filter.values);

      filterKeys.forEach((key) => {
        if (key === "createdAt") {
          const { createdAt } = state.filter.values;
          result = createdAt
            ? result.filter((user) => createdAt.isSame(user.createdAt, "day"))
            : result;
        } else if (key === "status") {
          const value = state.filter.values[key];
          result = value
            ? result.filter(
                (user) => user.status.toLowerCase() === value.toLowerCase()
              )
            : result;
        } else {
          const filterValue =
            state.filter.values[key as keyof UserDetailsFilter];

          if (filterValue && typeof filterValue === "string") {
            result = result.filter((user) =>
              user[key as keyof UserDetailsFilter]
                .toLowerCase()
                .includes(filterValue.toLowerCase())
            );
          }
        }
      });

      dispatch({ type: Actions.SET_FILTER_USERS, payload: { result } });
    }
  }, [state.filter.values]);

  /* Set the number of pages when the users are filtered or 
  users per page is changed */
  useEffect(() => {
    const totalUsers = state.filter.result.length;
    const { usersPerPage } = state.pagination;
    const totalPageCount = Math.ceil(totalUsers / usersPerPage);

    dispatch({
      type: Actions.SET_TOTAL_PAGE_COUNT,
      payload: { totalPageCount },
    });
  }, [state.filter.result, state.pagination.usersPerPage]);

  const login = () => {
    dispatch({ type: Actions.LOGIN });
  };

  const logout = () => {
    dispatch({ type: Actions.LOGOUT });
  };

  /* UserDetails just received from the server */
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
    // the one in state and the default order is descending (desc: true)

    const { by: stateBy, desc: stateDesc } = state.sort;
    if (by === stateBy) {
      dispatch({ type: Actions.SORT_USERS, payload: { by, desc: !stateDesc } });
      return;
    }
    dispatch({ type: Actions.SORT_USERS, payload: { by, desc: true } });
  };

  const handleFilter = (event: InputEvents) => {
    const prevFilterState = state.filter;
    if (event === null || "date" in event) {
      // Then the date was used to filter

      dispatch({
        type: Actions.FILTER_USERS,
        payload: {
          ...prevFilterState,
          values: { ...prevFilterState.values, createdAt: event },
        },
      });
    } else {
      // Any of the other values are used to filter the table
      const { name, value } = event.target;

      dispatch({
        type: Actions.FILTER_USERS,
        payload: {
          ...prevFilterState,
          values: { ...prevFilterState.values, [name]: value },
        },
      });
    }
  };

  const clearFilter = () => {
    dispatch({ type: Actions.CLEAR_FILTER_USERS });
  };

  /* Select input field that sets the number of users per page */
  const setUsersPerPage = (event: SelectChangeEvent<number>): void => {
    const { value } = event.target;
    const usersPerPage = typeof value === "string" ? parseInt(value) : value;

    dispatch({ type: Actions.SET_USERS_PER_PAGE, payload: { usersPerPage } });
  };

  /* The page was changed by the pagination component */
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch({ type: Actions.CHANGE_PAGE, payload: { page: value } });
  };

  /* The loading is set when the browser attempts to fetch data from the api */
  const setLoading = (loading: boolean) => {
    dispatch({ type: Actions.SET_LOADING, payload: { loading } });
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
        handleFilter,
        clearFilter,
        setUsersPerPage,
        handleChangePage,
        setLoading,
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
