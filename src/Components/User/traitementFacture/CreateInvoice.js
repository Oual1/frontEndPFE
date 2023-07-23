import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Capture from '../../../source/images/Capture.PNG';
import { useParams } from 'react-router-dom';
const FactureComponent = () => {
    const [factureData, setFactureData] = useState(null);
    const [medecin, setMedecin]=useState(null);

    const { id, userName }=useParams();
   console.log(userName)
    useEffect(() => {
        
        
        fetchFactureData();
      
    }, []);
   
        
       
    
    

    const calculateTotal = () => {
        let total = 0;
        factureData.consultations.forEach((cons) => {
         
         
            total += cons.total;
      
        });
      
        return total;
      };
    
    const fetchFactureData = () => {
      
        
        axios.get(`http://localhost:8080/invoices/${id}`)
            .then(response => {
                setFactureData(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données de la facture:', error);
            });
            axios.get(`http://localhost:8080/api/v1/auth/User/${userName}`)
            .then(response => {
              setMedecin(response.data);
            })
            .catch(error => {
              console.error(error);
            });
           
    }
    console.log(factureData?.consultations[0].examList)

    const handleImprimerClick = () => {
        window.print();
    }

    return (
        
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-column">
                                    <h3>Facture</h3>
                                    <small className="text-muted">Date de Création : {factureData ? factureData.date : 'Loading...'}</small>
                                </div>
                                <div className="d-flex justify-content-center flex-column ml-auto">
                                    <img src={Capture} alt="logo" style={{ width: '200px', height: '80px' }} />
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {factureData ? (
                                <>
                                    <div>
                                        <h5>Médecin</h5>
                                        <hr></hr>
                                        <div style={{ display: 'flex'}}>
                                        <p style={{ marginRight: '40px' }}>NIHI: {factureData.userId}
     </p>
                                        <p style={{ marginRight: '40px' }}>Nom et Prénom: {medecin?.lastname} {medecin?.firstname}
     </p>
     <p style={{ marginRight: '40px' }}>Email: {medecin.email}
     </p>
                                             </div>
                                        
    
                                        
                                    </div>
                                    <br></br>
                                    <h5>Attestations</h5>
                                    <hr />
                                    <div>
                                        {factureData?.consultations.map((consult, index)=>(
                                            <div>
                                    <div className="card card-warning" style={{ width: '100%', margin: '3% auto' }}>
      <p-toast></p-toast>
      <p-toast position="top-right" key="tl"></p-toast>
      <div className="card-header" style={{backgroundColor:'#29D8AD'}}>
      <p >
          Attestation: {index+1}
    </p>
      <div style={{ display: 'flex'}}>
      
        
  <p style={{ marginRight: '40px' }}>Date: {consult.date}
     </p>
     <p style={{ marginRight: '40px' }}>Type: {consult.type}
     </p>
    
     <p >Motif: {consult.motif}
     </p>
 
        </div>
       
       
      </div>

      <div className="card-body">
      <p >NISS du Patient: {consult.patient.id}
     </p>
        <div>
           
          <label className="col-form-label">Liste des Prestations:</label>
 
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #DAD7D8', padding: '8px', color:'#29D8AD', textAlign:'center' }}>Code</th>
          <th style={{ border: '1px solid #DAD7D8', padding: '8px', color:'#29D8AD', textAlign:'center' }}>Description</th>
          <th style={{ border: '1px solid #DAD7D8', padding: '8px', color:'#29D8AD', textAlign:'center' }}>prix</th>
        </tr>
      </thead>
      <tbody>
        {consult.examList?.map((exam) => (
          <tr key={exam.value}>
            <td style={{ border: '1px solid #DAD7D8', padding: '8px' }}>{exam.code}</td>
            <td style={{ border: '1px solid #DAD7D8', padding: '8px' }}>  {exam.description}</td>
            <td style={{ border: '1px solid #DAD7D8', padding: '8px' }}>{exam.cost}€
            </td>
            
          </tr>
          
        ))}
       
      </tbody>
    </table>
 
  
</div>



       

      </div>
    </div>
    </div>
                                        )) }
                                    </div>
                                   <br></br>
                                    <div>
                                        <h5>Total de la Facture</h5>
                                        <hr></hr>
                                        <div style={{ marginLeft:'90%' }}>
    <label >Total:</label>
    <input type="text" className="form-control" id="no" value={calculateTotal()+'€'} readOnly />
  </div>    </div>
                                    
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleImprimerClick}
                                >
                                    Imprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FactureComponent;