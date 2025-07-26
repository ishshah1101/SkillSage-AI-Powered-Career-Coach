import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">SkillSage</h1>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Upload Resume</a>
          <a href="#" className="hover:underline">Match JD</a>
          <a href="#" className="hover:underline">Career Q&A</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
