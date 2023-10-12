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
      <nav className="fixed top-0 left-0 right-0 flex justify-start items-center px-6 md:px-10 bg-white z-10">
        <NavLink to="/dashboard" className="text-black font-bold text-xl pr-4 md:text-2xl md:pr-16">
          <span className="text-2xl md:text-3xl">Moringa</span>
          <br />
          <span className="text-base">CheckIn System</span>
        </NavLink>

        <div className={`flex flex-col md:flex-row md:space-x-4 ${open ? 'block' : 'hidden md:block'}`}>
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

        <div className="md:hidden md:flex md:flex-row md:space-x-4 ">
          <div className="justify-end ">
            <button onClick={toggleMenu} className="rounded-md p-2 text-black text-xl md:text-3xl focus:outline-none">
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
          </div>
      </nav>
    </>
  );
};

export default Navbar;
