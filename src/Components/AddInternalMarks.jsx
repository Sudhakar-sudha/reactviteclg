


import React, { useState, useEffect } from 'react';

const AddInternalMarks = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({
    rollNo: '',
    studentName: '',
    subjectName: '',
    subjectCode: '',
    internal1: '',
    quiz1: '',
    assignment1: '',
    internal2: '',
    quiz2: '',
    assignment2: '',
    model: '',
    quiz3: '',
  });
  const [errors, setErrors] = useState({});
  const [existingMarks, setExistingMarks] = useState([]); // Store existing marks

  // Fetch student, subject, and existing marks data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await fetch('https://backendsampleclg.onrender.com/studentdetails');
        // const studentResponse = await fetch('http://localhost:3000/studentdetails');
        const studentData = await studentResponse.json();
        setStudents(studentData);

        const subjectResponse = await fetch('https://backendsampleclg.onrender.com/subjectdetails');
        // const subjectResponse = await fetch('http://localhost:3000/subjectdetails');
        const subjectData = await subjectResponse.json();
        setSubjects(subjectData);

        // Fetch existing marks
        const marksResponse = await fetch('https://backendsampleclg.onrender.com/getinternalmarks');
        // const marksResponse = await fetch('http://localhost:3000/getinternalmarks');
        const marksData = await marksResponse.json();
        console.log(marksData);
        setExistingMarks(marksData);
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    };

    fetchData();
  }, []);

  const handleRollNoChange = (e) => {
    const selectedRoll = e.target.value;
    const student = students.find((student) => student.password === selectedRoll);
    setMarks((prevMarks) => ({
      ...prevMarks,
      rollNo: selectedRoll,
      studentName: student ? student.username : '',
    }));
  };

  const handleSubjectChange = (e) => {
    const subjectName = e.target.value;
    const selectedSubject = subjects.find((subject) => subject.name === subjectName);
    setMarks((prevMarks) => ({
      ...prevMarks,
      subjectName,
      subjectCode: selectedSubject ? selectedSubject.code : '',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      [name]: value,
    }));

    const newErrors = { ...errors };
    if (!value) {
      newErrors[name] = 'This field is required.';
    } else {
      const ranges = {
        internal1: [0, 25],
        internal2: [0, 25],
        quiz1: [0, 10],
        quiz2: [0, 10],
        quiz3: [0, 10],
        assignment1: [0, 10],
        assignment2: [0, 10],
        model: [0, 60],
      };
      const [min, max] = ranges[name] || [null, null];
      if (min !== null && max !== null && (value < min || value > max)) {
        newErrors[name] = `Value must be between ${min} and ${max}.`;
      } else {
        delete newErrors[name];
      }
    }
    setErrors(newErrors);
  };

  const calculateTotalInternalMarks = () => {
    const internalMarks = [
      parseFloat(marks.internal1 || 0),
      parseFloat(marks.internal2 || 0),
      parseFloat(marks.model || 0),
    ];
    internalMarks.sort((a, b) => b - a); // Sort to get top two
    const internalSum = (internalMarks[0] + internalMarks[1]) / 2;

    const quizMarks = [
      parseFloat(marks.quiz1 || 0),
      parseFloat(marks.quiz2 || 0),
      parseFloat(marks.quiz3 || 0),
    ];
    quizMarks.sort((a, b) => b - a); // Sort to get top two
    const quizSum = (quizMarks[0] + quizMarks[1]) / 4;

    const assignmentSum = (parseFloat(marks.assignment1 || 0) + parseFloat(marks.assignment2 || 0)) / 2;

    return internalSum + quizSum + assignmentSum;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'rollNo',
      'subjectName',
      'internal1',
      'quiz1',
      'assignment1',
      'internal2',
      'quiz2',
      'assignment2',
      'model',
      'quiz3',
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!marks[field] || marks[field] === '') {
        newErrors[field] = 'This field is required.';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Please correct the errors before submitting.');
      return;
    }

    const totalInternal = calculateTotalInternalMarks();

    try {
      const response = await fetch('https://backendsampleclg.onrender.com/savemarks', {
        // const response = await fetch('http://localhost:3000/savemarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...marks,
          name: marks.subjectName,
          code: marks.subjectCode,
          totalInternal,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save marks');
      }

      const data = await response.json();
      console.log('Marks saved successfully:', data);
      alert('Marks saved successfully!');
      setMarks({
        rollNo: '',
        studentName: '',
        subjectName: '',
        subjectCode: '',
        internal1: '',
        quiz1: '',
        assignment1: '',
        internal2: '',
        quiz2: '',
        assignment2: '',
        model: '',
        quiz3: '',
      });
    } catch (error) {
      console.error('Error saving marks:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-5">Add Internal Marks</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form inputs for rollNo, subjectName, marks go here... */}
            {/* Roll No Dropdown */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
   {/* Roll No */}
   <div>
   <label className="block text-lg font-medium mb-1">Roll No</label>
     <select
      name="rollNo"
      value={marks.rollNo}
      onChange={handleRollNoChange}
      className={`border p-3 rounded w-full ${errors.rollNo ? 'border-red-500' : 'border-gray-300'}`}
    >
      <option value="" disabled>Select Roll No</option>
      {students.length > 0 ? (
        students.map((student) => (
          <option key={student.password} value={student.password}>
            {student.password}
          </option>
        ))
      ) : (
        <option>No students available</option>
      )}
    </select>
    {errors.rollNo && <p className="text-red-500 text-sm">{errors.rollNo}</p>}
  </div>

  {/* Student Name */}
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
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  {/* Subject Name */}
  <div>
    <label className="block text-lg font-medium mb-1">Subject Name</label>
    <select
      name="subjectName"
      value={marks.subjectName}
      onChange={handleSubjectChange}
      className={`border p-3 rounded w-full ${errors.subjectName ? 'border-red-500' : 'border-gray-300'}`}
    >
      <option value="" disabled>Select Subject</option>
      {subjects.length > 0 ? (
        subjects.map((subject) => (
          <option key={subject.code} value={subject.name}>
            {subject.name}
          </option>
        ))
      ) : (
        <option>No subjects available</option>
      )}
    </select>
    {errors.subjectName && <p className="text-red-500 text-sm">{errors.subjectName}</p>}
  </div>

   {/* Subject Code */}
   <div>
     <label className="block text-lg font-medium mb-1">Subject Code</label>
     <input
      type="text"
      name="subjectCode"
      value={marks.subjectCode}
      readOnly
      className="border border-gray-300 p-3 rounded w-full bg-gray-100"
    />
  </div>
</div>
          {/* Internal Marks, Quiz Marks, Assignment Marks, Model Marks, Quiz 3 */}
          {/* Existing internal, quiz, assignment, and model exam inputs go here */}          
  {/* Internal 1, Quiz 1, Assignment 1 */}
           {/* Internal 1, Quiz 1, Assignment 1 */}
           <div>
             <h2 className="text-2xl font-semibold mb-3">Internal 1</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                 <label className="block text-lg font-medium mb-1">Marks</label>
                 <input
                   type="number"
                   name="internal1"
                   value={marks.internal1}
                   onChange={handleChange}
                   className={`border p-3 rounded w-full ${errors.internal1 ? 'border-red-500' : 'border-gray-300'}`}
                 />
                 {errors.internal1 && <p className="text-red-500 text-sm">{errors.internal1}</p>}
               </div>
               <div>
                 <label className="block text-lg font-medium mb-1">Quiz 1</label>
                 <input
                   type="number"
                  name="quiz1"
                  value={marks.quiz1}
                  onChange={handleChange}
                  className={`border p-3 rounded w-full ${errors.quiz1 ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.quiz1 && <p className="text-red-500 text-sm">{errors.quiz1}</p>}
              </div>
              <div>
                <label className="block text-lg font-medium mb-1">Assignment 1</label>
                <input
                  type="number"
                  name="assignment1"
                   value={marks.assignment1}
                  onChange={handleChange}
                  className={`border p-3 rounded w-full ${errors.assignment1 ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.assignment1 && <p className="text-red-500 text-sm">{errors.assignment1}</p>}
              </div>
            </div>
          </div>

           {/* Internal 2, Quiz 2, Assignment 2 */}
           <div>
             <h2 className="text-2xl font-semibold mb-3">Internal 2</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                 <label className="block text-lg font-medium mb-1">Marks</label>
                 <input
                  type="number"
                  name="internal2"
                  value={marks.internal2}
                  onChange={handleChange}
                  className={`border p-3 rounded w-full ${errors.internal2 ? 'border-red-500' : 'border-gray-300'}`}
                />
                 {errors.internal2 && <p className="text-red-500 text-sm">{errors.internal2}</p>}
               </div>
               <div>
                  <label className="block text-lg font-medium mb-1">Quiz 2</label>
                  <input
                  type="number"
                  name="quiz2"
                  value={marks.quiz2}
                  onChange={handleChange}
                  className={`border p-3 rounded w-full ${errors.quiz2 ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.quiz2 && <p className="text-red-500 text-sm">{errors.quiz2}</p>}
              </div>
              <div>
                 <label className="block text-lg font-medium mb-1">Assignment 2</label>
                <input
                  type="number"
                  name="assignment2"
                  value={marks.assignment2}
                  onChange={handleChange}
                  className={`border p-3 rounded w-full ${errors.assignment2 ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.assignment2 && <p className="text-red-500 text-sm">{errors.assignment2}</p>}
              </div>
            </div>
          </div>

          {/* Model Exam Marks */}
           <div>
             <label className="block text-lg font-medium mb-1">Model Exam Marks (out of 60)</label>
            <input
              type="number"
              name="model"
              value={marks.model}
              onChange={handleChange}
              className={`border p-3 rounded w-full ${errors.model ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
          </div>

           {/* Quiz 3 */}
           <div>
             <label className="block text-lg font-medium mb-1">Quiz 3</label>
             <input
              type="number"
              name="quiz3"
              value={marks.quiz3}
              onChange={handleChange}
              className={`border p-3 rounded w-full ${errors.quiz3 ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.quiz3 && <p className="text-red-500 text-sm">{errors.quiz3}</p>}
          </div>


          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-full">
              Submit
            </button>
          </div>
        </form>

        {/* Display existing marks */}
<h2 className="text-2xl font-semibold mt-10 mb-4">Existing Marks</h2>
<table className="min-w-full table-auto border-collapse border border-gray-300">
  <thead>
    <tr>
      <th className="border px-4 py-2">Roll No</th>
      <th className="border px-4 py-2">Student Name</th>
      <th className="border px-4 py-2">Subject Name</th>
      <th className="border px-4 py-2">Internal 1</th>
      <th className="border px-4 py-2">Internal 2</th>
      <th className="border px-4 py-2">Quiz 1</th>
      <th className="border px-4 py-2">Quiz 2</th>
      <th className="border px-4 py-2">Quiz 3</th>
      <th className="border px-4 py-2">Assignment 1</th>
      <th className="border px-4 py-2">Assignment 2</th>
      <th className="border px-4 py-2">Model Exam Marks</th>
      <th className="border px-4 py-2">Total Internal Marks</th>
    </tr>
  </thead>
  <tbody>
  {existingMarks.length > 0 ? (
  existingMarks.map((marks) => {
    const internal1 = parseFloat(marks.internal1) || 0;
    const internal2 = parseFloat(marks.internal2) || 0;
    const modelMarks = parseFloat(marks.modelMarks) || 0;
    const quiz1 = parseFloat(marks.quiz1) || 0;
    const quiz2 = parseFloat(marks.quiz2) || 0;
    const quiz3 = parseFloat(marks.quiz3) || 0;
    const assignment1 = parseFloat(marks.assignment1) || 0;
    const assignment2 = parseFloat(marks.assignment2) || 0;

    // Step 1: Convert model mark to 25
    const modelTo25 = (modelMarks / 100) * 25;

    // Step 2: Take the highest of internal1, internal2, and modelTo25, then divide by 2
    const internals = [internal1, internal2, modelTo25].sort((a, b) => b - a);
    const highestInternal = (internals[0] + internals[1]) / 2;
    // console.log(  `Highest two internals for rollNo ${marks.rollNo}: (${internals[0]} + ${internals[1]}) / 2 = ${highestInternal}`);

    // Step 3: Take the highest two quiz marks out of quiz1, quiz2, and quiz3, then divide by 4
    const quizMarks = [quiz1, quiz2, quiz3].sort((a, b) => b - a);
    const highestQuiz = (quizMarks[0] + quizMarks[1]) / 4;
    // console.log(`Highest quizzes for rollNo ${marks.rollNo}: (${quizMarks[0]} + ${quizMarks[1]}) / 4 = ${highestQuiz}`);

    // Step 4: Take two assignment marks, then divide by 2
    const assignmentMarks = (assignment1 + assignment2) / 2;
    // console.log(`Assignment marks for rollNo ${marks.rollNo}: (${assignment1} + ${assignment2}) / 2 = ${assignmentMarks}`);

    // Step 5: Add the results of the three calculations
    const total = highestInternal + highestQuiz + assignmentMarks; // Define total here
    
    return (
      <tr key={marks.id}>
        <td className="border px-4 py-2">{marks.rollNo}</td>
        <td className="border px-4 py-2">{marks.studentName}</td>
        <td className="border px-4 py-2">{marks.name}</td>
        <td className="border px-4 py-2">{marks.internal1}</td>
        <td className="border px-4 py-2">{marks.internal2}</td>
        <td className="border px-4 py-2">{marks.quiz1}</td>
        <td className="border px-4 py-2">{marks.quiz2}</td>
        <td className="border px-4 py-2">{marks.quiz3}</td>
        <td className="border px-4 py-2">{marks.assignment1}</td>
        <td className="border px-4 py-2">{marks.assignment2}</td>
        <td className="border px-4 py-2">{marks.model}</td>
        <td className="border px-4 py-2">{total}</td> {/* Display the total internal marks */}
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan="11" className="text-center border px-4 py-2">No marks available</td>
  </tr>
)}

  </tbody>
</table>

      </div>
    </div>
  );
};

export default AddInternalMarks;
