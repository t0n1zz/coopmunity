import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Link to="/faq">
      <div className="flex flex-col items-center justify-center bg-blue-500 h-96 rounded-lg mb-5">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to COOPMUNITY</h1>
        <p className="text-lg text-white">A Forum for Credit Union Members, Stafs and Supporters</p>
        <hr className="w-16 h-1 bg-white my-4" />
        <p className="text-md text-white">Click to learn more</p>
      </div>
    </Link>
  );
};

export default Welcome;
