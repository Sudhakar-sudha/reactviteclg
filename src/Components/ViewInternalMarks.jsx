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
//           fetch('https://backendsampleclg.onrender.com/savemarks'),
//           fetch('https://backendsampleclg.onrender.com/addExternalMark')
//           // fetch('http://localhost:3000/savemarks'),
//           // fetch('http://localhost:3000/addExternalMark')
//         ]);

//         if (!internalResponse.ok || !externalResponse.ok) {
//           throw new Error('Failed to fetch marks');
//         }

//         const internalMarks = await internalResponse.json();
//         const externalMarks = await externalResponse.json();

//         // Create a mapping of external marks by studentId
//         const externalMarksMap = externalMarks.reduce((map, student) => {
//           map[student.rollNo] = student.externalMarks;
//           return map;
//         }, {});

//         // Combine internal and external marks by studentId
//         const combinedMarks = internalMarks.map(internal => {
//           const externalMarksForStudent = externalMarksMap[internal.studentId] || '0'; // Default to '0' if not available
//           return {
//             ...internal,
//             externalMarks: externalMarksForStudent
//           };
//         });

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
//     const internalMarksNumber = parseFloat(internalMarks) || 0; // Convert to number or default to 0
//     const externalMarksNumber = parseFloat(externalMarks) || 0; // Convert to number or default to 0
//     return internalMarksNumber + externalMarksNumber; // Perform arithmetic addition
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
  const [marks, setMarks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarksAndSubjects = async () => {
      try {
        const [internalResponse, externalResponse, subjectsResponse, studentResponse] = await Promise.all([
          fetch('http://localhost:3000/savemarks'),
          fetch('http://localhost:3000/addExternalMark'),
          fetch('http://localhost:3000/subjectdetails'),
          fetch('http://localhost:3000/studentdetails'),
        ]);

        if (!internalResponse.ok || !externalResponse.ok || !subjectsResponse.ok || !studentResponse.ok) {
          throw new Error('Failed to fetch marks or subjects');
        }

        const internalMarks = await internalResponse.json();
        const externalMarks = await externalResponse.json();
        const subjectsData = await subjectsResponse.json();
        const students = await studentResponse.json();

        const combinedMarks = students
        .filter((student) => {
          const isBalan = student.username === "Balan";
          if (isBalan) console.log("Student matched:", student);
          return isBalan;
        })
        .map((student) => {
          const internal = internalMarks.find((mark) => mark.rollNO === student.rollNo) || {};
          const external = externalMarks.find((mark) => mark.studentId === student.studentId) || {};
      
          const calinternal = parseFloat(internal.calculatedMarks) || 0;
          const calexternal = parseFloat(external.externalMarks) || 0;
      
          console.log("Internal marks object:", internal);
          console.log("External marks object:", external);
          console.log("Calculated Internal Marks:", calinternal);
          console.log("Calculated External Marks:", calexternal);
      
          return {
            studentId: student.password,
            studentName: student.username,
            subjectMarks: subjectsData
              .filter((subject) => {
                const isJava = subject.name === "Java";
                if (isJava) console.log("Subject matched:", subject);
                return isJava;
              })
              .map((subject) => ({
                subjectCode: subject.code,
                subjectName: subject.name,
                internalMarks: calinternal,
                externalMarks: calexternal,
              })),
          };
        });
      
      console.log("Combined Marks:", combinedMarks);
      
        setMarks(combinedMarks);
        setSubjects(subjectsData);
      } catch (err) {
        console.error('Error fetching marks or subjects:', err.message);
        setError('Failed to fetch marks or subjects data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMarksAndSubjects();
  }, []);

  const calculateTotalMarks = (internalMarks, externalMarks) => {
    const internal = parseFloat(internalMarks) || 0;
    const external = parseFloat(externalMarks) || 0;
    return internal + external;
  };

  const calculateGrade = (totalMarks) => {
    if (totalMarks < 40) return 'Arrear';
    if (totalMarks < 60) return 'Second Class';
    if (totalMarks < 80) return 'First Class';
    return 'First Class with Distinction';
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
              <th rowSpan={2} className="border border-gray-300 p-2 bg-gray-100">Roll No</th>
              <th rowSpan={2} className="border border-gray-300 p-2 bg-gray-100">Student Name</th>
              {subjects.map((subject) => (
                <th key={subject.code} colSpan={2} className="border border-gray-300 p-2 bg-gray-100 text-center">
                  {subject.name} ({subject.code})
                </th>
              ))}
              <th rowSpan={2} className="border border-gray-300 p-2 bg-gray-100">Total Marks</th>
              <th rowSpan={2} className="border border-gray-300 p-2 bg-gray-100">Grade</th>
            </tr>
            <tr>
              {subjects.map((subject) => (
                <>
                  <th key={`${subject.code}-internal`} className="border border-gray-300 p-2 bg-gray-100 text-center">Internal</th>
                  <th key={`${subject.code}-external`} className="border border-gray-300 p-2 bg-gray-100 text-center">External</th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {marks.map((student) => {
              let totalMarks = 0;

              const subjectMarks = student.subjectMarks.map((subject) => {
                const internal = parseFloat(subject.internalMarks) || 0;
                const external = parseFloat(subject.externalMarks) || 0;
                const subjectTotal = calculateTotalMarks(internal, external);
                totalMarks += subjectTotal;

                return (
                  <>
                    <td key={`${subject.subjectCode}-internal`} className="border border-gray-300 p-2 text-center">{internal}</td>
                    <td key={`${subject.subjectCode}-external`} className="border border-gray-300 p-2 text-center">{external}</td>
                  </>
                );
              });

              const grade = calculateGrade(totalMarks);

              return (
                <tr key={student.studentId}>
                  <td className="border border-gray-300 p-2 text-center">{student.studentId}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.studentName}</td>
                  {subjectMarks}
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
