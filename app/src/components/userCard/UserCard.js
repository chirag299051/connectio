import React from "react";
import { Link } from "react-router-dom";
import "./userCard.css";

const UserCard = ({ friend }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { username, profilePicture } = friend;

  return (
    <Link to={"/profile/" + username} style={{ textDecoration: "none" }}>
      <div className="rightbar-following">
        <img
          src={profilePicture ? profilePicture : PF + "person/noAvatar.png"}
          alt=""
          className="rightbar-following-img"
        />
        <div className="rightbar-following-name">
          {username.length > 12 ? username.substr(0, 10) + ".." : username}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
