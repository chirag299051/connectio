import React from "react";
import { useSelector } from "react-redux";
import "./header.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="header-container">
      <div className="header-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Connectio</span>
        </Link>
      </div>
      <div className="header-center">
        <div className="searchbar">
          <Search className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>
      <div className="header-right">
        <div className="header-icons">
          {/* <div className="header-icon-item">
            <Person />
            <span className="header-icon-badge">1</span>
          </div> */}
          <Link to={`/messenger`}>
            <div className="header-icon-item">
              <Chat />
              <span className="header-icon-badge">2</span>
            </div>
          </Link>
          {/* <div className="header-icon-item">
            <Notifications />
            <span className="header-icon-badge">1</span>
          </div> */}
        </div>
        <Link to={`/profile/${user.username}`} className="header-right-link">
          <span className="username">{user.username}</span>
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "/person/noAvatar.png"
            }
            className="header-img"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
