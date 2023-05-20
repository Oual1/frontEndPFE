import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Student = () => {
  const classList = [
    {
      id: 1,
      name: 'Classe A',
      students: [
        { id: 1, firstName: 'Étudiant 1', lastName: 'Nom 1', age: 20, grades: [10, 15, 12] },
        { id: 2, firstName: 'Étudiant 2', lastName: 'Nom 2', age: 22, grades: [14, 16, 18] },
        { id: 3, firstName: 'Étudiant 3', lastName: 'Nom 3', age: 21, grades: [13, 17, 11] }
      ]
    },
    // ... Ajouter d'autres classes et étudiants ici ...
  ];

  const generatePDF = (classItem) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Liste des étudiants - ${classItem.name}`, 10, 10);

    const tableData = classItem.students.map((student) => {
      const { firstName, lastName, age, grades } = student;
      return [firstName, lastName, age, grades.join(', ')];
    });

    doc.autoTable({
      startY: 20,
      head: [['Prénom', 'Nom', 'Âge', 'Notes']],
      body: tableData
    });

    doc.save(`liste-etudiants-${classItem.name}.pdf`);
  };

  return (
    <div>
      <h2>Liste des classes</h2>
      {classList.map((classItem) => (
        <button key={classItem.id} onClick={() => generatePDF(classItem)}>
          {classItem.name}
        </button>
      ))}
    </div>
  );
};
export default Student;