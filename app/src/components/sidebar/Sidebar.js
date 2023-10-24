import React, { useEffect } from "react";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import UserCard from "../userCard/UserCard";
import { getAllUsers } from "../../store/actions/userActions";

const Sidebar = () => {
  const { allUsers } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(user?._id));
  }, [user]);

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <RssFeed className="sidebar-icon" />
            <span className="sidebar-list-item-text">Feed</span>
          </li>
          <li className="sidebar-list-item">
            <Chat className="sidebar-icon" />
            <span className="sidebar-list-item-text">Chats</span>
          </li>
          <li className="sidebar-list-item">
            <PlayCircleFilledOutlined className="sidebar-icon" />
            <span className="sidebar-list-item-text">Videos</span>
          </li>
          <li className="sidebar-list-item">
            <Group className="sidebar-icon" />
            <span className="sidebar-list-item-text">Groups</span>
          </li>
          <li className="sidebar-list-item">
            <Bookmark className="sidebar-icon" />
            <span className="sidebar-list-item-text">Bookmarks</span>
          </li>
          <li className="sidebar-list-item">
            <HelpOutline className="sidebar-icon" />
            <span className="sidebar-list-item-text">Questions</span>
          </li>
          <li className="sidebar-list-item">
            <WorkOutline className="sidebar-icon" />
            <span className="sidebar-list-item-text">Jobs</span>
          </li>
          <li className="sidebar-list-item">
            <Event className="sidebar-icon" />
            <span className="sidebar-list-item-text">Events</span>
          </li>
          <li className="sidebar-list-item">
            <School className="sidebar-icon" />
            <span className="sidebar-list-item-text">Courses</span>
          </li>
        </ul>
        <button className="sidebar-button">Show more</button>
        <hr className="sidebar-hr" />
        <h2>People you may know</h2>
        <ul className="sidebar-friend-list">
          {allUsers?.map((x) => (
            <UserCard key={x._id} friend={x} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
