import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { navlinks } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ styles, link, icon, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === link && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <FontAwesomeIcon icon={icon} className="w-1/2 h-1/2 text-white" />
    ) : (
      <FontAwesomeIcon
        icon={icon}
        className={`w-1/2 h-1/2 text-white ${isActive !== link && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  
  const updatedNavlinks = navlinks.map((link) => {
    if (link.name === "profile" && isAuth) {
      return {
        ...link,
        link: `/profile/${user._id}`,
      };
    }
    return link;
  });

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {updatedNavlinks.map((link, index) =>
            (link.isAuth && isAuth) || !link.isAuth ? (
              <Icon
                key={index}
                {...link}
                isActive={location.pathname}
                handleClick={() => {
                  if (!link.disabled) {
                    navigate(link.link);
                  }
                }}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
