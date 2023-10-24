import { GuardLayout } from "../../layouts/GuardLayout";
import { LoginView } from "../../views/loginView";
import "./login.css";

const Login = (props) => {
  return (
    <GuardLayout {...props}>
      <LoginView />
    </GuardLayout>
  );
};

Login.defaultProps = {
  guestGuard: true,
};
export default Login;
