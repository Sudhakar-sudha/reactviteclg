import React, { useState, useEffect } from 'react';

const Details = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState('');

  // Fetch student details from the backend
  useEffect(() => {
    // Replace with your backend API endpoint
    fetch('https://backendsampleclg.onrender.com/studentDetails')
      .then((response) => response.json())
      .then((data) => {
        setStudentDetails(data); // Assuming the response contains student details
      })
      .catch((err) => {
        setError('Failed to fetch student data');
        console.error(err);
      });
  }, []);

  // Loading or Error state
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!studentDetails) {
    return <div className="text-center text-gray-500">Loading student details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center mb-6">Student Details</h1>

      {/* Displaying student details */}
      <div className="space-y-6">
        <div className="flex justify-between">
          <span className="font-semibold text-lg">Student Name:</span>
          <span>{studentDetails.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Roll No:</span>
          <span>{studentDetails.rollNo}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Internal Marks:</span>
          <span>{studentDetails.internalMarks}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">External Marks:</span>
          <span>{studentDetails.externalMarks}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Attendance:</span>
          <span>{studentDetails.attendance}%</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Department:</span>
          <span>{studentDetails.department}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Class:</span>
          <span>{studentDetails.class}</span>
        </div>
      </div>
    </div>
  );
};

export default Details;
