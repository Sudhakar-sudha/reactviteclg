import React, { useEffect, useState } from 'react';

const Customers = () => {
  // const [customers, setCustomers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // // Fetch customer details from backend
  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     try {
  //       const response = await fetch('https://api.example.com/customers'); // Replace with your API endpoint
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch customer details');
  //       }
  //       const data = await response.json();
  //       setCustomers(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCustomers();
  // }, []);

  // // Show loading state
  // if (loading) {
  //   return (
  //     <div className="ml-56 text-2xl text-gray-600">
  //       <p>Loading customer details...</p>
  //     </div>
  //   );
  // }

  // // Show error state
  // if (error) {
  //   return (
  //     <div className="ml-56 text-2xl text-red-600">
  //       <p>Error: {error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="ml-56">
      <h1 className="text-4xl font-normal text-blue-600 mb-4">Customer Details</h1>
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Customer ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {/* {customers.map((customer) => (
             {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border border-gray-300 px-4 py-2">{customer.id}</td>
              <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
              <td className="border border-gray-300 px-4 py-2">{customer.email}</td>
              <td className="border border-gray-300 px-4 py-2">{customer.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{customer.address}</td>
            </tr>
          ))}*/}
            <tr>
              <td className="border border-gray-300 px-4 py-2">customer.id</td>
              <td className="border border-gray-300 px-4 py-2">customer.name</td>
              <td className="border border-gray-300 px-4 py-2">customer.email</td>
              <td className="border border-gray-300 px-4 py-2">customer.phone</td>
              <td className="border border-gray-300 px-4 py-2">customer.address</td>
            </tr>
       
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
