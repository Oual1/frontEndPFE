import React, { useState } from 'react';

const Student = () => {
  const students = [
    { nom: 'Doe', prenom: 'John', classe: 'A', notes: [15, 18, 20] },
    { nom: 'Smith', prenom: 'Alice', classe: 'B', notes: [12, 16, 14] },
    // Ajoutez d'autres étudiants avec leurs données ici
  ];

  const Student = ({ student }) => {
    const [showNotes, setShowNotes] = useState(false);

    const toggleNotes = () => {
      setShowNotes(!showNotes);
    };

    return (
      <div style={{marginLeft:"20%"}}>
        <h3>{student.nom} {student.prenom}</h3>
        <p>Classe: {student.classe}</p>
        <button onClick={toggleNotes}>Voir les notes</button>
        {showNotes && (
          <table>
            <thead>
              <tr>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {student.notes.map((note, index) => (
                <tr key={index}>
                  <td>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div style={{marginLeft:"20%"}}>
      <h1>Liste des étudiants</h1>
      {students.map((student, index) => (
        <Student key={index} student={student} />
      ))}
    </div>
  );
};

export default Student;