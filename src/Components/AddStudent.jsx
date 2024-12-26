

import React, { useState, useEffect } from "react";

const AddStudent = () => {
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // const response = await fetch("http://localhost:3000/studentdetails");
        const response = await fetch("https://backendsampleclg.onrender.com/studentdetails");
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = { username: studentName, password: rollNo };

    try {
      if (editId) {
        // Update student
        // const response = await fetch(`http://localhost:3000/studentdetails/${editId}`, {
          const response = await fetch(`https://backendsampleclg.onrender.com/studentdetails/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });

        if (response.ok) {
          setMessage("Student updated successfully!");
          setStudents((prev) =>
            prev.map((student) =>
              student._id === editId ? { ...student, ...studentData } : student
            )
          );
          setEditId(null);
        } else {
          setMessage("Failed to update student.");
        }
      } else {
        // Add student
        // const response = await fetch("http://localhost:3000/studentdetails", {
          const response = await fetch("https://backendsampleclg.onrender.com/studentdetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });

        if (response.ok) {
          const newStudent = await response.json();
          setMessage("Student added successfully!");
          setStudents((prev) => [...prev, newStudent]);
        } else {
          setMessage("Failed to add student.");
        }
      }
      setStudentName("");
      setRollNo("");
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    }
  };

  const handleEdit = (student) => {
    setStudentName(student.username);
    setRollNo(student.password);
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      // const response = await fetch(`http://localhost:3000/studentdetails/${id}`, {
        const response = await fetch(`https://backendsampleclg.onrender.com/studentdetails/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStudents((prev) => prev.filter((student) => student._id !== id));
        setMessage("Student deleted successfully!");
      } else {
        setMessage("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pl-11 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">{editId ? "Edit Student" : "Add Student"}</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Roll No</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter roll number"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-lg text-green-500">{message}</p>}

      {/* Table Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Students List</h2>
      {students.length > 0 ? (
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-t">
                <td className="p-3">{student.username}</td>
                <td className="p-3">{student.password}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No students added yet.</p>
      )}
    </div>
  );
};

export default AddStudent;
