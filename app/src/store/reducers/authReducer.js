const initState = {
  user: null,
  authLoading: true,
  friends: [],
};

export const authReducer = (state = initState, action) => {
  if (action.type === "TOGGLE_AUTH_LOADING") {
    return { ...state, authLoading: action.payload };
  }
  if (action.type === "GET_FRIENDS") {
    return { ...state, friends: action.data.data };
  }
  if (action.type === "EDIT_USER") {
    return { ...state, user: action.data.updatedUser };
  }
  if (action.type === "LOGIN") {
    return { ...state, user: action.payload.user };
  }
  if (action.type === "REGISTER") {
    return { ...state, user: action.payload.user };
  }
  if (action.type === "LOGOUT") {
    return { user: null, token: null, friends: [] };
  }
  if (action.type === "FOLLOW") {
    return {
      ...state,
      user: {
        ...state.user,
        following: [...state.user.following, action.userId],
      },
    };
  }
  if (action.type === "UNFOLLOW") {
    console.log("following :", state.user.following);
    const newFollowing = state.user.following.filter(
      (x) => x !== action.userId
    );
    return {
      ...state,
      user: {
        ...state.user,
        following: newFollowing,
      },
    };
  }
  return state;
};

export default authReducer;
