import React from 'react'
import { Link } from 'react-router-dom';

const AdminSideBar = () => {
  return (
    <div>
        <nav className="flex flex-col fixed h-screen  bg-blue-500 w-56 text-white">
      <div className="text-2xl  p-3 py-9">
        <h1>Admin Dashboard</h1>
      </div>
      <ul className="flex flex-col list-none p-6 space-y-14">
        <li>
          <Link
            to="/"
            className="text-xl font-medium hover:text-blue-900 transition-colors"
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            to="/sellerdetails"
            className="text-xl font-medium hover:text-blue-900 transition-colors"
          >
            Seller Details
          </Link>
        </li>
        <li>
          <Link
            to="/customerdetails"
            className="text-xl font-medium hover:text-blue-900 transition-colors"
          >
            CustomerDetails
          </Link>
        </li>
        <li>
          <Link
            to="/deliverydetails"
            className="text-xl font-medium hover:text-blue-900 transition-colors"
          >
            DeliveryDetails
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className="text-xl font-medium hover:text-blue-900 transition-colors"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="text-xl font-medium hover:text-blue-900 transition-colors"
          >
            Orders
          </Link>
        </li>
      </ul>
    </nav>
    </div>
  )
}

export default AdminSideBar