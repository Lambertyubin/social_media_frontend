import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { listNewsFeed } from "../../post/api-post";
import auth from "../../auth/auth-helper";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listNewsFeed({ userId: jwt.user._id }, { t: jwt.token }, signal).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setPosts(data);
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
