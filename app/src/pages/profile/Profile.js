import { GuardLayout } from "../../layouts/GuardLayout";
import { ProfileView } from "../../views/profileView";
import "./profile.css";

const Profile = (props) => {
  return (
    <GuardLayout {...props}>
      <ProfileView />
    </GuardLayout>
  );
};

Profile.defaultProps = {
  guestGuard: false,
  authGuard: true,
};

export default Profile;
