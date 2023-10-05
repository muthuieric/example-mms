import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";

const Dashboard = () => {
  const [totalCheckIns, setTotalCheckIns] = useState(0);

  useEffect(() => {
    fetch("/total-checkins")  // Replace with the correct URL of your Flask route
      .then((response) => response.json())
      .then((data) => {
        setTotalCheckIns(data.total_checkins);
      })
      .catch((error) => {
        console.error("Error fetching total check-ins:", error);
      });
  }, []);

  return (
    <div className="mx-auto">

      <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
      </div>
  
      <div className="flex flex-col md:flex-row md:space-x-4 p-4 md:p-24">
        
        <div className="md:w-1/2 lg:w-1/2 lg:h-64  shadow-lg bg-orange-500 text-white rounded-lg p-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">Total CheckIns</h2>
            <p className="text-6xl text-center">{totalCheckIns}</p>
        </div>

        <PieChart  />

      </div>
    </div>
  );
};

export default Dashboard;
