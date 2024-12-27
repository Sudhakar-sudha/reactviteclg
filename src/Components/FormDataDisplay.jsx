import React, { useEffect, useState } from "react";
import axios from "axios";

const FormDataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("https://project-tptk.onrender.com/formdata/formdata")
      .then((response) => {
        setData(response.data); // Store data in state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Form Data
        </h1>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Picture</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.age}</td>
                <td className="py-3 px-6">
                  <img
                    src={`https://project-tptk.onrender.com/pictures/${item.picture}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormDataDisplay;
