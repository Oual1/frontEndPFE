import React, { useState } from 'react';

const Student = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    {
      id: 1,
      name: 'John Doe',
      subjects: [
        { id: 1, name: 'Mathematics', grade: 18 },
        { id: 2, name: 'Science', grade: 14 },
        { id: 3, name: 'History', grade: 12 },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      subjects: [
        { id: 1, name: 'Mathematics', grade: 16 },
        { id: 2, name: 'Science', grade: 17 },
        { id: 3, name: 'History', grade: 13 },
      ],
    },
    {
      id: 3,
      name: 'Bob Johnson',
      subjects: [
        { id: 1, name: 'Mathematics', grade: 14 },
        { id: 2, name: 'Science', grade: 15 },
        { id: 3, name: 'History', grade: 18 },
      ],
    },
  ];

  const handleStudentClick = (studentId) => {
    setSelectedStudent(studentId);
  };

  return (
    <table style={{marginLeft:'25%'}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <React.Fragment key={student.id}>
            <tr>
              <td>{student.id}</td>
              <td>{student.name}</td>
            </tr>
            {selectedStudent === student.id && (
              <tr>
                <td colSpan="2">
                  <table>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.subjects.map((subject) => (
                        <tr key={subject.id}>
                          <td style={{ color: subject.grade < 15 ? 'red' : 'inherit' }}>
                            {subject.name}
                          </td>
                          <td>{subject.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {student.subjects.some((subject) => subject.grade < 15) && (
                    <div style={{ color: 'red' }}>Attention: Vous avez une note grave.</div>
                  )}
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="2">
                <button onClick={() => handleStudentClick(student.id)}>
                  {selectedStudent === student.id ? 'Hide Subjects' : 'Show Subjects'}
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Student;