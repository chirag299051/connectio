import { axiosClient } from "../../configs/axios";

export const getTimeline = (id) => async (dispatch) => {
  const { data } = await axiosClient.get(`/posts/timeline/${id}`);
  dispatch({ type: "GET_TIMELINE", data });
};

export const getProfilePosts = (username) => async (dispatch) => {
  const { data } = await axiosClient.get(`/posts/profile/${username}`);
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

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await axiosClient.delete(`/posts/${id}`);
    console.log(data);
    dispatch({ type: "DELETE_POST", id });
  } catch (error) {
    console.log(error);
  }
};
