import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../configs/axios";
import authConfig from "../../configs/auth";

export const toggleAuthLoading = (payload) => (dispatch) => {
  dispatch({ type: "TOGGLE_AUTH_LOADING", payload });
};

export const login = (userCred, successCallback) => async (dispatch) => {
  try {
    const { data } = await axiosClient.post(`/auth/login`, userCred);
    const { user, token } = data;
    localStorage.setItem(authConfig.storageTokenKeyName, token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({ type: "LOGIN", payload: { user } });
    if (successCallback) successCallback();
  } catch (error) {
    console.log(error);
  }
};

export const register = (userObj) => async (dispatch) => {
  try {
    const { data } = await axiosClient.post(`/auth/register`, userObj);
    const { user, token } = data;
    localStorage.setItem(authConfig.storageTokenKeyName, token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "REGISTER", payload: { user } });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("user");
  localStorage.removeItem(authConfig.storageTokenKeyName);
};

export const follow = (userId, id) => async (dispatch) => {
  try {
    await axiosClient.put(`/users/${id}/follow`, { userId });
    dispatch({ type: "FOLLOW", userId });
  } catch (error) {
    console.log(error);
  }
};

export const unFollow = (userId, id) => async (dispatch) => {
  try {
    await axiosClient.put(`/users/${id}/unfollow`, { userId });
    dispatch({ type: "UNFOLLOW", userId });
  } catch (error) {
    console.log(error);
  }
};

export const getFriends = (userId) => async (dispatch) => {
  try {
    const { data } = await axiosClient.get(`/users/friends/${userId}`);

    dispatch({ type: "GET_FRIENDS", data });
  } catch (error) {
    console.log(error);
  }
};

export const editUser = (userObj, userId) => async (dispatch) => {
  try {
    console.log("userObj", userObj);
    const { data } = await axiosClient.put(`/users/${userId}`, userObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: "EDIT_USER", data });
  } catch (error) {
    console.log(error);
  }
};
