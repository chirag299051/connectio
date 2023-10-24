import React, { useState, useEffect, useRef } from "react";
import "./rightbar.css";
import Online from "../online/Online";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends as _getFriends,
  logout,
} from "../../store/actions/authActions";
import { getFriends } from "../../store/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { follow, unFollow } from "../../store/actions/authActions";
import EditIcon from "@mui/icons-material/Edit";
import UserCard from "../userCard/UserCard";

const Rightbar = ({ user, own, setShowModal }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();

  const profileFriends = useSelector((state) => state.user.friends);
  const profileUser = useSelector((state) => state.user.user);
  const currentUserFriends = useSelector((state) => state.auth.friends);
  const currentUser = useSelector((state) => state.auth.user);
  const [followed, setFollowed] = useState(
    !currentUser?.following?.includes(profileUser?._id)
  );
  const isGetFriendsDispatched = useRef(false);

  // this hook was making too much api calls
  useEffect(() => {
    // if (!isGetFriendsDispatched.current)
    //   if (user?._id && profileUser) {
    //     isGetFriendsDispatched.current = true;
    //     dispatch(getFriends(profileUser?._id));
    //   } else if (!user?._id && currentUser) {
    //     isGetFriendsDispatched.current = true;
    //     dispatch(_getFriends(currentUser?._id));
    //   }

    user
      ? dispatch(getFriends(profileUser?._id))
      : dispatch(_getFriends(currentUser?._id));
  }, [profileUser, currentUser]);

  const handleClick = () => {
    followed
      ? dispatch(unFollow(user._id, currentUser._id))
      : dispatch(follow(user._id, currentUser._id));
    setFollowed(!followed);
  };

  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthday-container">
          <img src="assets/gift.png" alt="" className="birthday-img" />
          <span className="birthday-text">
            <b>Vipul Rolens</b> and <b>another friend</b> have a birthday today.
          </span>
        </div>
        <Link to={"http://chirag9.com"}>
          <img src="assets/portfolio.png" alt="" className="rightbar-ad" />
        </Link>
        <h4 className="rightbar-title">Online Friends</h4>
        <ul className="rightbar-friend-list">
          {currentUserFriends.length > 0
            ? currentUserFriends.map((x) => <Online key={x._id} user={x} />)
            : null}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {profileUser.username !== currentUser.username && (
          <button className="rightbar-follow-btn" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        {own && (
          <>
            <button className="edit-btn" onClick={() => setShowModal(true)}>
              <EditIcon />
              &nbsp; Edit Profile
            </button>
            <button className="logout" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">City</span>
            <span className="rightbar-info-value">{user.city}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">From</span>
            <span className="rightbar-info-value">{user.from}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Relationship</span>
            <span className="rightbar-info-value">{user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbar-title">User friends</h4>
        <div className="rightbar-followings">
          {profileFriends.length > 0 &&
            profileFriends.map((friend) => (
              <UserCard key={friend._id} friend={friend} />
            ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
