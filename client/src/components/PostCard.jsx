import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faTag,
  faCalendar,
  faCircleUser,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { formatDistanceToNow } from "date-fns";

const PostCard = ({
  _id,
  postUserId,
  firstName,
  lastName,
  title,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  tags,
  comments,
  createdAt,
  handleClick,
}) => {
  const user = useSelector((state) => state.user);
  const loggedInUserId = user ? user._id : null;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      {picturePath ? (
        <img
          src={`${process.env.REACT_APP_EXPRESS_URL}/assets/${picturePath}`}
          alt="picture"
          className="w-full h-[158px] object-cover rounded-[15px]"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-[158px] bg-[#3e3e63] rounded-[15px]">
          <FontAwesomeIcon icon={faImage} size="2x" className="text-white" />
        </div>
      )}

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-lato font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-lato text-sm text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[25px] gap-2">
          <div className="flex justify-between items-center flex-warp gap-2">
            {userPicturePath ? (
              <img
                className="object-cover w-5 h-5 rounded-full"
                alt="user"
                src={`${process.env.REACT_APP_EXPRESS_URL}/assets/${userPicturePath}`}
              />
            ) : (
              <FontAwesomeIcon icon={faCircleUser} className="text-white" />
            )}
            <p className="font-lato font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              {`${firstName} ${lastName}`}
            </p>
          </div>
          <div className="flex justify-between items-center flex-warp gap-4">
            <div className="flex justify-between items-center flex-warp gap-2">
              {isLiked ? (
                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
              ) : (
                <FontAwesomeIcon icon={faHeart} className="text-[#b2b3bd]" />
              )}
              <p className="font-lato font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                {likeCount}
              </p>
            </div>
            <div className="flex justify-between items-center flex-warp gap-2">
              <FontAwesomeIcon icon={faComment} className="text-[#b2b3bd]" />
              <p className="font-lato font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                {comments.length}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex justify-between items-center flex-warp gap-2">
            <FontAwesomeIcon
              icon={faTag}
              className="text-[#b2b3bd]"
              style={{ fontSize: "0.75rem" }}
            />
            <p
              className="font-lato text-[#808191] leading-[18px] truncate"
              style={{ fontSize: "0.75rem" }}
            >
              {tags ? tags.join(', ') : "-"}
            </p>
          </div>
          <div className="flex justify-between items-center flex-warp gap-2">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-[#b2b3bd]"
              style={{ fontSize: "0.75rem" }}
            />
            <p
              className="font-lato text-[#808191] leading-[18px] truncate"
              style={{ fontSize: "0.75rem" }}
            >
              {timeAgo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
