import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './consultation.css';
import axios from 'axios' ;
import SearchIcon  from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import{ IconButton } from '@mui/material';
import Select from 'react-select';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateConsultation = () => {
  const [hideAj, setHideAj] = useState(true);
 const list=[];
 const showToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT
  });
};
  const [currentDate, setCurrentDate] = useState('');
 
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [examList, setExamList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [userName, setUserName] = useState(0);
  const [selectedExams, setSelectedExams] = useState([]);
  const [add, setAdd] = useState({
    date: null,
    type: null,
  });

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
         
          const roleResponse = await axios.get(`http://localhost:8080/api/v1/auth/user-name`, {
            headers: { Authorization: `${token}` }
          });
          
          
          setUserName(roleResponse.data);
          
          
          
         
        }else {
          // Gérer le cas où le token est manquant
          setUserName(null)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du mail de l\'utilisateur:', error);
        // Gérez l'erreur ici
        setUserName(null);
        
      }
    };
    fetchUserName();
  }, []);
  
  const addConsultation = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/invoices/add-consultations/${userName}`, {
        patient: selectedPatient,
        date: currentDate,
        motif: add.motif,
        type: add.type,
        examList: getSelectedPrestations(),
        total: calculateTotal(),
      });

      console.log(response.data);
      setAdd({ date: '', type: '', typeConsultation: '' });
      showToast('success', 'Consultation ajoutée avec succès');
    } catch (error) {
      console.error(error);
      showToast('error', 'Une erreur s\'est produite lors de l\'ajout de la consultation');
    }
  };
  function getSelectedPrestations(){
    selectedExams.map((exam)=>{
      const prest= examList.find((item)=>item.code=== exam.value);
      list.push(prest);
      
    })
    return list;
  }
 


  
  function getAllPrestations(){
    axios.get("http://localhost:8080/invoices/exams").then(
        response =>{
            
            setExamList(response.data)

            console.log(response.data);
            
            
        })
}


function getAllPatients(){
  axios.get("http://localhost:8080/invoices/patients").then(
      response =>{
          
          setPatientList(response.data)
          console.log(response.data);
          
          
      })
}
const handlePatientSelect = (id) => {
  const patient = patientList.find((p) => p.id === id);
  console.log(patient)
  if (patient) {
    setSelectedPatient(patient);
  } else {
    setSelectedPatient(null);
  }
};
const calculateTotal = () => {
  let total = 0;
  selectedExams.forEach((exam) => {
    const selectedExam = examList.find((item) => item.code === exam.value);
    if (selectedExam) {
      total += selectedExam.cost;
    }
  });

  return total;
};


  useEffect(()=>{
    getAllPatients();
    getAllPrestations();
    setCurrentDate(moment().format('YYYY-MM-DD'));
    },[]
  )
  
  console.log(add)

  const handleExamSelection = (selectedOptions) => {
    // Tri des examens par code
    const sortedExams = selectedOptions.sort((a, b) => a.code - b.code);
    setSelectedExams(sortedExams);
  };


  return (

    <div className="card card-warning" style={{ width: '80%', margin: '3% auto',maxHeight: '700px', overflowY: 'auto'}}>
      <p-toast></p-toast>
      <p-toast position="top-right" key="tl"></p-toast>
      <div className="card-header" style={{backgroundColor:'#29D8AD'}}>
        <h3 className="card-title" >Ajouter Consultation</h3>
      </div>

      <div className="card-body" style={{ height:"100%", overflowY:'auto'}} >
        <form onSubmit={addConsultation} hidden={!hideAj}>
        <div className='form-group'>
        <p>Patient:
        <InputBase sx={{ ml: 2, flex: 1, borderRadius: '4px', border: '1px solid #DAD7D8'}} placeholder="Enter NISS Patient"
         type="text"
       
         onChange={(e) => handlePatientSelect(parseInt(e.target.value))}
          />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
        </p>
        {selectedPatient ? (
        <div style={{ display: 'flex'}}>
         
         <div className="form-group" style={{ marginRight: '30px' }}>
    <label className="col-form-label" >Nom:</label>
    <input type="text" className="form-control" id="no" placeholder="Entrer ..." required="required" name="date" value={selectedPatient.firstName} readOnly onChange={(e) => setAdd({ ...add, nom: e.target.value })} disabled={!hideAj} />
  </div>
  <div className="form-group" style={{ marginRight: '30px' }}>
    <label className="col-form-label" >Prénom:</label>
    <input type="text" className="form-control" id="no" placeholder="Entrer ..." required="required" name="date" value={selectedPatient.lastName} readOnly onChange={(e) => setAdd({ ...add, prenom: e.target.value })} disabled={!hideAj} />
  </div>
  <div className="form-group">
    <label className="col-form-label" >Date de Naissance:</label>
    <input type="Date" className="form-control" id="no" placeholder="Entrer ..." required="required" name="date" value={selectedPatient.dateBirth} readOnly onChange={(e) => setAdd({ ...add, dateNaissance: e.target.value })} disabled={!hideAj} />
  </div>
         
        </div>
      ) : (
        <div></div>
      )}
      </div>
      <hr style={{ borderTop: '0.5px solid', backgroundColor :"#2AC78C"}} />
      <div style={{ display: 'flex'}}>
          <div className="form-group"  >
            <label className="col-form-label"  > Date Consultation:</label>
            <input type="text" className="form-control" id="no" placeholder="Entrer ..." required="required" name="date" value={currentDate} readOnly onChange={(e) => setAdd({ ...add, date: e.target.value })} />
          </div>
          </div>
          <div className="form-group" >
            <label className="col-form-label"> Motif:</label>
            <input type="text" className="form-control" id="pr5" placeholder="Entrer le raison de conusltation..." required="required" name="motif" onChange={(e) => setAdd({ ...add, motif: e.target.value })} />
          </div>

          <div className="form-group">

            <br></br>
  <label className="col-form-label">Type de consultation:</label>
  <div>
    <br></br>
    <label className="radio-label" style={{ marginRight: '30px' }}>
      <input type="radio" name="type" value="Cabinet"  onChange={(e) => setAdd({ ...add, type: e.target.value })} />
      Cabinet
    </label>
    <label className="radio-label">
      <input type="radio" name="type" value="Domicile" onChange={(e) => setAdd({ ...add, type: e.target.value })} />
      Domicile
    </label>
  </div>
</div>
<br></br>
<hr style={{ borderTop: '0.5px solid', backgroundColor :"#2AC78C"}} />

<div className="form-group">
            <label className="col-form-label">Liste de Prestations:</label>
            <div style={{ width: '100%' }}>
              <Select
                isMulti
                placeholder="Sélectionner prestation(s)"
                value={selectedExams}
                onChange={handleExamSelection}
                options={examList?.map(exam => ({
                  value: exam.code,
                  label: `${exam.code}-${exam.description}`
                }))}
              />
            </div>
          </div>
          <div>
            <br></br>
          <label className="col-form-label">Prestations Sélectionnées:</label>
  {selectedExams && selectedExams.length > 0 ? (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #DAD7D8', padding: '8px', color:'#29D8AD', textAlign:'center' }}>Code</th>
          <th style={{ border: '1px solid #DAD7D8', padding: '8px', color:'#29D8AD', textAlign:'center' }}>Description</th>
          <th style={{ border: '1px solid #DAD7D8', padding: '8px', color:'#29D8AD', textAlign:'center' }}>prix</th>
        </tr>
      </thead>
      <tbody>
        {selectedExams.map((exam) => (
          <tr key={exam.value}>
            <td style={{ border: '1px solid #DAD7D8', padding: '8px' }}>{exam.value}</td>
            <td style={{ border: '1px solid #DAD7D8', padding: '8px' }}>  {examList.find((item) => item.code === exam.value)?.description}</td>
            <td style={{ border: '1px solid #DAD7D8', padding: '8px' }}>
              {examList.find((item) => item.code === exam.value)?.cost}€
            </td>
          </tr>
          
        ))}
       
      </tbody>
    </table>
  ) : (
    <p></p>
  )}
  
</div>
<br></br>
<hr style={{ borderTop: '0.5px solid', backgroundColor :"#2AC78C"}} />
<div className="form-group" style={{ marginLeft: '800px' }}>
    <label className="col-form-label" >Total:</label>
    <input type="text" className="form-control" id="no" placeholder="Entrer ..." required="required" name="date" value={calculateTotal().toString()+'€'} readOnly  disabled={!hideAj} />
  </div>




  <br></br> 
  <br></br>


  <Button variant="contained" style={{marginLeft:"90%", backgroundColor:"#1BDA86"}} type="submit" >Ajouter</Button>


           </form>

       

      </div>
    </div>
 
  );
};

export default CreateConsultation;
