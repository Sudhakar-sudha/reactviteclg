

import React, { useState, useEffect } from 'react';

const AddExternalMarks = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({
    rollNo: '',
    studentName: '',
    subjectName: '',
    subjectCode: '',
    externalMarks: '',
  });
  const [errors, setErrors] = useState({});

  // Fetch Student Details
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        // const response = await fetch('http://localhost:3000/studentdetails');
        const response = await fetch('https://backendsampleclg.onrender.com/studentdetails');
        if (!response.ok) throw new Error('Failed to fetch student details');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    const fetchSubjects = async () => {
      try {
        // const response = await fetch('http://localhost:3000/subjectdetails');
        const response = await fetch('https://backendsampleclg.onrender.com/subjectdetails');
        if (!response.ok) throw new Error('Failed to fetch subjects');
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchStudentDetails();
    fetchSubjects();
  }, []);

  // Handle Roll No Change
  const handleRollNoChange = (e) => {
    const selectedRoll = e.target.value;
    const student = students.find((student) => student.password === selectedRoll);
    setMarks((prevMarks) => ({
      ...prevMarks,
      rollNo: selectedRoll,
      studentName: student ? student.username : '',
    }));
    setErrors((prevErrors) => ({ ...prevErrors, rollNo: '' }));
  };

  // Handle Subject Change
  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    const subject = subjects.find((sub) => sub.name === selectedSubject);
    setMarks((prevMarks) => ({
      ...prevMarks,
      subjectName: selectedSubject,
      subjectCode: subject ? subject.code : '',
    }));
    setErrors((prevErrors) => ({ ...prevErrors, subjectName: '' }));
  };

  // Handle Marks Input Change
  const handleMarksChange = (e) => {
    const { value } = e.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      externalMarks: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, externalMarks: '' }));
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};
    if (!marks.rollNo) newErrors.rollNo = 'Roll number is required.';
    if (!marks.subjectName) newErrors.subjectName = 'Subject name is required.';
    if (!marks.externalMarks || isNaN(marks.externalMarks) || marks.externalMarks === '') {
      newErrors.externalMarks = 'Marks are required.';
    } else if (marks.externalMarks < 0 || marks.externalMarks > 60) {
      newErrors.externalMarks = 'Marks must be between 0 and 60.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // const response = await fetch('http://localhost:3000/addExternalMark', {
      const response = await fetch('https://backendsampleclg.onrender.com/addExternalMark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rollNo: marks.rollNo,
          studentName: marks.studentName,
          name: marks.subjectName,
          code: marks.subjectCode,
          externalMarks: Number(marks.externalMarks),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save marks');
      }

      const data = await response.json();
      alert('Marks saved successfully!');
      console.log('External marks saved successfully:', data);

      setMarks({
        rollNo: '',
        studentName: '',
        subjectName: '',
        subjectCode: '',
        externalMarks: '',
      });
    } catch (error) {
      console.error('Error saving external marks:', error);
      alert(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Add External Marks</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Roll Number Selection */}
          <div>
            <label className="block text-lg font-medium mb-1">Roll No</label>
            <select
              name="rollNo"
              value={marks.rollNo}
              onChange={handleRollNoChange}
              className={`border p-3 rounded w-full ${errors.rollNo ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="" disabled>Select Roll No</option>
              {students.map((student) => (
                <option key={student.password} value={student.password}>
                  {student.password}
                </option>
              ))}
            </select>
            {errors.rollNo && <p className="text-red-500 text-sm">{errors.rollNo}</p>}
          </div>

          {/* Display Student Name */}
          <div>
            <label className="block text-lg font-medium mb-1">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={marks.studentName}
              readOnly
              className="border p-3 rounded w-full bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Subject Name Selection */}
          <div>
            <label className="block text-lg font-medium mb-1">Subject Name</label>
            <select
              name="subjectName"
              value={marks.subjectName}
              onChange={handleSubjectChange}
              className={`border p-3 rounded w-full ${errors.subjectName ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="" disabled>Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.code} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
            {errors.subjectName && <p className="text-red-500 text-sm">{errors.subjectName}</p>}
          </div>

          {/* Display Subject Code */}
          <div>
            <label className="block text-lg font-medium mb-1">Subject Code</label>
            <input
              type="text"
              name="subjectCode"
              value={marks.subjectCode}
              readOnly
              className="border p-3 rounded w-full bg-gray-100"
            />
          </div>
        </div>

        {/* External Marks Input */}
        <div>
          <label className="block text-lg font-medium mb-1">Marks (Max 60)</label>
          <input
            type="number"
            name="externalMarks"
            value={marks.externalMarks}
            onChange={handleMarksChange}
            className={`border p-3 rounded w-full ${errors.externalMarks ? 'border-red-500' : 'border-gray-300'}`}
            max="60"
            min="0"
          />
          {errors.externalMarks && <p className="text-red-500 text-sm">{errors.externalMarks}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddExternalMarks;
