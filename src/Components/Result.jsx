// import React, { useState, useEffect } from 'react';
// import ViewInternalMarks from './ViewInternalMarks';

// const Result = () => {
//   const [students, setStudents] = useState([]); // List of students
//   const [selectedRollNo, setSelectedRollNo] = useState(''); // Selected roll number
//   const [studentResult, setStudentResult] = useState(null); // Selected student's details
//     const [marks, setMarks] = useState([]); // State to store fetched marks
//     const [error, setError] = useState(''); // State to store error messages
//     const [loading, setLoading] = useState(true); // State to handle loading status
  
//     // Fetch marks data from the backend
//      // Fetch both internal and external marks data from the backend
//      useEffect(() => {
//        const fetchMarks = async () => {
//          try {
//            const [internalResponse, externalResponse] = await Promise.all([
//              // fetch('https://backendsampleclg.onrender.com/savemarks'),
//              fetch('http://localhost:3000/savemarks'),
//              // fetch('https://backendsampleclg.onrender.com/addExternalMark')
//              fetch('http://localhost:3000/addExternalMark')
//            ]);
   
//            if (!internalResponse.ok || !externalResponse.ok) {
//              throw new Error('Failed to fetch marks');
//            }
   
//            const internalMarks = await internalResponse.json();
//            const externalMarks = await externalResponse.json();
//              console.log("sudhakaruu :",externalMarks);
//            // Combine internal and external marks into one array
//            const combinedMarks = internalMarks.map((internal, index) => ({
//              ...internal,
//              externalMarks: externalMarks[index] ? externalMarks[index].externalMarks : 'N/A',
//            }));
   
//            setMarks(combinedMarks); // Set the combined data
//          } catch (err) {
//            console.error('Error fetching marks:', err.message);
//            setError('Failed to fetch marks data');
//          } finally {
//            setLoading(false); // Stop loading
//          }
//        };
   
//        fetchMarks();
//      }, []);
   

//   // Fetch the list of students on component mount
//   useEffect(() => {
//     fetch('http://localhost:3000/studentdetails')
//       .then((response) => response.json())
//       .then((data) => {
//         if (Array.isArray(data) && data.length > 0) {
//           setStudents(data); // Assuming data is an array of students
//         } else {
//           setError('No students found');
//         }
//       })
//       .catch((err) => {
//         setError('Failed to fetch student data');
//         console.error(err);
//       });
//   }, []);

//   // Handle roll number selection
//   const handleRollNoChange = (e) => {
//     const rollNo = e.target.value;
//     setSelectedRollNo(rollNo);

//     // Find the selected student based on roll number
//     const selectedStudent = students.find((student) => student.password === rollNo);
//     setStudentResult(selectedStudent || null);
//   };

//   // Calculate the result
//   const calculateResult = () => {
//     if (!studentResult) return null;

//     const internalPass = student.calculatedMarks > 19;
//     const externalPass = student.externalMarks > 21;
//     return internalPass && externalPass ? 'Pass' : 'Fail';
//   };

//   const result = calculateResult();

//   return (
//     <div>
      
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-center mb-6">Student Result Checker</h2>

//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {!error && (
//         <>
//           {/* Roll Number Dropdown */}
//           <div className="mb-6">
//             <label htmlFor="rollNo" className="block text-lg font-medium mb-2">
//               Select Roll Number
//             </label>
//             <select
//               id="rollNo"
//               value={selectedRollNo}
//               onChange={handleRollNoChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">-- Select Roll Number --</option>
//               {students.map((student) => (
//                 <option key={student.password} value={student.password}>
//                   {student.password} {/* Display roll number */}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Display Student Name in an input field */}
//           {studentResult && (
//             <div className="mb-4">
//               <label htmlFor="studentName" className="block text-lg font-medium mb-2">
//                 Student Name
//               </label>
//               <input
//                 id="studentName"
//                 type="text"
//                 value={studentResult.username}
//                 readOnly
//                 className="w-full p-2 border rounded bg-gray-100"
//               />
//             </div>
//           )}

