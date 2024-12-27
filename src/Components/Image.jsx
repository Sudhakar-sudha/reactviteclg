import React, { useState } from "react";
import axios from "axios";

function Image() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    picture: null,
  });

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, picture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    if (formData.picture) {
      data.append("picture", formData.picture);
    }

    try {
      const res = await axios.post("https://project-tptk.onrender.com/formdata/api/formdata", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data.message || "Form submitted successfully!");
      // Optionally reset the form state here if you want to clear the form after submission
      // setFormData({ name: "", age: "", picture: null });
    } catch (error) {
      setResponse(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Upload Your Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="age" className="block text-lg font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="picture" className="block text-lg font-medium text-gray-700 mb-2">
              Picture
            </label>
            <input
              type="file"
              name="picture"
              id="picture"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:border-0 file:rounded-lg file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition duration-300 ease-in-out"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        {response && (
          <p className="mt-6 text-center text-lg text-gray-600">
            {response}
          </p>
        )}
      </div>
    </div>
  );
}

export default Image;
