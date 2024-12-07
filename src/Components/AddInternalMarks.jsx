import React, { useState, useEffect } from 'react';

const AddInternalMarks = () => {
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
    // Fetch student details (rollNo and studentName) from the database here
    // For the sake of this example, we are setting dummy data

    const fetchedStudentData = {
      rollNo: '123456',
      studentName: 'John Doe',
    };

    // Update the state with fetched data
    setMarks((prevMarks) => ({
      ...prevMarks,
      rollNo: fetchedStudentData.rollNo,
      studentName: fetchedStudentData.studentName,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Marks:', marks);

    // Here, you can send the data to the backend.
    // Example:
    // fetch('http://localhost:5000/api/external-marks', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(marks),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-5">External Marks</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-1">Roll No</label>
          <input
            type="text"
            name="rollNo"
            value={marks.rollNo}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            disabled
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-1">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={marks.studentName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            disabled
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Internal 1</h2>
          <label className="block">Marks</label>
          <input
            type="number"
            name="internal1"
            value={marks.internal1}
            onChange={handleChange}
            placeholder="Internal Mark 1"
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block">Quiz 1</label>
          <input
            type="number"
            name="quiz1"
            value={marks.quiz1}
            onChange={handleChange}
            placeholder="Quiz 1"
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block">Assignment 1</label>
          <input
            type="number"
            name="assignment1"
            value={marks.assignment1}
            onChange={handleChange}
            placeholder="Assignment 1"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Internal 2</h2>
          <label className="block">Marks</label>
          <input
            type="number"
            name="internal2"
            value={marks.internal2}
            onChange={handleChange}
            placeholder="Internal Mark 2"
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block">Quiz 2</label>
          <input
            type="number"
            name="quiz2"
            value={marks.quiz2}
            onChange={handleChange}
            placeholder="Quiz 2"
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block">Assignment 2</label>
          <input
            type="number"
            name="assignment2"
            value={marks.assignment2}
            onChange={handleChange}
            placeholder="Assignment 2"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Model Exam</h2>
          <label className="block">Marks</label>
          <input
            type="number"
            name="model"
            value={marks.model}
            onChange={handleChange}
            placeholder="Model Exam"
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block">Quiz 3</label>
          <input
            type="number"
            name="quiz3"
            value={marks.quiz3}
            onChange={handleChange}
            placeholder="Quiz 3"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddInternalMarks;
