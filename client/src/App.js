import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/DashBoard/DashBoard';
import CheckInListing from './components/CheckIn/CheckInListingPage';
import EditCheckInForm from './components/CheckIn/EditCheckInForm';
import TmListing from './components/Tms/TmListing';
import TmCreate from './components/Tms/TmCreate';
import Home from './components/Login/HomePage';
import RegistrationForm from './components/Login/RegistrationForm';
import Login from './components/Login/LoginForm';

function App() {
  return (
    <Router>
      <div className='font-roboto'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tms" element={<TmListing />} />
          <Route path='/tms/create' element={<TmCreate />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/checkin' element={<CheckInListing />} />
          <Route path="/checkin/:id" element={<EditCheckInForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
