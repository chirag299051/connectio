import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatOnline from "../components/chatOnline/ChatOnline";
import Conversation from "../components/conversation/Conversation";
import Header from "../components/header/Header";
import Message from "../components/message/Message";
import { getConv } from "../store/actions/userActions";
import { axiosClient } from "../configs/axios";

export const MessengerView = () => {
  const { user } = useSelector((state) => state.auth);
  const { conv } = useSelector((state) => state.user);

  const [currentChat, setCurrentChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(getConv(user._id));
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosClient.get(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axiosClient.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <div className="messenger">
        <div className="chat-menu">
          <div className="chat-menu-wrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chat-menu-input"
            />
            {conv.map((x) => (
              <div key={x._id} onClick={() => setCurrentChat(x)}>
                <Conversation conversation={x} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chat-box">
          <div className="chat-box-wrapper">
            {currentChat ? (
              <>
                <div className="chat-box-top">
                  {messages.map((x) => (
                    <div key={x._id} ref={scrollRef}>
                      <Message message={x} own={x.senderId === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chat-box-bottom">
                  <textarea
                    className="chat-msg-input"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button onClick={handleSubmit} className="chat-submit-btn">
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chat-online">
          <div className="chat-online-wrapper">
            <ChatOnline currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  );
};
