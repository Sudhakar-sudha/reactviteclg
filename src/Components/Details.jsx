import React, { useState, useEffect } from 'react';

const Details = () => {
  const [students, setStudents] = useState([]); // Array to hold multiple students' details
  const [error, setError] = useState('');

  // Fetch student details from the backend
  useEffect(() => {
    // Replace with your backend API endpoint
    fetch(' http://localhost:3000/studentdetails')
    // fetch('https://backendsampleclg.onrender.com/studentdetails')
   
      .then((response) => response.json())
      .then((data) => {
        setStudents(data); // Assuming the response contains an array of student details
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

  if (students.length === 0) {
    return <div className="text-center text-gray-500">Loading student details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center mb-6">Student Details</h1>

      {/* Displaying list of all students */}
      <div className="space-y-6">
        {students.map((student) => (
          <div key={student.rollNo} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between">
              <span className="font-semibold text-lg">Student Name:</span>
              <span>{student.username}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-lg">Roll No:</span>
              <span>{student.password}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-lg">Internal Marks:</span>
              <span>{student.internalMarks}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-lg">External Marks:</span>
              <span>{student.externalMarks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
