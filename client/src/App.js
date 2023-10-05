import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import TmListing from './components/Tms/TmListing';
import CheckInListing from './components/CheckIn/CheckInListingPage';
import EditCheckInForm from './components/CheckIn/EditCheckInForm';
import Dashboard from './components/DashBoard/DashBoard';

import TmCreate from './components/Tms/TmCreate';


function App() {
  return (
    <Router>
      <div className="mt-10 font-roboto">
        <Navbar />
        <Routes>
          <Route path="/tms" element={<TmListing />} />
          <Route path='/tms/create' element={<TmCreate />}></Route>

          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/checkin' element={<CheckInListing  />}></Route>
          <Route path="/checkin/:id" element={<EditCheckInForm />} /> 



        </Routes>
      </div>
    </Router>
  );
}

export default App;
