import { UserDetails, UserDetailsSummary } from "./interfaces";

export const initialState = {
  loggedIn: false,
  loading: false,
  isMobileDrawerOpen: false,
  isFilterModalOpen: false,
  userList: [] as UserDetails[],
  userListSummary: {} as UserDetailsSummary,
};

export const Actions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_USERS: "SET_USERS",
  BLACK_LIST_USER: "BLACK_LIST_USER",
  ACTIVATE_USER: "ACTIVATE_USER",
  TOGGLE_MOBILE_DRAWER: "TOGGLE_MOBILE_DRAWER",
  TOGGLE_FILTER_MODAL: "TOGGLE_FILTER_MODAL",
} as const;

export type ActionKeys = typeof Actions[keyof typeof Actions];

export type ACTIONTYPE =
  | { type: typeof Actions.LOGIN }
  | { type: typeof Actions.LOGOUT }
  | {
      type: typeof Actions.SET_USERS;
      payload: { userList: UserDetails[]; userListSummary: UserDetailsSummary };
    }
  | { type: typeof Actions.BLACK_LIST_USER; payload: string }
  | { type: typeof Actions.ACTIVATE_USER; payload: string }
  | { type: typeof Actions.TOGGLE_MOBILE_DRAWER }
  | { type: typeof Actions.TOGGLE_FILTER_MODAL };
