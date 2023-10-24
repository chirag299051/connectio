import React from "react";
import { Link } from "react-router-dom";
import "./userCard.css";

const UserCard = ({ friend }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
      <div className="rightbar-following">
        <img
          src={
            friend.profilePicture
              ? friend.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
          className="rightbar-following-img"
        />
        <div className="rightbar-following-name">{friend.username}</div>
      </div>
    </Link>
  );
};

export default UserCard;
