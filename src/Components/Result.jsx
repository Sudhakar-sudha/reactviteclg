import React, { useState, useEffect } from 'react';
import {ViewInternalMarks} from './ViewInternalMarks';

const Result = () => {
  const [students, setStudents] = useState([]); // List of students
  const [selectedRollNo, setSelectedRollNo] = useState(''); // Selected roll number
  const [studentResult, setStudentResult] = useState(null); // Selected student's details
  const [marks, setMarks] = useState([]); // State to store fetched marks
  const [error, setError] = useState(''); // State to store error messages
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [subjects, setSubjects] = useState([]); // State to store subjects data

  // Fetch marks and subjects data from the backend
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const [internalResponse, externalResponse] = await Promise.all([
          fetch('http://localhost:3000/savemarks'),
          fetch('http://localhost:3000/addExternalMark'),
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

  // Fetch the list of students and subjects on component mount
  useEffect(() => {
    fetch('http://localhost:3000/studentdetails')
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

    fetch('http://localhost:3000/subjectdetails')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSubjects(data); // Assuming data is an array of subjects
        } else {
          setError('No subjects found');
        }
      })
      .catch((err) => {
        setError('Failed to fetch subjects data');
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

    // Find the student's marks based on the student ID (password)
    const studentMarks = marks.filter((mark) => mark.studentId === studentResult.password);

    if (!studentMarks.length) return 'Result not available';

    // Create an array to store per-subject results
    const subjectResults = studentMarks.map((subject) => {
      const internalPass = subject.calculatedMarks >= 19;
      const externalPass = subject.externalMarks !== 'N/A' && subject.externalMarks >= 21;
      const total = subject.calculatedMarks + (subject.externalMarks !== 'N/A' ? subject.externalMarks : 0);
      const overallPass = internalPass && externalPass ? 'Pass' : 'Fail';

      return {
        subject: subject.name,
        result: overallPass,
        external: subject.externalMarks,
        internal: subject.calculatedMarks,
        total: total,
      };
    });

    // Determine overall result
    const overallResult = subjectResults.every((subject) => subject.result === 'Pass') ? 'Pass' : 'Fail';

    return {
      subjectResults,
      overallResult,
    };
  };

  // Call the function and get the result
  const result = calculateResult();

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Student Result Checker</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!error && (
          <>
            {/* Roll Number and Name in one row */}
            <div className="flex mb-6">
              <div className="w-1/2">
                <label htmlFor="rollNo" className="block text-lg font-medium mb-2">
                  Roll Number
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
                      {student.password}
                    </option>
                  ))}
                </select>
              </div>
              {studentResult && (
                <div className="w-1/2 pl-4">
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
            </div>

            {studentResult && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Subject-wise Results</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subjects.map((subject) => {
                    const subjectMark = marks.find(
                      (mark) => mark.subjectCode === subject.subjectCode && mark.studentId === studentResult.password
                    );
                    const internalMarks = subjectMark?.calculatedMarks || 0;
                    const externalMarks = subjectMark?.externalMarks || 0;
                    const internalPass = internalMarks >= 19;
                    const externalPass = externalMarks !== 'N/A' && externalMarks >= 21;
                    const total = internalMarks + (externalMarks !== 'N/A' ? externalMarks : 0);
                    const overallPass = internalPass && externalPass ? 'Pass' : 'Fail';

                    return (
                      <div key={subject.subjectCode} className="border p-4 rounded shadow">
                        <h4 className="text-md font-medium mb-2">{subject.name} ({subject.subjectCode})</h4>
                        <p>Internal Marks: {internalMarks}</p>
                        <p>External Marks: {externalMarks !== 'N/A' ? externalMarks : 'Not Available'}</p>
                        <p>Total Marks: {total}</p>
                        <p
                          className={`font-bold mt-2 ${
                            overallPass === 'Pass' ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          Result: {overallPass}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Display Result */}
            {result && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-center">
                  Overall Result:
                  <span
                    className={result.overallResult === 'Pass' ? 'text-green-500' : 'text-red-500'}
                  >
                    {result.overallResult}
                  </span>
                </h3>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-4">Detailed Results:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.subjectResults.map((subject, index) => (
                      <div key={index} className="border p-4 rounded shadow">
                        <h4 className="text-md font-medium mb-2">{subject.subject}</h4>
                        <p>Internal Marks: {subject.internal}</p>
                        <p>External Marks: {subject.external !== 'N/A' ? subject.external : 'Not Available'}</p>
                        <p>Total Marks: {subject.total}</p>
                        <p
                          className={`font-bold mt-2 ${
                            subject.result === 'Pass' ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          Result: {subject.result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
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


// import React, { useState, useEffect } from 'react';
// import ViewInternalMarks from './ViewInternalMarks';

// const Result = () => {
//   const [students, setStudents] = useState([]); // List of students
//   const [selectedRollNo, setSelectedRollNo] = useState(''); // Selected roll number
//   const [studentResult, setStudentResult] = useState(null); // Selected student's details
//   const [marks, setMarks] = useState([]); // State to store fetched marks
//   const [error, setError] = useState(''); // State to store error messages
//   const [loading, setLoading] = useState(true); // State to handle loading status
//   const [subjects, setSubjects] = useState([]); // State to store subjects data

//   // Fetch marks and subjects data from the backend
//   useEffect(() => {
//     const fetchMarks = async () => {
//       try {
//         const [internalResponse, externalResponse] = await Promise.all([
//           // fetch('https://backendsampleclg.onrender.com/savemarks'),
//           // fetch('https://backendsampleclg.onrender.com/addExternalMark')
//           fetch('http://localhost:3000/savemarks'),
//           fetch('http://localhost:3000/addExternalMark')
//         ]);

//         if (!internalResponse.ok || !externalResponse.ok) {
//           throw new Error('Failed to fetch marks');
//         }

//         const internalMarks = await internalResponse.json();
//         const externalMarks = await externalResponse.json();

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

//   // Fetch the list of students and subjects on component mount
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

//     fetch('http://localhost:3000/subjectdetails')
//       .then((response) => response.json())
//       .then((data) => {
//         if (Array.isArray(data) && data.length > 0) {
//           setSubjects(data); // Assuming data is an array of subjects
//         } else {
//           setError('No subjects found');
//         }
//       })
//       .catch((err) => {
//         setError('Failed to fetch subjects data');
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

//   // Calculate the result for a particular subject
//   const calculateSubjectResult = (subjectCode) => {
//     if (!studentResult || !marks.length) return 'Result not available';

//     const studentMarks = marks.find(
//       (mark) => mark.studentId === studentResult.password && mark.subjectCode === subjectCode
//     );

//     if (!studentMarks) return 'Result not available';

//     const internalPass = studentMarks.calculatedMarks >= 19;
//     const externalPass = studentMarks.externalMarks !== 'N/A' && studentMarks.externalMarks >= 21;

//     return internalPass && externalPass ? 'Pass' : 'Fail';
//   };

//   return (
//     <div>
//       <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center mb-6">Student Result Checker</h2>

//         {error && <p className="text-red-500 text-center">{error}</p>}

//         {!error && (
//           <>
//             {/* Roll Number and Name in one row */}
//             <div className="flex mb-6">
//               <div className="w-1/2">
//                 <label htmlFor="rollNo" className="block text-lg font-medium mb-2">
//                   Roll Number
//                 </label>
//                 <select
//                   id="rollNo"
//                   value={selectedRollNo}
//                   onChange={handleRollNoChange}
//                   className="w-full p-2 border rounded"
//                 >
//                   <option value="">-- Select Roll Number --</option>
//                   {students.map((student) => (
//                     <option key={student.password} value={student.password}>
//                       {student.password} {/* Display roll number */}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {studentResult && (
//                 <div className="w-1/2 pl-4">
//                   <label htmlFor="studentName" className="block text-lg font-medium mb-2">
//                     Student Name
//                   </label>
//                   <input
//                     id="studentName"
//                     type="text"
//                     value={studentResult.username}
//                     readOnly
//                     className="w-full p-2 border rounded bg-gray-100"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Subject Name and Subject Code in one row */}
//             {studentResult && (
//               <div className="flex mb-6">
//                 {subjects.map((subject) => (
//                   <div key={subject.code} className="w-1/2">
//                     <label className="block text-lg font-medium mb-2">
//                       {subject.name} ({subject.code})
//                     </label>
//                     <input
//                       type="text"
//                       value={calculateSubjectResult(subject.code)}
//                       readOnly
//                       className="w-full p-2 border rounded bg-gray-100"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       <ViewInternalMarks />
//     </div>
//   );
// };

// export default Result;
