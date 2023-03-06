import {
  initialState,
  ACTIONTYPE,
  Actions,
  initialSort,
} from "./state-actions";

export const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case Actions.LOGIN:
      return { ...state, loggedIn: true };
    case Actions.LOGOUT:
      return { ...state, loggedIn: false };
    case Actions.SET_USERS: {
      const { userList, userListSummary } = action.payload;
      return {
        ...state,
        loading: false,
        userList,
        userListSummary,
        filter: { ...state.filter, result: userList },
      };
    }
    case Actions.BLACK_LIST_USER: {
      const userId = action.payload;
      const userList = state.userList.map((user) => {
        if (user.id === userId) {
          user.status = "blacklisted";
        }
        return user;
      });
      return { ...state, userList, sort: { ...initialSort } };
    }
    case Actions.ACTIVATE_USER: {
      const userId = action.payload;
      const userList = state.userList.map((user) => {
        if (user.id === userId) {
          user.status = "active";
        }
        return user;
      });
      return { ...state, userList, sort: { ...initialSort } };
    }
    case Actions.TOGGLE_MOBILE_DRAWER: {
      return { ...state, isMobileDrawerOpen: !state.isMobileDrawerOpen };
    }
    case Actions.TOGGLE_FILTER_MODAL:
      return { ...state, isFilterModalOpen: !state.isFilterModalOpen };

    case Actions.SORT_USERS:
      return {
        ...state,
        sort: action.payload,
        pagination: { ...state.pagination, page: 1 },
      };
    case Actions.FILTER_USERS:
      return { ...state, filter: action.payload };
    case Actions.CLEAR_FILTER_USERS:
      return {
        ...state,
        filter: { ...state.filter, values: initialState.filter.values },
      };
    case Actions.SET_FILTER_USERS:
      return {
        ...state,
        filter: { ...state.filter, result: action.payload.result },
      };
    case Actions.SET_USERS_PER_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          usersPerPage: action.payload.usersPerPage,
          page: 1,
        },
      };
    case Actions.CHANGE_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload.page,
        },
      };
    case Actions.SET_TOTAL_PAGE_COUNT:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          totalPageCount: action.payload.totalPageCount,
        },
      };
    case Actions.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      throw new Error();
  }
};
