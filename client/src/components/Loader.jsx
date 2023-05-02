import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <FontAwesomeIcon
        icon={faSpinner}
        className="w-[100px] h-[100px] text-white animate-spin"
        size="5x"
      />

      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        Loading is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default Loader;
