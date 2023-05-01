import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CustomButton } from "./";
import { logo, menu, search, profile } from "../assets";
import { navlinks } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="hidden md:block">
        <Link to="/" className="flex flex-col items-center">
          <h1 className="font-lato font-bold w-full text-white text-xl">
            COOPMUNITY
          </h1>
          <p className="text-[#4b5264]">Forum for Credit Union</p>
        </Link>
      </div>
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for post"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        {isAuth ? (
          <>
            <CustomButton
              btnType="button"
              title="Create a post"
              styles="bg-[#1dc071]"
              handleClick={() => {
                navigate("/create-post");
              }}
            />
            <Link to="/profile">
              <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                {user.picturePath ? (
                  <img
                    className="object-cover rounded-full"
                    alt="user"
                    src={`${process.env.REACT_APP_EXPRESS_URL}/assets/${user.picturePath}`}
                  />
                ) : (
                  <img
                    src={profile}
                    alt="user"
                    className="w-[60%] h-[60%] object-contain"
                  />
                )}
              </div>
            </Link>
          </>
        ) : (
          <>
            <CustomButton
              btnType="button"
              title="Login"
              styles="bg-[#3e3e63]"
              handleClick={() => {
                navigate("login");
              }}
            />
            <CustomButton
              btnType="button"
              title="Register"
              styles="bg-[#1dc071]"
              handleClick={() => {
                navigate("register");
              }}
            />
          </>
        )}
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <Link
          to="/"
          className="w-[40px] h-[40px] flex justify-center items-center"
        >
          <h1 className="font-lato font-bold w-full text-white text-xl">
            COOPMUNITY
          </h1>
        </Link>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) =>
              (link.isAuth && isAuth) || !link.isAuth ? (
                <li
                  key={link.name}
                  className={`flex p-4 ${
                    location.pathname === link.link && "bg-[#3a3a43]"
                  }`}
                  onClick={() => {
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className={`w-[24px] h-[24px] text-white object-contain ${
                      location.pathname === link.link
                        ? "grayscale-0"
                        : "grayscale"
                    }`}
                  />
                  <p
                    className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                      location.pathname === link.link
                        ? "text-[#1dc071]"
                        : "text-[#808191]"
                    }`}
                  >
                    {link.name}
                  </p>
                </li>
              ) : null
            )}
          </ul>

          <div className="flex flex-col gap-4 mx-4">
            {isAuth ? (
              <>
                <CustomButton
                  btnType="button"
                  title="Create a post"
                  styles="bg-[#1dc071]"
                  handleClick={() => {
                    setToggleDrawer(false);
                    navigate("/create-post");
                  }}
                />
              </>
            ) : (
              <>
                <CustomButton
                  btnType="button"
                  title="Login"
                  styles="bg-[#3e3e63]"
                  handleClick={() => {
                    setToggleDrawer(false);
                    navigate("login");
                  }}
                />
                <CustomButton
                  btnType="button"
                  title="Register"
                  styles="bg-[#1dc071]"
                  handleClick={() => {
                    setToggleDrawer(false);
                    navigate("register");
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
