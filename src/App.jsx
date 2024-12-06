import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AddStudent from './Components/AddStudent';
import AddExternalMarks from './Components/AddExternalMarks';
import AddInternalMarks from './Components/AddInternalMarks';
import Result from './Components/Result';
import Details from './Components/Details';
import './index.css'

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar Navigation */}
        <Navbar />
        {/* Main Content */}
        <div className="flex-grow p-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/internal-marks" element={<AddInternalMarks />} />
            <Route path="/external-marks" element={<AddExternalMarks />} />
            <Route path="/result" element={<Result />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
