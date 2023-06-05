import React, { useState } from 'react';

const ExamSearchBar = ({ examList, onExamSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExams, setFilteredExams] = useState([]);
  const [hoveredExam, setHoveredExam] = useState(null);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredExams = examList.filter((exam) =>
      exam.code.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredExams(filteredExams);
  };

  const handleExamSelect = (exam) => {
    onExamSelect(exam);
    setSearchTerm('');
    setFilteredExams([]);
  };

  const handleExamHover = (exam) => {
    setHoveredExam(exam);
  };

  const clearHoveredExam = () => {
    setHoveredExam(null);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter exam code"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {filteredExams.length > 0 && searchTerm.length > 0 && (
        <div
          className="exam-menu"
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            border: '1px solid white',
            borderRadius: '0px',
            marginTop: '5px',
            width: '12.5%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add box shadow
          }}
        >
          {filteredExams.map((exam) => (
            <div
              key={exam.code}
              onClick={() => handleExamSelect(exam)}
              onMouseEnter={() => handleExamHover(exam)}
              onMouseLeave={clearHoveredExam}
              className="exam-menu-item"
              style={{
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: hoveredExam === exam ? '#27E09A' : 'transparent',
              }}
            >
              {exam.code} - {exam.coordinates}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CreateConsultation = () => {
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const examList = [
    { code: 'EX1', name: 'Exam 1', coordinates: 'Coord 1' },
    { code: 'EX2', name: 'Exam 2', coordinates: 'Coord 2' },
    { code: 'EX3', name: 'Exam 3', coordinates: 'Coord 3' },
  ];
  const patientList = [
    { id: 'P1', name: 'John Doe', coordinates: 'Patient Coord 1' },
    { id: 'P2', name: 'Jane Smith', coordinates: 'Patient Coord 2' },
    { id: 'P3', name: 'Mike Johnson', coordinates: 'Patient Coord 3' },
  ];

  const handleExamSelect = (exam) => {
    setSelectedExams((prevExams) => [...prevExams, exam]);
  };

  const handlePatientSelect = (id) => {
    const patient = patientList.find((p) => p.id === id);
    if (patient) {
      setSelectedPatient(patient);
    } else {
      setSelectedPatient(null);
    }
  };

  return (
    <div>
      <h1>Create Consultation</h1>
      <ExamSearchBar examList={examList} onExamSelect={handleExamSelect} />
      <div>
        <h2>Selected Exams</h2>
        {selectedExams.map((exam) => (
          <div key={exam.code}>
            <div>{exam.code}</div>
            <div>Coordinates: {exam.coordinates}</div>
          </div>
        ))}
      </div>
      <div>
        <h2>Search Patient by ID</h2>
        <input
          type="text"
          placeholder="Enter patient ID"
          onChange={(e) => handlePatientSelect(e.target.value)}
        />
        {selectedPatient ? (
          <div>
            <h3>Selected Patient</h3>
            <div>ID: {selectedPatient.id}</div>
            <div>Name: {selectedPatient.name}</div>
            <div>Coordinates: {selectedPatient.coordinates}</div>
          </div>
        ) : (
          <div>No patient selected</div>
        )}
      </div>
    </div>
  );
};

export default CreateConsultation;



























/* import React, { useState } from 'react';

const ExamSearchBar = ({ examList, onExamSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExams, setFilteredExams] = useState([]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredExams = examList.filter((exam) =>
      exam.code.startsWith(searchTerm)
    );
    setFilteredExams(filteredExams);
  };

  const handleExamSelect = (exam) => {
    onExamSelect(exam);
    setSearchTerm('');
    setFilteredExams([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter exam code"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="exam-list">
        {filteredExams.map((exam) => (
          <div
            key={exam.code}
            className="exam-item"
            onClick={() => handleExamSelect(exam)}
          >
            <span className="exam-code">{exam.code}</span>
            <span className="exam-coordinates">{exam.coordinates}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CreateConsultation = () => {
  const [selectedExams, setSelectedExams] = useState([]);
  const examList = [
    { code: 'EX1', name: 'Exam 1', coordinates: 'Coord 1' },
    { code: 'EX2', name: 'Exam 2', coordinates: 'Coord 2' },
    { code: 'EX3', name: 'Exam 3', coordinates: 'Coord 3' },
  ];

  const handleExamSelect = (exam) => {
    setSelectedExams((prevExams) => [...prevExams, exam]);
  };

  return (
    <div>
      <h1>Create Consultation</h1>
      <ExamSearchBar examList={examList} onExamSelect={handleExamSelect} />
      <div className="selected-exams">
        <h2>Selected Exams</h2>
        {selectedExams.map((exam) => (
          <div key={exam.code} className="selected-exam">
            <div>{exam.code}</div>
            <div>Coordinates: {exam.coordinates}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateConsultation; */