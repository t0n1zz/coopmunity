import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 py-6 rounded-md mt-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full text-center">
            <p className="text-white text-sm">
              Forum For Credit Union Members &copy; Coopmunity {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
