import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { CustomButton } from "components";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1
          className="font-lato font-bold sm:text-[25px] text-[18px] leading-[38px] text-white
        "
        >
          Logout
        </h1>
      </div>

      <div className="flex items-center mt-[20px]">
        <h1
          className="font-lato font-bold sm:text-[25px] text-[18px] leading-[38px] text-white
        "
        >
          Are you sure want to logout?
        </h1>
      </div>

      <div className="flex flex-row gap-4 justify-center items-center mt-[20px]">
        <CustomButton
          btnType="button"
          title="Yes"
          styles="bg-[#cd4813]"
          icon={faCircleCheck}
          handleClick={() => {
            dispatch(setLogout());
            navigate("/");
          }}
        />
        <CustomButton
          btnType="button"
          title="No"
          styles="bg-[#1dc071]"
          icon={faCircleXmark}
          handleClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default Logout;
