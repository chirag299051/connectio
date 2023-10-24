// ** React Imports
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// ** react router Import
import { useNavigate, useLocation } from "react-router-dom";

// ** Config
import authConfig from "../configs/auth";
import { axiosClient } from "../configs/axios";

// actions
import { toggleAuthLoading } from "../store/actions/authActions";

export const PageComponent = ({ children }) => {
  // ** Hooks
  const router = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(authConfig.storageTokenKeyName);

      if (storedToken) {
        dispatch(toggleAuthLoading(true));

        await axiosClient
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken,
            },
          })
          .then(async (response) => {
            if (localStorage.getItem(authConfig.storageTokenKeyName))
              localStorage.setItem(
                authConfig.storageTokenKeyName,
                response.data.authToken
              );

            dispatch(toggleAuthLoading(false));

            dispatch({
              type: "LOGIN",
              payload: { user: response.data.user },
            });
          })
          .catch((err) => {
            console.log("err", err);
            localStorage.removeItem("user");
            localStorage.removeItem(authConfig.storageTokenKeyName);

            dispatch(toggleAuthLoading(false));

            dispatch({
              type: "LOGIN",
              payload: { user: null },
            });

            if (
              authConfig.onTokenExpiration === "logout" &&
              !location.pathname.includes("login")
            ) {
              router("/login");
            }
          });
      } else {
        localStorage.removeItem("user");
        dispatch(toggleAuthLoading(false));
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
