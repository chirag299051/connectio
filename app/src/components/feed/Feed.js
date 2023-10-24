import React, { useEffect } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePosts, getTimeline } from "../../store/actions/postActions";
import { CircularProgress } from "@mui/material";

const Feed = ({ username }) => {
  const dispatch = useDispatch();
  const { _id, username: currentUsername } = useSelector(
    (state) => state.auth.user
  );
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    const fetchPosts = async () => {
      username
        ? dispatch(getProfilePosts(username))
        : dispatch(getTimeline(_id));
    };
    fetchPosts();
  }, [username, _id]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        {!username && <Share />}
        {username !== currentUsername || <Share />}
        {posts.length > 0 ? (
          posts.map((x) => <Post key={Math.random()} post={x} />)
        ) : (
          <div className="progress">
            <CircularProgress size={25} color="primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
