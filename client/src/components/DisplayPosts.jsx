import React from "react";
import { useNavigate } from "react-router-dom";

import PostCard from './PostCard';
import { loader } from "../assets";

const DisplayPosts = ({ title, isLoading, posts }) => {
  const navigate = useNavigate();

  const handleNavigate = (post) => {
    navigate(`/post-detail/${post._id}`, { state: post })
  }

  return (
    <div>
      <h1 className="font-lato font-semibold text-[18px] text-white text-left">
        {title} ({posts.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && posts.length === 0 && (
          <p className="font-lato font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any posts yet
          </p>
        )}

        {!isLoading &&
          posts.length > 0 &&
          posts.map((post) => (
            <PostCard
              key={post._id}
              {...post}
              handleClick={() => handleNavigate(post)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayPosts;
