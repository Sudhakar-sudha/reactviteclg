import React, { useState, useEffect } from "react";

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("https://backendsampleclg.onrender.com/subjectdetails");
        if (!response.ok) throw new Error("Failed to fetch subjects");
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subjectData = { name: subjectName, code: subjectCode };

    try {
      if (editId) {
        // Update subject
        const response = await fetch(`https://backendsampleclg.onrender.com/subjectdetails/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subjectData),
        });

        if (response.ok) {
          setMessage("Subject updated successfully!");
          setSubjects((prev) =>
            prev.map((subject) =>
              subject._id === editId ? { ...subject, ...subjectData } : subject
            )
          );
          setEditId(null);
        } else {
          setMessage("Failed to update subject.");
        }
      } else {
        // Add subject
        const response = await fetch("https://backendsampleclg.onrender.com/subjectdetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subjectData),
        });

        if (response.ok) {
          const newSubject = await response.json();
          setMessage("Subject added successfully!");
          setSubjects((prev) => [...prev, newSubject]);
        } else {
          setMessage("Failed to add subject.");
        }
      }
      setSubjectName("");
      setSubjectCode("");
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    }
  };

  const handleEdit = (subject) => {
    setSubjectName(subject.name);
    setSubjectCode(subject.code);
    setEditId(subject._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://backendsampleclg.onrender.com/subjectdetails/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSubjects((prev) => prev.filter((subject) => subject._id !== id));
        setMessage("Subject deleted successfully!");
      } else {
        setMessage("Failed to delete subject.");
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pl-11 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">{editId ? "Edit Subject" : "Add Subject"}</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Subject Name</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Enter subject name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Subject Code</label>
          <input
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            placeholder="Enter subject code"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          {editId ? "Update Subject" : "Add Subject"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-lg text-green-500">{message}</p>}

      {/* Table Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Subjects List</h2>
      {subjects.length > 0 ? (
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Subject Name</th>
              <th className="p-3">Subject Code</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id} className="border-t">
                <td className="p-3">{subject.name}</td>
                <td className="p-3">{subject.code}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(subject)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subject._id)}
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
        <p className="text-gray-500 mt-4">No subjects added yet.</p>
      )}
    </div>
  );
};

export default AddSubject;
