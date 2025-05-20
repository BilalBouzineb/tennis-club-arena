
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, User, Users, Settings } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-tennis-green flex items-center justify-center mr-2">
                <span className="text-white font-bold">TC</span>
              </div>
              <span className="text-xl font-bold text-tennis-green">
                Tennis Club RTCF
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/courts"
              className="text-gray-700 hover:text-tennis-green flex items-center px-3 py-2 rounded-md text-sm font-medium"
            >
              <Calendar className="mr-1 h-4 w-4" />
              <span>Courts</span>
            </Link>
            <Link
              to="/tournaments"
              className="text-gray-700 hover:text-tennis-green flex items-center px-3 py-2 rounded-md text-sm font-medium"
            >
              <Trophy className="mr-1 h-4 w-4" />
              <span>Tournaments</span>
            </Link>
            <Link
              to="/rankings"
              className="text-gray-700 hover:text-tennis-green flex items-center px-3 py-2 rounded-md text-sm font-medium"
            >
              <Users className="mr-1 h-4 w-4" />
              <span>Rankings</span>
            </Link>
            <Link
              to="/settings"
              className="text-gray-700 hover:text-tennis-green flex items-center px-3 py-2 rounded-md text-sm font-medium"
            >
              <Settings className="mr-1 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>

          {/* Authentication Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-tennis-green hover:bg-tennis-green-dark">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-tennis-green focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          <Link
            to="/courts"
            className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            Courts
          </Link>
          <Link
            to="/tournaments"
            className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            Tournaments
          </Link>
          <Link
            to="/rankings"
            className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            Rankings
          </Link>
          <Link
            to="/settings"
            className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            Settings
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-3">
              <Link to="/login" className="block text-base font-medium px-3 py-2 w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
            </div>
            <div className="flex items-center px-3 mt-2">
              <Link to="/register" className="block text-base font-medium px-3 py-2 w-full">
                <Button size="sm" className="w-full bg-tennis-green hover:bg-tennis-green-dark">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
