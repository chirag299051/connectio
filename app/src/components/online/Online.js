import React from "react";
import "./online.css";

const Online = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbar-friend">
      <div className="rightbar-img-container">
        <img
          className="rightbar-profile-img"
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
        />
        <span className="rightbar-online"></span>
      </div>
      <span className="rightbar-username">{user.username}</span>
    </li>
  );
};

export default Online;
