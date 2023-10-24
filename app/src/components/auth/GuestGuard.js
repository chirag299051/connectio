// ** React Imports
import { useEffect } from "react";
import { useSelector } from "react-redux";

// ** React Router Dom Import
import { useNavigate, useLocation } from "react-router-dom";

const GuestGuard = (props) => {
  const { children, fallback } = props;
  const router = useNavigate();
  const location = useLocation();

  const { user, authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      router("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (authLoading || (!authLoading && user !== null)) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
