import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPersonRays, faVenusMars, faGlobe, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { countries } from "countries-list";
import { setPosts } from "state";
import { DisplayPosts } from "components";

const Profile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [formattedBirthDate, setFormattedBirthDate] = useState("");
  const [age, setAge] = useState("");
  const { userId } = useParams();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  

  const getUser = async (userId) => {
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
    if (data.birthDate){
      const currentDate = new Date();
      const birthDate = new Date(data.birthDate);
      let age = currentDate.getFullYear() - birthDate.getFullYear();

      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setAge(age);
      setFormattedBirthDate(
        birthDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    }
  };

  const getUserPosts = async (userId) => {
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
    getUser(userId);
    getUserPosts(userId);
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className="flex gap-4 mt-2">
        {age && (
          <div className="flex items-center bg-[#1c1c24] rounded-[15px] p-3">
            <FontAwesomeIcon icon={faPersonRays} className="text-white mr-2" />
            <p className="font-lato font-normal text-lg text-[#808191]">{`${age} y/o`}</p>
          </div>
        )}
        {user.gender && (
          <div className="flex items-center bg-[#1c1c24] rounded-[15px] p-3">
            <FontAwesomeIcon icon={faVenusMars} className="text-white mr-2" />
            <p className="font-lato font-normal text-lg text-[#808191]">{`${user.gender}`}</p>
          </div>
        )}
        {countryName && (
          <div className="flex items-center bg-[#1c1c24] rounded-[15px] p-3">
            <FontAwesomeIcon icon={faGlobe} className="text-white mr-2" />
            <p className="font-lato font-normal text-lg text-[#808191]">{`${countryName}`}</p>
          </div>
        )}
        {user.creditUnion && (
          <div className="flex items-center bg-[#1c1c24] rounded-[15px] p-3">
            <FontAwesomeIcon icon={faBuilding} className="text-white mr-2" />
            <p className="font-lato font-normal text-lg text-[#808191]">{`${user.creditUnion}`}</p>
          </div>
        )}
      </div>
      <div>
        {/* separator */}
        <div className="border-b border-gray-300 my-4"></div>
        <DisplayPosts title="Posts" isLoading={isLoading} posts={posts} />
      </div>
    </div>
  );
};

export default Profile;