//           {/* Display Result */}
//           {result && (
//             <div
//               className={`text-xl font-bold mt-6 text-center ${
//                 result === 'Pass' ? 'text-green-500' : 'text-red-500'
//               }`}
//             >
//               {result}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//     <ViewInternalMarks/>
//     </div>
//   );
// };

// export default Result;



import React, { useState, useEffect } from 'react';
import ViewInternalMarks from './ViewInternalMarks';

const Result = () => {
  const [students, setStudents] = useState([]); // List of students
  const [selectedRollNo, setSelectedRollNo] = useState(''); // Selected roll number
  const [studentResult, setStudentResult] = useState(null); // Selected student's details
  const [marks, setMarks] = useState([]); // State to store fetched marks
  const [error, setError] = useState(''); // State to store error messages
  const [loading, setLoading] = useState(true); // State to handle loading status

  // Fetch marks data from the backend
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const [internalResponse, externalResponse] = await Promise.all([
          fetch('https://backendsampleclg.onrender.com/savemarks'),
          fetch('https://backendsampleclg.onrender.com/addExternalMark')
          // fetch('http://localhost:3000/savemarks'),
          // fetch('http://localhost:3000/addExternalMark')
        ]);

        if (!internalResponse.ok || !externalResponse.ok) {
          throw new Error('Failed to fetch marks');
        }

        const internalMarks = await internalResponse.json();
        const externalMarks = await externalResponse.json();

        // Combine internal and external marks into one array
        const combinedMarks = internalMarks.map((internal, index) => ({
          ...internal,
          externalMarks: externalMarks[index] ? externalMarks[index].externalMarks : 'N/A',
        }));

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

  // Fetch the list of students on component mount
  useEffect(() => {
    fetch('https://backendsampleclg.onrender.com/studentdetails')
    // fetch('http://localhost:3000/studentdetails')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStudents(data); // Assuming data is an array of students
        } else {
          setError('No students found');
        }
      })
      .catch((err) => {
        setError('Failed to fetch student data');
        console.error(err);
      });
  }, []);

  // Handle roll number selection
  const handleRollNoChange = (e) => {
    const rollNo = e.target.value;
    setSelectedRollNo(rollNo);

    // Find the selected student based on roll number
    const selectedStudent = students.find((student) => student.password === rollNo);
    setStudentResult(selectedStudent || null);
  };

  // Calculate the result
  const calculateResult = () => {
    if (!studentResult || !marks.length) return null;
    console.log('Student Result:', studentResult); // Debugging student result
    console.log('Marks Data:', marks); // Debugging marks data
  
    const studentMarks = marks.find((mark) => mark.studentId === studentResult.password);

    if (!studentMarks) return 'Result not available'; // Handle case when marks are not available

    const internalPass = studentMarks.calculatedMarks >= 19;
    const externalPass = studentMarks.externalMarks !== 'N/A' && studentMarks.externalMarks >= 21;

    return internalPass && externalPass ? 'Pass' : 'Fail';
  };

  const result = calculateResult();

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Student Result Checker</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!error && (
          <>
            {/* Roll Number Dropdown */}
            <div className="mb-6">
              <label htmlFor="rollNo" className="block text-lg font-medium mb-2">
                Select Roll Number
              </label>
              <select
                id="rollNo"
                value={selectedRollNo}
                onChange={handleRollNoChange}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select Roll Number --</option>
                {students.map((student) => (
                  <option key={student.password} value={student.password}>
                    {student.password} {/* Display roll number */}
                  </option>
                ))}
              </select>
            </div>

            {/* Display Student Name in an input field */}
            {studentResult && (
              <div className="mb-4">
                <label htmlFor="studentName" className="block text-lg font-medium mb-2">
                  Student Name
                </label>
                <input
                  id="studentName"
                  type="text"
                  value={studentResult.username}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
            )}

            {/* Display Result */}
            {result && (
              <div
                className={`text-xl font-bold mt-6 text-center ${
                  result === 'Pass' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {result}
              </div>
            )}
          </>
        )}
      </div>
      <ViewInternalMarks />
    </div>
  );
};

export default Result;
