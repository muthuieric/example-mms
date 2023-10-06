import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/DashBoard/DashBoard';
import CheckInListing from './components/CheckIn/CheckInListingPage';
import EditCheckInForm from './components/CheckIn/EditCheckInForm';
import TmListing from './components/Tms/TmListing';
import AddTmForm from './components/Tms/AddTmForm';
import EditTmForm from './components/Tms/EditTm';
import Home from './components/Login/HomePage';
import RegistrationForm from './components/Login/RegistrationForm';
import Login from './components/Login/LoginForm';
import AddStudentForm from './components/Students/AddStudent';
import StudentListing from './components/Students/StudentListing';
import EditStudentForm from './components/Students/EditStudent';

function App() {
  return (
    <Router>
      <div className='font-roboto'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />

          <Route path="/students" element={<StudentListing />} />
          <Route path='/add-student' element={<AddStudentForm />} />
          <Route path='/students/:id' element={<EditStudentForm />} />

          <Route path="/tms" element={<TmListing />} />
          <Route path='/add-tm' element={<AddTmForm />} />
          <Route path='/tms/:id' element={<EditTmForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/checkin' element={<CheckInListing />} />
          <Route path="/checkin/:id" element={<EditCheckInForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
