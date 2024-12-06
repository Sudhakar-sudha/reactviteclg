import React, { useState, useEffect } from 'react';

const AddStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = { name: studentName, rollNo };

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        setMessage('Student added successfully!');
        setStudentName('');
        setRollNo('');
        // Refresh the list of students
        const newStudent = await response.json();
        setStudents([...students, newStudent]);
      } else {
        setMessage('Failed to add student.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while adding the student.');
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-5">Add Student</h1>

      {/* Form to Add Student */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-1">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">Roll No</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter roll number"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Student
        </button>
      </form>
      {message && <p className="mt-4 text-lg">{message}</p>}

      {/* Display Stored Students */}
      <h2 className="text-2xl font-bold mt-10">Stored Students</h2>
      {students.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-200 mt-5">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{student.name}</td>
                <td className="border border-gray-300 p-2">{student.rollNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-5 text-gray-500">No students added yet.</p>
      )}
    </div>
  );
};

export default AddStudent;


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose
//   .connect('mongodb://localhost:27017/studentsdb', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Failed to connect to MongoDB:', err));

// // Define Student schema
// const studentSchema = new mongoose.Schema({
//   name: String,
//   rollNo: String,
// });

// const Student = mongoose.model('Student', studentSchema);

// // API route to add a student
// app.post('/api/students', async (req, res) => {
//   try {
//     const { name, rollNo } = req.body;
//     const newStudent = new Student({ name, rollNo });
//     await newStudent.save();
//     res.status(201).send('Student added successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error adding student');
//   }
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// Existing imports and configuration...

// API route to fetch all students

// app.get('/api/students', async (req, res) => {
//     try {
//       const students = await Student.find();
//       res.json(students);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error fetching students');
//     }
//   });
  
//   // API route to add a student (already implemented)
//   app.post('/api/students', async (req, res) => {
//     try {
//       const { name, rollNo } = req.body;
//       const newStudent = new Student({ name, rollNo });
//       await newStudent.save();
//       res.status(201).json(newStudent);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error adding student');
//     }
//   });
  