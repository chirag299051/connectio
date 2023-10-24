import axios from "axios";
import authConfig from "./auth";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const axiosClient = axios.create({
  baseURL: SERVER_URL,
});

// Request interceptor to add the access token to each request
axiosClient.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(authConfig.storageTokenKeyName);
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and refresh token
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Attempt to refresh the access token using the refresh token
      try {
        const storedToken = localStorage.getItem(
          authConfig.storageTokenKeyName
        );
        const response = await axiosClient.get(authConfig.meEndpoint, {
          headers: {
            Authorization: storedToken,
          },
        });

        // Update the access token in localStorage and retry the original request
        const authToken = response.data.authToken;
        localStorage.setItem(authConfig.storageTokenKeyName, authToken);
        originalRequest.headers.Authorization = authToken;

        return axiosClient(originalRequest);
      } catch (error) {
        // If refresh token request fails, log out the user or redirect to the login page
        console.log("Error refreshing token:", error);
      }
    }
    return Promise.reject(error);
  }
);
