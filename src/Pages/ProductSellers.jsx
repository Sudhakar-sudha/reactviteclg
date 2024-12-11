import React, { useEffect, useState } from 'react';

const ProductSellers = () => {
  // const [sellers, setSellers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // // Fetch data from backend
  // useEffect(() => {
  //   const fetchSellers = async () => {
  //     try {
  //       const response = await fetch('https://api.example.com/sellers'); // Replace with your API endpoint
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch seller details');
  //       }
  //       const data = await response.json();
  //       setSellers(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSellers();
  // }, []);

  // // Loading state
  // if (loading) {
  //   return (
  //     <div className="ml-56 text-2xl text-gray-600">
  //       <p>Loading seller details...</p>
  //     </div>
  //   );
  // }

  // // Error state
  // if (error) {
  //   return (
  //     <div className="ml-56 text-2xl text-red-600">
  //       <p>Error: {error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="ml-56">
      <h1 className="text-4xl font-normal text-blue-600 mb-4">Seller Details</h1>
      {/* <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.id}>
              <td className="border border-gray-300 px-4 py-2">{seller.id}</td>
              <td className="border border-gray-300 px-4 py-2">{seller.name}</td>
              <td className="border border-gray-300 px-4 py-2">{seller.email}</td>
              <td className="border border-gray-300 px-4 py-2">{seller.location}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

            <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone no</th>
            <th className="border border-gray-300 px-4 py-2">Account Number</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {/* {sellers.map((seller) => ( */}
            <tr >
              <td className="border border-gray-300 px-4 py-2">id</td>
              <td className="border border-gray-300 px-4 py-2">name</td>
              <td className="border border-gray-300 px-4 py-2">email</td>
              <td className="border border-gray-300 px-4 py-2">243597835r213</td>
              <td className="border border-gray-300 px-4 py-2">4jk35h28iuf398</td>
              <td className="border border-gray-300 px-4 py-2">Address</td>
            </tr>
          {/* // ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSellers;
