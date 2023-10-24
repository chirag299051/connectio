// ** React Imports
import { useEffect } from "react";
import { useSelector } from "react-redux";

// ** Next Import
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

const AuthGuard = (props) => {
  const { children, fallback } = props;
  const { user, authLoading } = useSelector((state) => state.auth);
  const router = useNavigate();
  const location = useLocation();

  useEffect(
    () => {
      if (user === null && !localStorage.getItem("user")) {
        if (location.pathname !== "/") {
          router({
            pathname: "/login",
            search: createSearchParams({
              returnUrl: location.pathname,
            }).toString(),
          });
        } else {
          router("/login");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  if (authLoading || user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
