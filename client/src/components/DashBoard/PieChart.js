/* global google */


import React, { useEffect, useState } from 'react';

const PieChart = () => {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    // Load Google Charts library and define callback function
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(fetchData);

    function fetchData() {
      // Fetch the data from your Flask API
      fetch('/room-data')
        .then((response) => response.json())
        .then((data) => {
          // Format the data for the pie chart
          const roomChartData = data.rooms.map((room) => [
            `Room ${room.Room_number}`,
            room.count
          ]);
          setRoomData(roomChartData);
        })
        .catch((error) => {
          console.error('Error fetching room data:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (roomData.length === 0) return; // Wait until data is available

    // Create the pie chart once data is available
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Room');
    dataTable.addColumn('number', 'Count');
    dataTable.addRows(roomData);

    const options = {
      title: 'Number of People per Room'
    };

    const chart = new google.visualization.PieChart(
      document.getElementById('piechart')
    );
    chart.draw(dataTable, options);
  }, [roomData]);

  return (
    
     <div id="piechart" className="shadow-lg lg:w-1/2 lg:h-64 "></div>
  
  );
};

export default PieChart;
