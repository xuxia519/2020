import * as types from "../action-types";
const initState = {
  userlist: [],
  rolelist: []
};
export default function app(state = initState, action) {
  switch (action.type) {
    case types.FETCH_USER_LIST:
      const user = action.data.content;
      const page = action.data.pageable;
      const totalPages = action.data.totalPages;
      const totalElements = action.data.totalElements;
      return {
        ...state,
        userlist: [...state.userlist, user],
        page: {
          pageNumber: page.pageNumber,
          pageSize: page.pageSize,
          totalElements,
          totalPages
        }
      };
    case types.FETCH_ROLE_LIST:
      const role = action.data.content;
      return {
        ...state,
        rolelist: [...state.rolelist, role]
      };
    default:
      return state;
  }
}
