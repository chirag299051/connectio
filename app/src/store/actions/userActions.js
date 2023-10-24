import { axiosClient } from "../../configs/axios";

export const fetchUser = (id, username) => async (dispatch) => {
  const { data } = id
    ? await axiosClient.get(`/users?userId=${id}`)
    : await axiosClient.get(`/users?username=${username}`);
  dispatch({ type: "FETCH_USER", data });
};

export const getFriends = (userId) => async (dispatch) => {
  try {
    const { data } = await axiosClient.get(`/users/friends/${userId}`);

    dispatch({ type: "GET_FRIENDS", data });
  } catch (error) {
    console.log(error);
  }
};

export const getConv = (userId) => async (dispatch) => {
  try {
    const { data } = await axiosClient.get(`/conversations/` + userId);

    dispatch({ type: "GET_CONV", data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = (userId) => async (dispatch) => {
  try {
    const { data } = await axiosClient.get(`users/${userId}/users`);

    dispatch({ type: "ALL_USERS", data: data.newUsers });
  } catch (error) {
    console.log(error);
  }
};
