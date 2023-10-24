import React from "react";
import "./chatOnline.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { axiosClient } from "../../configs/axios";

const ChatOnline = ({ currentId, setCurrentChat }) => {
  const { friends } = useSelector((state) => state.auth);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = async (user) => {
    try {
      const res = await axiosClient.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {friends?.map((x) => (
        <div
          onClick={() => handleClick(x)}
          key={x._id}
          className="chat-online-friend"
        >
          <div className="chat-online-img-container">
            <img
              src={
                x.profilePicture
                  ? PF + x.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="chat-online-img"
            />
            <div className="chat-online-badge"></div>
          </div>
          <span className="chat-online-name">{x.username}</span>
        </div>
      ))}
    </>
  );
};

export default ChatOnline;
