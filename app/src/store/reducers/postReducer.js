const initState = { posts: [] };

const postReducer = (state = initState, action) => {
  if (action.type === "GET_TIMELINE") {
    return { ...state, posts: action.data };
  }
  if (action.type === "GET_PROFILE_POSTS") {
    return { ...state, posts: action.data };
  }
  if (action.type === "CREATE_POST") {
    const newPosts = [...state.posts, action.post];
    return { ...state, posts: newPosts };
  }
  if (action.type === "LIKE_DISLIKE_POST") {
    const posts = state.posts.filter((x) => x._id !== action.payload.id);
    const post = state.posts.find((x) => x._id === action.payload.id);

    const newLikes = post.likes.includes(action.payload.userId)
      ? post.likes.filter((x) => x !== action.payload.userId)
      : [...post.likes, action.payload.userId];
    const newPost = { ...post, likes: newLikes };
    console.log("POSTS: ", [...posts, newPost]);
    return { ...state, posts: [...posts, newPost] };
  }

  return state;
};

export default postReducer;
