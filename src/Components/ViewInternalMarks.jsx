


// import React, { useEffect, useState } from 'react';

// const ViewInternalMarks = () => {
//   const [marks, setMarks] = useState([]); // State to store fetched marks data
//   const [error, setError] = useState(''); // State to store error messages
//   const [loading, setLoading] = useState(true); // State to handle loading status

//   // Fetch both internal and external marks data from the backend
//   useEffect(() => {
//     const fetchMarks = async () => {
//       try {
//         const [internalResponse, externalResponse] = await Promise.all([
//           fetch('http://localhost:3000/savemarks'),
//           fetch('http://localhost:3000/addExternalMark')
//         ]);

//         if (!internalResponse.ok || !externalResponse.ok) {
//           throw new Error('Failed to fetch marks');
//         }

//         const internalMarks = await internalResponse.json();
//         const externalMarks = await externalResponse.json();
//         console.log("sudhakaruu :", externalMarks);

//         // Combine internal and external marks into one array
//         const combinedMarks = internalMarks.map((internal, index) => ({
//           ...internal,
//           externalMarks: externalMarks[index] ? externalMarks[index].externalMarks : 'N/A',
//         }));

//         setMarks(combinedMarks); // Set the combined data
//       } catch (err) {
//         console.error('Error fetching marks:', err.message);
//         setError('Failed to fetch marks data');
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchMarks();
//   }, []);

//   // Function to calculate total marks
//   const calculateTotalMarks = (internalMarks, externalMarks) => {
//     const externalMarksNumber = Number(externalMarks);
//     return internalMarks + (isNaN(externalMarksNumber) ? 0 : externalMarksNumber);
//   };

//   // Function to calculate grade based on total marks
//   const calculateGrade = (totalMarks) => {
//     if (totalMarks < 40) return 'Arrear';
//     if (totalMarks >= 40 && totalMarks < 60) return 'Second Class';
//     if (totalMarks >= 60 && totalMarks < 80) return 'First Class';
//     if (totalMarks >= 80) return 'First Class with Distinction';
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-center mb-6">Marks List</h2>

//       {loading && <p className="text-center text-gray-500">Loading...</p>}

//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {!loading && !error && marks.length === 0 && (
//         <p className="text-center text-gray-500">No marks data available.</p>
//       )}

//       {!loading && !error && marks.length > 0 && (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2 bg-gray-100">Roll No</th>
//               <th className="border border-gray-300 p-2 bg-gray-100">Student Name</th>
//               <th className="border border-gray-300 p-2 bg-gray-100">Internal Marks (out of 40)</th>
//               <th className="border border-gray-300 p-2 bg-gray-100">External Marks</th>
//               <th className="border border-gray-300 p-2 bg-gray-100">Total Marks</th>
//               <th className="border border-gray-300 p-2 bg-gray-100">Grade</th>
//             </tr>
//           </thead>
//           <tbody>
//             {marks.map((student, index) => {
//               const totalMarks = calculateTotalMarks(student.calculatedMarks, student.externalMarks);
//               const grade = calculateGrade(totalMarks);

//               return (
//                 <tr key={index}>
//                   <td className="border border-gray-300 p-2 text-center">{student.studentId}</td>
//                   <td className="border border-gray-300 p-2 text-center">{student.studentName}</td>
//                   <td className="border border-gray-300 p-2 text-center">{student.calculatedMarks}</td>
//                   <td className="border border-gray-300 p-2 text-center">{student.externalMarks}</td>
//                   <td className="border border-gray-300 p-2 text-center">{totalMarks}</td>
//                   <td className="border border-gray-300 p-2 text-center">{grade}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewInternalMarks;


import React, { useEffect, useState } from 'react';

const ViewInternalMarks = () => {
  const [marks, setMarks] = useState([]); // State to store fetched marks data
  const [error, setError] = useState(''); // State to store error messages
  const [loading, setLoading] = useState(true); // State to handle loading status

  // Fetch both internal and external marks data from the backend
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const [internalResponse, externalResponse] = await Promise.all([
          fetch('http://localhost:3000/savemarks'),
          fetch('http://localhost:3000/addExternalMark')
        ]);

        if (!internalResponse.ok || !externalResponse.ok) {
          throw new Error('Failed to fetch marks');
        }

        const internalMarks = await internalResponse.json();
        const externalMarks = await externalResponse.json();

        // Create a mapping of external marks by studentId
        const externalMarksMap = externalMarks.reduce((map, student) => {
          map[student.studentId] = student.externalMarks;
          return map;
        }, {});

        // Combine internal and external marks by studentId
        const combinedMarks = internalMarks.map(internal => {
          const externalMarksForStudent = externalMarksMap[internal.studentId] || '0'; // Default to '0' if not available
          return {
            ...internal,
            externalMarks: externalMarksForStudent
          };
        });

        setMarks(combinedMarks); // Set the combined data
      } catch (err) {
        console.error('Error fetching marks:', err.message);
        setError('Failed to fetch marks data');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMarks();
  }, []);

  // Function to calculate total marks
  const calculateTotalMarks = (internalMarks, externalMarks) => {
    const externalMarksNumber = Number(externalMarks); // Convert external marks to a number
    return internalMarks + (isNaN(externalMarksNumber) ? 0 : externalMarksNumber); // Use 0 if not a valid number
  };

  // Function to calculate grade based on total marks
  const calculateGrade = (totalMarks) => {
    if (totalMarks < 40) return 'Arrear';
    if (totalMarks >= 40 && totalMarks < 60) return 'Second Class';
    if (totalMarks >= 60 && totalMarks < 80) return 'First Class';
    if (totalMarks >= 80) return 'First Class with Distinction';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Marks List</h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && marks.length === 0 && (
        <p className="text-center text-gray-500">No marks data available.</p>
      )}

      {!loading && !error && marks.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-100">Roll No</th>
              <th className="border border-gray-300 p-2 bg-gray-100">Student Name</th>
              <th className="border border-gray-300 p-2 bg-gray-100">Internal Marks (out of 40)</th>
              <th className="border border-gray-300 p-2 bg-gray-100">External Marks</th>
              <th className="border border-gray-300 p-2 bg-gray-100">Total Marks</th>
              <th className="border border-gray-300 p-2 bg-gray-100">Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((student, index) => {
              const totalMarks = calculateTotalMarks(student.calculatedMarks, student.externalMarks);
              const grade = calculateGrade(totalMarks);

              return (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-center">{student.studentId}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.studentName}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.calculatedMarks}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.externalMarks}</td>
                  <td className="border border-gray-300 p-2 text-center">{totalMarks}</td>
                  <td className="border border-gray-300 p-2 text-center">{grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewInternalMarks;
