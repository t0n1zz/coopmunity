import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { DisplayPosts, Welcome } from "../components";

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_EXPRESS_URL}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Welcome />
      <DisplayPosts title="All Posts" isLoading={isLoading} posts={posts} />
    </>
  );
};

export default Home;
