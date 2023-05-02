import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTag,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../components";

import { setPost } from "state";

const PostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const loggedInUserId = user ? user._id : "";

  const { postId } = useParams();
  const selectedPost = posts.find((p) => p._id === postId);

  const isLiked = Boolean(selectedPost.likes[loggedInUserId]);
  const likeCount = Object.keys(selectedPost.likes).length;

  const [isLoading, setIsLoading] = useState(false);

  // update like
  const patchLike = async () => {
    if (isAuth) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_EXPRESS_URL}/posts/${selectedPost._id}/like`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
          }
        );
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      {selectedPost.picturePath ? (
        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
          <div className="flex-1 flex-col">
            <img
              src={`${process.env.REACT_APP_EXPRESS_URL}/assets/${selectedPost.picturePath}`}
              alt="picture"
              className="w-full h-[410px] object-cover rounded-xl"
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[12px]">
          <div>
            <h4 className="font-lato font-semibold text-[18px] text-white uppercase">
              {selectedPost.title}
            </h4>

            <div className="mt-[20px]">
              <p className="font-lato font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.description }}></div>
              </p>
            </div>
          </div>

          <div className="border-b border-gray-300 mt-4"></div>

          <div className="flex items-center flex-warp gap-2 my-2">
            <FontAwesomeIcon icon={faTag} className="text-[#b2b3bd]" />
            {selectedPost.tags &&
              selectedPost.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 text-sm font-medium rounded-lg"
                >
                  {tag}
                </div>
              ))}
          </div>

          <div className="flex justify-between items-center flex-warp gap-4">
            <div>
              <h4 className="font-lato font-semibold text-[18px] text-white uppercase">
                Creator
              </h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  {selectedPost.userPicturePath ? (
                    <img
                      className="object-cover rounded-full"
                      alt="user"
                      src={`${process.env.REACT_APP_EXPRESS_URL}/assets/${selectedPost.userPicturePath}`}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-white"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-lato font-semibold text-[14px] text-white break-all">
                    {`${selectedPost.firstName} ${selectedPost.lastName}`}
                  </h4>
                  <p className="mt-[4px] font-lato font-normal text-[12px] text-[#808191]">
                    10 Posts
                  </p>
                </div>
              </div>
            </div>
            <div onClick={patchLike}>
              <h4 className="font-lato font-semibold text-[18px] text-white uppercase">
                Like Counts
              </h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  {isLiked ? (
                    <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-[#b2b3bd]"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-lato font-semibold text-[14px] text-white break-all truncate">
                    {likeCount}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
