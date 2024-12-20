import React, { useState, useEffect } from 'react';

const AddExternalMarks = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [marks, setMarks] = useState('');
  const [error, setError] = useState('');

   useEffect(() => {
     // Fetch student details from the backend
     const fetchStudentDetails = async () => {
       try {
         const response = await fetch('https://backendsampleclg.onrender.com/studentdetails');
         const data = await response.json();
         console.log(data);
         setStudents(data); // Assuming the response is an array of student objects
       } catch (error) {
         console.error('Error fetching student details:', error);
       }
     };
 
     fetchStudentDetails();
   }, []);
 
   const handleRollNoChange = (e) => {
     const selectedRoll = e.target.value;
   
     // Find the student by roll number
     const student = students.find((student) => student.password === selectedRoll);
   
     // Update the state with the selected roll number and student name
     setMarks((prevMarks) => ({
       ...prevMarks,
       rollNo: selectedRoll,
       studentName: student ? student.username : '', // Set student name if found
     }));
   };
   

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
         <div>
    <label className="block text-lg font-medium mb-1">Roll No</label>
    <select
      name="rollNo"
      value={marks.rollNo}
      onChange={handleRollNoChange}
      className="border border-gray-300 p-3 rounded w-full bg-gray-100"
    >
      <option value="" disabled>Select Roll No</option>
      {students.map((student) => (
        <option key={student.password} value={student.password}>
          {student.password}
        </option>
      ))}
    </select>
  </div>

  {/* Display Student Name based on selected Roll No */}
  <div>
    <label className="block text-lg font-medium mb-1">Student Name</label>
    <input
      type="text"
      name="studentName"
      value={marks.studentName}
      readOnly
      className="border border-gray-300 p-3 rounded w-full bg-gray-100"
    />
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
