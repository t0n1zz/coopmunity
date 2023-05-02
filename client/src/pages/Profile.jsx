import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { countries } from "countries-list";
import { setPosts } from "state";
import { DisplayPosts, CustomButton } from "components";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [countryName, setCountryName] = useState("");
  const { userId } = useParams();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_EXPRESS_URL}/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
    if (data.location) setCountryName(countries[data.location].name);
  };

  const getUserPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_EXPRESS_URL}/posts/${userId}/posts`,
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
    getUser();
    getUserPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-[10em] h-[10em] rounded-full bg-[#2c2f32] flex justify-center items-center">
        {user.picturePath ? (
          <img
            className="object-cover rounded-full"
            alt="user"
            src={`${process.env.REACT_APP_EXPRESS_URL}/assets/${user.picturePath}`}
          />
        ) : (
          <FontAwesomeIcon icon={faUser} className="text-white" size="6x" />
        )}
      </div>
      <h1 className="text-2xl font-lato font-bold mt-2 text-white">{`${user.firstName} ${user.lastName}`}</h1>
      <p className="font-lato font-normal text-lg text-[#808191]">
        {`${countryName} - ${user.creditUnion ? user.creditUnion : ""}`}
      </p>
      <CustomButton
        btnType="button"
        title="Logout"
        styles="bg-[#cd4813] mt-4"
        icon={faRightFromBracket}
        handleClick={() => {
          navigate("/logout");
        }}
      />

      <div>
        {/* separator */}
        <div className="border-b border-gray-300 my-4"></div>
        <DisplayPosts title="My Posts" isLoading={isLoading} posts={posts} />
      </div>
    </div>
  );
};

export default Profile;
