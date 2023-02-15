import { initialState, ACTIONTYPE, Actions } from "./state-actions";

export const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case Actions.LOGIN:
      return { ...state, loggedIn: true };
    case Actions.LOGOUT:
      return { ...state, loggedIn: false };
    case Actions.SET_USERS:
      return { ...state, userList: action.payload };
    default:
      throw new Error();
  }
};
