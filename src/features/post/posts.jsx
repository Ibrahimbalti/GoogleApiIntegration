import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      {items.map((post) => (
        <div
          key={post.id}
          style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}
        >
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
