// import React from "react";
// import { Link } from "react-router-dom";

// const NavBar: React.FC = () => (
//   <nav className="bg-gray-800 text-white p-4 flex gap-4">
//     <Link to="/">Search</Link>
//     <Link to="/saved">Saved Candidates</Link>
//   </nav>
// );

// export default NavBar;

import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => (
  <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
    {/* Logo Section */}
    <div className="text-lg font-bold">
      <Link to="/" className="text-white hover:text-gray-300">
        Candidate Finder
      </Link>
    </div>

    {/* Navigation Links */}
    <div className="space-x-6">
      <Link
        to="/"
        className="text-white hover:text-blue-500 transition duration-300"
      >
        Search
      </Link>
      <Link
        to="/saved"
        className="text-white hover:text-blue-500 transition duration-300"
      >
        Saved Candidates
      </Link>
    </div>
  </nav>
);

export default NavBar;

