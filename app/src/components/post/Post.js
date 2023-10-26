import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MoreVert } from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost, likeDislikePost } from "../../store/actions/postActions";
import { axiosClient } from "../../configs/axios";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "./post.css";

const Post = ({ post, handleDelete }) => {
  const { _id, userId, desc, img, likes, comment } = post;
  const [likeCount, setLikeCount] = useState(likes?.length || 0);
  const [user, setUser] = useState(null);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const _isLiked = likes?.includes(currentUser._id);
  const [isLiked, setIsLiked] = useState(_isLiked);
  const [loading, setLoading] = useState(false);

  const likeHandler = () => {
    _id && dispatch(likeDislikePost(currentUser._id, _id));
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const res = await axiosClient.get(`/users?userId=${userId}`);
        setUser(res.data);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      {
        <div className="post">
          <div className="post-wrapper">
            <div className="post-top">
              <div className="post-top-left">
                <Link to={`/profile/${user?.username}`}>
                  <img
                    src={user?.profilePicture || PF + "person/noAvatar.png"}
                    alt=""
                    className="post-profile-img"
                  />
                </Link>
                <span className="post-username">{user?.username}</span>
                <span className="post-date">{format(post.createdAt)}</span>
              </div>
              <div className="post-top-right">
                <MoreVert />
                {/* <Tooltip title="Delete" arrow>
                  <IconButton onClick={() => handleDelete(_id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip> */}
              </div>
            </div>
            <div className="post-center">
              <span className="post-text">{desc}</span>
              <img className="post-img" src={img} />
            </div>
            <div className="post-bottom">
              <div className="post-bottom-left">
                <img
                  src={`${PF}like.png`}
                  onClick={likeHandler}
                  alt=""
                  className="like-icon"
                />
                <img
                  src={`${PF}heart.png`}
                  onClick={likeHandler}
                  alt=""
                  className="like-icon"
                />
                <span className="post-like-counter">
                  {likeCount} people like it
                </span>
              </div>
              <div className="post-bottom-right">
                <span className="post-comment-text">{comment} comments</span>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Post;
