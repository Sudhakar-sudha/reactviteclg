import React, { useState, useEffect } from 'react';

const AddInternalMarks = () => {
  const [students, setStudents] = useState([]); // To store the fetched student details
  const [marks, setMarks] = useState({
    rollNo: '',
    studentName: '',
    internal1: '',
    quiz1: '',
    assignment1: '',
    internal2: '',
    quiz2: '',
    assignment2: '',
    model: '',
    quiz3: '',
  });

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
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://backendsampleclg.onrender.com/savemarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(marks), // Send the marks data as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to save marks');
      }
  
      const data = await response.json();
      console.log('Marks saved successfully:', data);
      // Optionally reset the form or show a success message
    } catch (error) {
      console.error('Error saving marks:', error);
      // Optionally show an error message
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-5">Add Internal Marks</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dropdown for selecting Roll Number */}
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


          {/* Internal 1 */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Internal 1</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Marks</label>
                <input
                  type="number"
                  name="internal1"
                  value={marks.internal1}
                  onChange={handleChange}
                  placeholder="Internal Mark 1"
                  className="border border-gray-300 p-3 rounded w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Quiz 1</label>
                <input
                  type="number"
                  name="quiz1"
                  value={marks.quiz1}
                  onChange={handleChange}
                  placeholder="Quiz 1"
                  className="border border-gray-300 p-3 rounded w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Assignment 1</label>
                <input
                  type="number"
                  name="assignment1"
                  value={marks.assignment1}
                  onChange={handleChange}
                  placeholder="Assignment 1"
                  className="border border-gray-300 p-3 rounded w-full"
                />
              </div>
            </div>
          </div>

          {/* Internal 2 */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Internal 2</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Marks</label>
                <input
                  type="number"
                  name="internal2"
                  value={marks.internal2}
                  onChange={handleChange}
                  placeholder="Internal Mark 2"
                  className="border border-gray-300 p-3 rounded w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Quiz 2</label>
                <input
                  type="number"
                  name="quiz2"
                  value={marks.quiz2}
                  onChange={handleChange}
                  placeholder="Quiz 2"
                  className="border border-gray-300 p-3 rounded w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Assignment 2</label>
                <input
                  type="number"
                  name="assignment2"
                  value={marks.assignment2}
                  onChange={handleChange}
                  placeholder="Assignment 2"
                  className="border border-gray-300 p-3 rounded w-full"
                />
              </div>
            </div>
          </div>

          {/* Model Exam */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Model Exam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Marks</label>
                <input
                  type="number"
                  name="model"
                  value={marks.model}
                  onChange={handleChange}
                  placeholder="Model Exam"
                  className="border border-gray-300 p-3 rounded w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Quiz 3</label>
                <input
                  type="number"
                  name="quiz3"
                  value={marks.quiz3}
                  onChange={handleChange}
                  placeholder="Quiz 3"
                  className="border border-gray-300 p-3 rounded w-full"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInternalMarks;
