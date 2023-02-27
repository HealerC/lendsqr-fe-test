import { initialState, ACTIONTYPE, Actions } from "./state-actions";

export const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case Actions.LOGIN:
      return { ...state, loggedIn: true };
    case Actions.LOGOUT:
      return { ...state, loggedIn: false };
    case Actions.SET_USERS: {
      const { userList, userListSummary } = action.payload;
      return { ...state, userList, userListSummary };
    }
    case Actions.BLACK_LIST_USER: {
      const userId = action.payload;
      const userList = state.userList.map((user) => {
        if (user.id === userId) {
          user.status = "blacklisted";
        }
        return user;
      });
      return { ...state, userList };
    }
    case Actions.ACTIVATE_USER: {
      const userId = action.payload;
      const userList = state.userList.map((user) => {
        if (user.id === userId) {
          user.status = "active";
        }
        return user;
      });
      return { ...state, userList };
    }
    case Actions.TOGGLE_MOBILE_DRAWER: {
      return { ...state, isMobileDrawerOpen: !state.isMobileDrawerOpen };
    }
    case Actions.TOGGLE_FILTER_MODAL:
      return { ...state, isFilterModalOpen: !state.isFilterModalOpen };
    default:
      throw new Error();
  }
};
