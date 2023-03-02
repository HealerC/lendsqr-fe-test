import {
  UserDetails,
  UserDetailsSummary,
  UserDetailsFilter,
  Status,
} from "./interfaces";

const initialFilterValues: UserDetailsFilter = {
  createdAt: null,
  orgName: "",
  userName: "",
  email: "",
  phoneNumber: "",
  status: "" as Status,
};

export const initialState = {
  loggedIn: false,
  loading: false,
  isMobileDrawerOpen: false,
  isFilterModalOpen: false,
  userList: [] as UserDetails[],
  userListSummary: {} as UserDetailsSummary,
  sort: {
    by: "" as keyof UserDetails,
    desc: true,
  },
  filter: {
    result: [] as UserDetails[],
    values: initialFilterValues,
  },
};

export const Actions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_USERS: "SET_USERS",
  BLACK_LIST_USER: "BLACK_LIST_USER",
  ACTIVATE_USER: "ACTIVATE_USER",
  TOGGLE_MOBILE_DRAWER: "TOGGLE_MOBILE_DRAWER",
  TOGGLE_FILTER_MODAL: "TOGGLE_FILTER_MODAL",
  SORT_USERS: "SORT_USERS",
  FILTER_USERS: "FILTER_USERS",
  CLEAR_FILTER_USERS: "CLEAR_FILTER_USERS",
  SET_FILTER_USERS: "SET_FILTER_USERS",
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
  | { type: typeof Actions.TOGGLE_FILTER_MODAL }
  | {
      type: typeof Actions.SORT_USERS;
      payload: { by: keyof UserDetails; desc: boolean };
    }
  | {
      type: typeof Actions.FILTER_USERS;
      // payload: { [key in keyof UserDetailsFilter]: UserDetailsFilter[key] };
      payload: { result: UserDetails[]; values: UserDetailsFilter };
    }
  | { type: typeof Actions.CLEAR_FILTER_USERS }
  | {
      type: typeof Actions.SET_FILTER_USERS;
      payload: { result: UserDetails[] };
    };
