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
    // Simulated fetched data
    const fetchedStudentData = {
      rollNo: '123456',
      studentName: 'John Doe',
    };

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
    // Backend submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-5">Add Internal Marks</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-1">Roll No</label>
            <input
              type="text"
              name="rollNo"
              value={marks.rollNo}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full bg-gray-100"
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
              className="border border-gray-300 p-3 rounded w-full bg-gray-100"
              disabled
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
