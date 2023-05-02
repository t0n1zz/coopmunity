import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  console.log(user);

  return (
    <div>Profile</div>
  )
}

export default Profile