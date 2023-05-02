import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Link to="/faq">
      <div className="flex flex-col items-center justify-center bg-blue-500 h-96 rounded-lg mb-5">
        <h1 className="font-lato font-bold w-full text-white text-xl text-center">
          Welcome to COOPMUNITY
        </h1>
        <p className="text-lg text-white text-center">
          Forum for Credit Union Members
        </p>
        <hr className="w-16 h-1 bg-white my-4" />
        <p className="text-md text-white text-center">Click to learn more</p>
      </div>
    </Link>
  );
};

export default Welcome;
