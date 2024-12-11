import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
// import Home from './Components/Home';
import AddStudent from './Components/AddStudent';
import AddExternalMarks from './Components/AddExternalMarks';
import AddInternalMarks from './Components/AddInternalMarks';
import Result from './Components/Result';
import Details from './Components/Details';
import './index.css'
import AdminSideBar from './Pages/AdminSideBar';
import ProductSellers from './Pages/ProductSellers';
import Customers from './Pages/Customers';
import Deliveryboy from './Pages/Deliveryboy';
import Products from './Pages/Products';
import Orders from './Pages/Orders';
import Home from './Pages/Home';

const App = () => {
  return (
    // <Router>
    //   <div className="flex">
    //     {/* Sidebar Navigation */}
    //     <Navbar />
    //     {/* Main Content */}
    //     <div className="flex-grow p-5">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/add-student" element={<AddStudent />} />
    //         <Route path="/internal-marks" element={<AddInternalMarks />} />
    //         <Route path="/external-marks" element={<AddExternalMarks />} />
    //         <Route path="/result" element={<Result />} />
    //         <Route path="/details" element={<Details />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>



    <Router>
    <div className="flex">
      {/* Sidebar Navigation */}
      <AdminSideBar />
      {/* Main Content */}
      <div className="flex-grow p-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sellerdetails" element={<ProductSellers />} />
          <Route path="/customerdetails" element={<Customers />} />
          <Route path="/deliverydetails" element={<Deliveryboy />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
};

export default App;
