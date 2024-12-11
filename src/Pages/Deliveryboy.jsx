import React, { useEffect, useState } from 'react';

const Deliveryboy = () => {
  // const [deliveryBoys, setDeliveryBoys] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // // Fetch delivery boy details from backend
  // useEffect(() => {
  //   const fetchDeliveryBoys = async () => {
  //     try {
  //       const response = await fetch('https://api.example.com/delivery-boys'); // Replace with your API endpoint
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch delivery boy details');
  //       }
  //       const data = await response.json();
  //       setDeliveryBoys(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDeliveryBoys();
  // }, []);

  // // Loading state
  // if (loading) {
  //   return (
  //     <div className="text-center text-2xl text-gray-600">
  //       <p>Loading delivery boy details...</p>
  //     </div>
  //   );
  // }

  // // Error state
  // if (error) {
  //   return (
  //     <div className="text-center text-2xl text-red-600">
  //       <p>Error: {error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="ml-56 mt-10">
      <h1 className="text-4xl font-semibold text-blue-600 mb-6">Delivery Boy Details</h1>
      <table className="min-w-full border-collapse border border-gray-400 text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">License Proof</th>
          </tr>
        </thead>
        <tbody>
          {/* {deliveryBoys.map((boy) => (
            <tr key={boy.id}>
              <td className="border border-gray-300 px-4 py-2">{boy.name}</td>
              <td className="border border-gray-300 px-4 py-2">{boy.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{boy.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {boy.licenseProof ? (
                  <a
                    href={boy.licenseProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View License
                  </a>
                ) : (
                  <span className="text-red-500">Not Uploaded</span>
                )}
              </td>
            </tr>
          ))} */}

            <tr >
              <td className="border border-gray-300 px-4 py-2">boy.name</td>
              <td className="border border-gray-300 px-4 py-2">boy.phone</td>
              <td className="border border-gray-300 px-4 py-2">boy.email</td>
              <td className="border border-gray-300 px-4 py-2">
                  <a
                    href='#'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View License
                  </a>
                  <span className="text-red-500">Not Uploaded</span>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Deliveryboy;
