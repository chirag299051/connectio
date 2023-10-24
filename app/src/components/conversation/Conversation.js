import React, { useEffect } from "react";
import "./conversation.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/actions/userActions";

const Conversation = ({ conversation, currentUser }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((x) => x !== currentUser._id);
    dispatch(fetchUser(friendId));
  }, [conversation, currentUser]);

  return (
    <div className="conversation">
      <img
        src={
          user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"
        }
        alt=""
        className="conversation-img"
      />
      <span className="conversation-name">{user.username}</span>
    </div>
  );
};

export default Conversation;
