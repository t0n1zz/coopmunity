import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomButton = ({ btnType, title, icon, handleClick, styles }) => {

  return (
    <button
      type={btnType}
      className={`font-lato font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]  ${styles}`}
      onClick={handleClick}
    >
      <span className="hidden sm:inline-block">
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {title}
      </span>
      <span className="sm:hidden">
        <FontAwesomeIcon icon={icon} />
        {title}
      </span>
    </button>
  );
};

export default CustomButton;
