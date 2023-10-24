import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
  },
});

export default store;
