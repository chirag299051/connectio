import React from "react";
import "./message.css";
import { format } from "timeago.js";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Message = ({ own, message }) => {
  const { sender, text, createdAt } = message;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top">
        <img
          className="message-img"
          src={sender.img || PF + "person/noAvatar.png"}
          alt=""
        />
        <p className="message-text">{text}</p>
      </div>
      <div className="message-bottom">{format(createdAt)}</div>
    </div>
  );
};

export default Message;
