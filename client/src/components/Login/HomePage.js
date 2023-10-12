// Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center justify-center items-center ">
         <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Moringa</h2>
      </div>
  
      <h1 className="text-4xl  font-semibold p-28 justify-center items-center">Welcome to Moringa Check-In System</h1>

      <div className="flex flex-row justify-center items-center mt-8 space-x-20">
        <Link
          to="/register"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded cursor-pointer md:ml-4"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded cursor-pointer md:ml-4"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
