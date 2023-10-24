import { axiosClient } from "../../configs/axios";

export const getTimeline = (id) => async (dispatch) => {
  const { data } = await axiosClient.get(`/posts/timeline/${id}`);

  data.sort((p1, p2) => {
    return new Date(p2.createdAt) - new Date(p1.createdAt);
  });
  dispatch({ type: "GET_TIMELINE", data });
};

export const getProfilePosts = (username) => async (dispatch) => {
  const { data } = await axiosClient.get(`/posts/profile/${username}`);
  data.sort((p1, p2) => {
    return new Date(p2.createdAt) - new Date(p1.createdAt);
  });
  dispatch({ type: "GET_PROFILE_POSTS", data });
};

export const createPost = (post) => async (dispatch) => {
  const { data } = await axiosClient.post(`/posts`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(data);
  dispatch({ type: "CREATE_POST", post });
};

export const likeDislikePost = (userId, id) => async (dispatch) => {
  try {
    const { data } = await axiosClient.put(`/posts/${id}/like`, {
      userId: userId,
    });
    console.log(data);
    dispatch({ type: "LIKE_DISLIKE_POST", payload: { userId, id } });
  } catch (error) {
    console.log(error);
  }
};
