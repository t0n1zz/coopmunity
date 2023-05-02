import React from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import PostCard from "./PostCard";

const DisplayPosts = ({ title, isLoading, posts }) => {
  const navigate = useNavigate();

  const handleNavigate = (post) => {
    navigate(`/post-detail/${post._id}`, { state: post });
  };

  return (
    <div>
      <h1 className="font-lato font-semibold text-[18px] text-white text-left">
        {title} ({posts.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-[100px] h-[100px] text-white object-contain animate-spin" size="5x"
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
