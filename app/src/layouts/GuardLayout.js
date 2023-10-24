// ** Component Imports
import AuthGuard from "../components/auth/AuthGuard";
import GuestGuard from "../components/auth/GuestGuard";

// ** Spinner Import
import Spinner from "../components/spinner";

const Guard = ({ children, authGuard, guestGuard, skipAuthCheck }) => {
  if (guestGuard)
    return (
      <GuestGuard skipAuthCheck={skipAuthCheck} fallback={<Spinner />}>
        {children}
      </GuestGuard>
    );
  else if (!guestGuard && !authGuard) return <>{children}</>;
  else return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
};

/**
 * @dev this component should be use as parnet of all pages.
 * if page can be accessed without login `guestGuard` will be true.
 * if page cannot be accessed `guestGuard` will be false and `authGuard` will be true.
 * if a page can be accessed with and without login  `skipAuthCheck` prop should be true.
 *
 * @info check login page for example to pass props to this component
 **/
export const GuardLayout = (props) => {
  const { children } = props;
  // Variables
  const authGuard = props.authGuard ?? true;
  const guestGuard = props.guestGuard ?? false;
  const skipAuthCheck = props.skipAuthCheck ?? false;

  return (
    <Guard
      authGuard={authGuard}
      guestGuard={guestGuard}
      skipAuthCheck={skipAuthCheck}
    >
      {children}
    </Guard>
  );
};
