import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex flex-col h-screen  bg-blue-500 w-64 text-white">
      <div className="text-4xl font-bold p-6">
        <h1>ADMIN</h1>
      </div>
      <ul className="flex flex-col list-none p-6 space-y-16">
        <li>
          <Link
            to="/"
            className="text-2xl font-medium hover:text-blue-900 transition-colors"
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            to="/add-student"
            className="text-2xl font-medium hover:text-blue-900 transition-colors"
          >
            Add Student
          </Link>
        </li>
        <li>
          <Link
            to="/internal-marks"
            className="text-2xl font-medium hover:text-blue-900 transition-colors"
          >
            Add Internal Marks
          </Link>
        </li>
        <li>
          <Link
            to="/external-marks"
            className="text-2xl font-medium hover:text-blue-900 transition-colors"
          >
            Add External Marks
          </Link>
        </li>
        <li>
          <Link
            to="/result"
            className="text-2xl font-medium hover:text-blue-900 transition-colors"
          >
            Result
          </Link>
        </li>
        <li>
          <Link
            to="/details"
            className="text-2xl font-medium hover:text-blue-900 transition-colors"
          >
            Details
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
