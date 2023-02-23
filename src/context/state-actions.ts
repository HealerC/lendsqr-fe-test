import { UserDetails } from "./interfaces";

export const initialState = {
  loggedIn: false,
  loading: false,
  isMobileDrawerOpen: false,
  userList: [] as UserDetails[],
};

export const Actions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_USERS: "SET_USERS",
  BLACK_LIST_USER: "BLACK_LIST_USER",
  ACTIVATE_USER: "ACTIVATE_USER",
  TOGGLE_MOBILE_DRAWER: "TOGGLE_MOBILE_DRAWER",
} as const;

export type ActionKeys = typeof Actions[keyof typeof Actions];

export type ACTIONTYPE =
  | { type: typeof Actions.LOGIN }
  | { type: typeof Actions.LOGOUT }
  | { type: typeof Actions.SET_USERS; payload: UserDetails[] }
  | { type: typeof Actions.BLACK_LIST_USER; payload: string }
  | { type: typeof Actions.ACTIVATE_USER; payload: string }
  | { type: typeof Actions.TOGGLE_MOBILE_DRAWER };
