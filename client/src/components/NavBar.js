import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', { method: 'GET' });
      if (response.ok) {
        // If logout is successful, you can navigate to the login page
        // using NavLink's `to` prop
      } else {
        // Handle logout failure
        console.error('Logout failed:', response.status);
        // You can show an error message to the user here
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle network errors or other issues
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex justify-start items-center px-10 bg-white z-10 ">
        <NavLink to="/dashboard" className="text-black font-bold text-2xl pr-16">
          <span className="text-3xl">Moringa</span>
          <br />
          <span className="text-base">CheckIn System</span>
        </NavLink>

        <div className={`flex flex-col md:flex-row md:space-x-4  ${open ? 'block' : 'hidden md:block'}`}>
          <NavLink exact to="/dashboard" className="navlink" activeClassName="text-orange-500">
            Dashboard
          </NavLink>
          <NavLink to="/students" className="navlink" activeClassName="text-orange-500">
            Students
          </NavLink>
          <NavLink to="/checkIn" className="navlink" activeClassName="text-orange-500">
            CheckIn
          </NavLink>
          <NavLink to="/tms" className="navlink" activeClassName="text-orange-500">
            TMs
          </NavLink>
          <NavLink to="/login" className="navlink" activeClassName="text-orange-500" onClick={handleLogout}>
            Logout
          </NavLink>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black text-3xl focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
