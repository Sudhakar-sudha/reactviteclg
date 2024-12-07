import React, { useState, useEffect } from 'react';

const AddExternalMarks = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [marks, setMarks] = useState('');
  const [error, setError] = useState('');

  // Fetching students from the backend (replace with actual API endpoint)
  useEffect(() => {
    fetch('http://localhost:3000/studentdetails') // Replace with your backend API URL
      .then((response) => response.json())
      .then((data) => {
        setStudents(data); // Assuming data is an array of student objects
      })
      .catch((err) => {
        console.error('Error fetching student data:', err);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!marks || marks < 0 || marks > 60) {
      setError('Marks must be between 0 and 60');
      return;
    }

    if (!selectedStudent) {
      setError('Please select a student');
      return;
    }

    setError('');
    
    // Handle form submission logic (e.g., sending data to the backend)
    console.log('Form submitted:', { selectedStudent, marks });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Add External Marks</h2>
      <form onSubmit={handleSubmit}>
        {/* Student Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Select Student</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Select Student --</option>
            {students.map((student) => (
              <option key={student.rollNo} value={student.rollNo}>
                {student.name} ({student.rollNo})
              </option>
            ))}
          </select>
        </div>

        {/* Marks Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Marks (Max 60)</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            max="60"
            min="0"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-md mt-4 ${
            selectedStudent && marks >= 0 && marks <= 60
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedStudent || marks < 0 || marks > 60}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddExternalMarks;
