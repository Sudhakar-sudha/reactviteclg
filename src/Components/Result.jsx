import React, { useState, useEffect } from 'react';

const Result = () => {
  // State variables for storing fetched data and results
  const [studentResult, setStudentResult] = useState(null);
  const [error, setError] = useState('');

  // Fetching internal and external marks from the backend
  useEffect(() => {
    // Replace with your backend API endpoint to fetch marks
    fetch('https://backendsampleclg.onrender.com/studentDetails') // Endpoint to get the student's marks
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setStudentResult(data); // Assuming data contains student's marks (internal + external)
        } else {
          setError('No data found');
        }
      })
      .catch((err) => {
        setError('Failed to fetch data');
        console.error(err);
      });
  }, []);

  // Function to calculate the result
  const calculateResult = () => {
    if (!studentResult) return null;
    
    const { internalMarks, externalMarks } = studentResult;

    const internalPass = internalMarks > 19;
    const externalPass = externalMarks > 21;

    if (internalPass && externalPass) {
      return 'Pass';
    } else {
      return 'Fail';
    }
  };

  // Function to display the result message based on the condition
  const result = calculateResult();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Student Result</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {studentResult ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-lg">Internal Marks:</span>
            <span>{studentResult.internalMarks}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-lg">External Marks:</span>
            <span>{studentResult.externalMarks}</span>
          </div>

          <div className="flex justify-between mt-4">
            <span className="font-semibold text-lg">Total Marks:</span>
            <span>{studentResult.internalMarks + studentResult.externalMarks}</span>
          </div>

          <div className={`text-xl font-bold mt-6 text-center ${result === 'Pass' ? 'text-green-500' : 'text-red-500'}`}>
            {result}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default Result;
