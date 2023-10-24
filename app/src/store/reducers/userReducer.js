const initState = { user: {}, friends: [], conv: [], allUsers: [] };

const userReducer = (state = initState, action) => {
  if (action.type === "FETCH_USER") {
    return { ...state, user: action.data };
  }
  if (action.type === "GET_FRIENDS") {
    return { ...state, friends: action.data.data };
  }
  if (action.type === "GET_CONV") {
    return { ...state, conv: action.data };
  }
  if (action.type === "ALL_USERS") {
    return { ...state, allUsers: action.data };
  }

  return state;
};

export default userReducer;
