import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 py-6 rounded-md mt-10">
      <div className="container mx-auto px-4 flex justify-between">
        <div>
          <p className="text-white text-sm">
            Forum For Credit Union Members &copy; Coopmunity {currentYear}
          </p>
        </div>
        <div>
          <p className="text-white text-sm">Version 0.34</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
