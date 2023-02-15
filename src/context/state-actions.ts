import { UserDetails } from "./interfaces";

export const initialState = {
  loggedIn: false,
  loading: false,
  userList: [] as UserDetails[],
};

export const Actions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_USERS: "SET_USERS",
} as const;

export type ActionKeys = typeof Actions[keyof typeof Actions];

export type ACTIONTYPE =
  | { type: typeof Actions.LOGIN }
  | { type: typeof Actions.LOGOUT }
  | { type: typeof Actions.SET_USERS; payload: UserDetails[] };
