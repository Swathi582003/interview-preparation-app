import React from 'react';
import { Link } from 'react-router-dom';
import ProfileinfoCard from '../../context/Cards/ProfileinfoCard';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 md:px-6 h-16">
        
        {/* Brand / Logo on the Left */}
        <Link to="/dashboard" className="flex items-center gap-2">
          {/* You can place logo image here */}
          {/* <img src="/logo.svg" alt="Logo" className="w-6 h-6" /> */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
            Interview Prep AI
          </h1>
        </Link>

        {/* Right Side Profile Card or User Controls */}
        <div className="flex items-center space-x-4">
          <ProfileinfoCard />
        </div>

      </div>
    </header>
  );
};

export default Navbar;
