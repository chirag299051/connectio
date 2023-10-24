import { GuardLayout } from "../../layouts/GuardLayout";
import { MessengerView } from "../../views/messengerView";
import "./messenger.css";

const Messenger = (props) => {
  return (
    <GuardLayout {...props}>
      <MessengerView />
    </GuardLayout>
  );
};

Messenger.defaultProps = {
  guestGuard: false,
  authGuard: true,
};
export default Messenger;
