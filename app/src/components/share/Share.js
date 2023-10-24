import React, { useState, useRef } from "react";
import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/actions/postActions";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Share = () => {
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);

  const desc = useRef();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("userId", user._id);
    formData.append("desc", desc.current.value);
    file && formData.append("img", file);

    const formDataObject = {};

    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    // const post = {
    //   userId: user._id,
    //   desc: desc.current.value,
    // };
    dispatch(createPost(formDataObject));
  };

  // const handleSelectFile = (e) => setFile(e.target.files[0]);

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            className="share-profile-img"
            src={user?.profilePicture || PF + "person/noAvatar.png"}
          />
          <input
            placeholder={"What's on your mind, " + user.username + "?"}
            className="share-input"
            ref={desc}
          />
        </div>
        <hr className="share-hr" />
        {file && (
          <div className="share-img-container">
            <img className="share-img" src={URL.createObjectURL(file)} alt="" />
            <Cancel
              className="share-cancel-img"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form onSubmit={(e) => submitHandler(e)} className="share-bottom">
          <div className="share-options">
            <label htmlFor="file" className="share-option">
              <PermMedia htmlColor="tomato" className="share-icon" />
              <span className="share-option-text">Photo or video</span>
              <input
                type="file"
                id="file"
                name="img"
                style={{ display: "none" }}
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="share-extra">
              <div className="share-option">
                <Label htmlColor="blue" className="share-icon" />
                <span className="share-option-text">Tag</span>
              </div>
              <div className="share-option">
                <Room htmlColor="green" className="share-icon" />
                <span className="share-option-text">Location</span>
              </div>
              <div className="share-option">
                <EmojiEmotions htmlColor="goldenrod" className="share-icon" />
                <span className="share-option-text">Feelings</span>
              </div>
            </div>
          </div>
          <button type="submit" className="share-btn">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
