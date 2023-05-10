import React, { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const students = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    identityNumber: '1234567890',
    class: 'A',
    grades: {
      math: 90,
      english: 85,
      history: 95,
      fg: 90,
      ath: 90,
      ma: 90,
      mater: 90
    },
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    identityNumber: '0987654321',
    class: 'B',
    grades: {
      math: 80,
      english: 90,
      history: 75,
      fg: 90,
      ath: 90,
      ma: 90,
      mater: 90
    },
  },
  // Ajoutez d'autres étudiants ici
];

function Student() {
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const handleStudentClick = (id) => {
    setSelectedStudentIds([...selectedStudentIds, id]);
  };

  const handleNotesClose = (id) => {
    setSelectedStudentIds(selectedStudentIds.filter((selectedId) => selectedId !== id));
  };

  return (
    <div style={{marginLeft: '20%'}}>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Identity Number</th>
            <th>Class</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <>
              <tr key={student.id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.identityNumber}</td>
                <td>{student.class}</td>
                <td>
                    <ArrowForwardIosIcon onClick={() => handleStudentClick(student.id)}></ArrowForwardIosIcon>
                  
                </td>
              </tr>
              {selectedStudentIds.includes(student.id) && (
                <tr key={`${student.id}-notes`}>
                  <td colSpan="5">
                    <h2>Notes for {student.firstName} {student.lastName}</h2>
                    <table>
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(student.grades).map(([subject, grade]) => (
                          <tr key={subject}>
                            <td>{subject}</td>
                            <td>{grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button onClick={() => handleNotesClose(student.id)}>Close</button>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;