export const initialState = {
  loggedIn: false,
  loading: false,
};

export const Actions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
} as const;

export type ActionKeys = typeof Actions[keyof typeof Actions];

export type ACTIONTYPE =
  | { type: typeof Actions.LOGIN }
  | { type: typeof Actions.LOGOUT };
