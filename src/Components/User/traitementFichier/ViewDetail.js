import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TableScrollButton from '@mui/material/TabScrollButton';
import { useParams } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import ViewFooter from './ViewFooter';
import ViewHeader from './ViewHeader';
import ResponsiveAppBar from '../UserNav';


const ViewDetail = () => {
  
  
  const [attestations, setAttestations]= useState([]);
  const [selectedAttestation, setSelectedAttestation] = useState([]);
  
  const [selectedPrestation, setSelectedPrestation] = useState([]);
  const [selectedAttestationIndex, setSelectedAttestationIndex] = useState(null);

  const [selectedPrestationIndex, setSelectedPrestationIndex] = useState(null);
  
  
  const [messages10, setMessages10]= useState([]);
  const [messages90, setMessages90]= useState([]);
  

  const [showPrestationsIndices, setShowPrestationsIndices] = useState([]);
  const [showRecordIndices, setShowRecordIndices] = useState([]);


  const [filo, setFilo]= useState(null);
  
const { id }=useParams();    

  function getRec10(){
    axios.get(`http://localhost:8080/details/recordContent10/${id}`) // Remplacez '/students' par l'URL de votre endpoint pour récupérer les étudiants
    .then(response => {
      setMessages10(response.data);
    })
    .catch(error => {
      console.error(error);
    });

  }

  function getRec90(){
    axios.get(`http://localhost:8080/details/recordContent90/${id}`) // Remplacez '/students' par l'URL de votre endpoint pour récupérer les étudiants
    .then(response => {
      setMessages90(response.data);
    })
    .catch(error => {
      console.error(error);
    });

  }
 

  

  

  


   
    function getAllAttestations(){
      axios.get(`http://localhost:8080/details/all-attestations/${id}`) // Remplacez '/students' par l'URL de votre endpoint pour récupérer les étudiants
      .then(response => {
        setAttestations(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }
   
    useEffect(() => {
    getAllAttestations();
    getRec10();
    getRec90();
    getFileById()
     }, [id]);


  const togglePrestations = (index) => {
      setSelectedAttestation(attestations[index]);
      setSelectedAttestationIndex(index);
      setShowPrestationsIndices((prevIndices) => {
        if (prevIndices.includes(index)) {
          return prevIndices.filter((i) => i !== index);
        } else {
          return [...prevIndices, index];
        }
      });
    };

    const togglePres = (index) => {
      setSelectedPrestation(selectedAttestation?.prestations[index]);
      setSelectedPrestationIndex (index);


      setShowRecordIndices((prevIndices) => {
        if (prevIndices.includes(index)) {
          return prevIndices.filter((i) => i !== index);
        } else {
          return [...prevIndices, index];
        }
      });
    };



    function getFileById(){
      axios.get(`http://localhost:8080/files/${id}`)
      .then(response => {
        setFilo(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }
    
    
    

   return (
    
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <br></br>
      <br></br><br></br><br></br>
      <br></br>
      <p style={{marginLeft:"30%", fontSize:"1.5em", color:"#2AC78C"}}><strong>Facture de N° de référence {filo?.id}:  {filo?.type}</strong></p>
      <br></br>
      
      
      <ViewHeader></ViewHeader>
      <br></br>
      
      <br></br>
      
      <h2 style={{color:"#2AC78C"}}>Détail de la Facture </h2>
      <br></br>
      <br></br>
      <h3 style={{marginLeft:"3%"}}>Enregistrement:10 </h3>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1300, marginLeft:"3%"}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {messages10?.map((msg) => (
              <TableCell style={{width: '200px'}} key={msg}>{msg.zone.numéro}-{msg.zone.description}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {messages10?.map((msg) => (
              <TableCell style={{width: '200px'}} >{msg.content}</TableCell>
            ))}
          
              <TableRow >
             
              </TableRow>
           
          </TableBody>
        </Table>
        
      </TableContainer>
      <br></br>
      <br></br>
      

      <div style={{width: '150%', overflowX: 'auto'}} >
        <ul>
          {attestations?.map((attestation, index) => (
             <div key={attestation} style={{marginLeft:"3%"}}>
              <p style={{ fontSize: "1.3em" }}>
            Attestation: {index + 1}{' '}
            {showPrestationsIndices.includes(index) ? (
              <ArrowBackIosIcon style={{ color: '#27E09A' }} onClick={() => togglePrestations(index)} />
            ) : (
              <ArrowForwardIosIcon style={{ color: '#27E09A' }} onClick={() => togglePrestations(index)} />
            )}
          </p>
          <hr style={{width:"7%", color:"#27E09A", height:"15px"}}></hr>

          {showPrestationsIndices.includes(index) && selectedAttestation?.recordContents?.length >0 && (
        
        <div style={{ marginLeft:"3%", flex: 4}} >
          
          
          <br></br>
          <br></br>
          <h3>Enregistrement: 20</h3>
         <TableContainer component={Paper} sx={{ maxWidth: 1190}}>
        
        <Table  stickyHeader>
        
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton} >
          <TableRow >
            {selectedAttestation.recordContents[0]?.messageList?.map((msg) => (
              
             <TableCell  style={{width: '500px', color: msg.errorCode !== null ? 'red' : 'inherit'}} key={msg} >{msg.zone.numéro}-{msg.zone.description}</TableCell>
             
           ))}
           
           </TableRow>
           
          </TableHead>
          <TableBody>
          <TableRow >
            
            {selectedAttestation.recordContents[0]?.messageList?.map((msg) => (
              
             <TableCell  style={{width: '500px', color: msg.errorCode !== null ? 'red' : 'inherit'}} key={msg} >{msg.content}</TableCell>
             
           ))}
           
           </TableRow>
          
            
          </TableBody>
          
        </Table>
        
      </TableContainer>
      <br></br>
            <br></br>
            {selectedAttestation.recordContents[0]?.messageList?.map((msg) =>msg.errorCode !==null && (
                    <div>
                    <WarningAmberIcon style={{color: 'red'}}></WarningAmberIcon>
                    <p style={{ color: 'red', width: '500px', fontSize:"1.5em" }} key={msg} >{msg.content}: {msg.errorCode.frenchDescription}</p>
                    </div>
                  ))}

      <br></br>
      <br></br>
      <br></br>
      <ul>
      {selectedAttestation.prestations?.map((prestation, index) => (
            <div key={prestation}>
              <p style={{ fontSize: "1.3em" }}>
            Prestation: {index + 1}{' '}
            {showRecordIndices.includes(index) ? (
              <ArrowBackIosIcon style={{ color: '#27E09A' }} onClick={() => togglePres(index)} />
            ) : (
              <ArrowForwardIosIcon style={{ color: '#27E09A' }} onClick={() => togglePres(index)} />
            )}
          </p>
          <hr style={{width:"9%", color:"#27E09A", height:"15px"}}></hr>

          {showRecordIndices.includes(index) && selectedPrestation.recordContents?.length>0 && (
          <div>
            {selectedPrestation.recordContents.map((rec)=>(
              <div>
                <h3 style={{marginLeft:"3%"}}>Enregistrement: {rec.record.recordType.toString().substring(0, 2)}</h3>
              <TableContainer  component={Paper} sx={{ maxWidth: 1110, marginLeft:"3%"}}>
        
              <Table  key={rec} stickyHeader>
              
                <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton} >
                <TableRow >
                  {rec.messageList?.map((msg) => (
                    
                   <TableCell  style={{width: '500px', color: msg.errorCode !== null ? 'red' : 'inherit'}} key={msg} >{msg.zone.numéro}-{msg.zone.description}</TableCell>
                   
                 ))}
                 
                 </TableRow>
                 
                </TableHead>
                <TableBody>
                <TableRow >
                  
                  {rec.messageList?.map((msg) => (
                    
                   <TableCell  style={{width: '500px', color: msg.errorCode !== null ? 'red' : 'inherit'}} key={msg} >{msg.content}</TableCell>
                   
                 ))}
                 
                 </TableRow>
                 
                  
                </TableBody>
                
              </Table>
              
            </TableContainer>
            <br></br>
            <br></br>
            {rec.messageList?.map((msg) =>msg.errorCode !==null && (
                    <div style={{marginLeft:"3%" }}>
                    <WarningAmberIcon style={{color: 'red'}}></WarningAmberIcon>
                    <p style={{ color: 'red', width: '1000px', fontSize:"1.5em"}} key={msg} >{msg.content}: {msg.errorCode.frenchDescription}</p>
                    </div>
                  ))}
             
            
            
            
            </div>
            
    
            ))}
            <br></br>
           
            
            </div>

          

        )}
              
            
              
           
            </div>
             
           ))}

      </ul>

      
           
          
        

      <br></br>
      <br></br>
      <br></br>










      <br></br>
      <h3>Enregistrement:80</h3>
      <TableContainer component={Paper} sx={{ maxWidth: 1190}}>
        
        <Table  stickyHeader>
        
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton} >
          <TableRow >
            {selectedAttestation.recordContents[1]?.messageList?.map((msg) => (
              
             <TableCell  style={{width: '500px'}} key={msg} >{msg.zone.numéro}-{msg.zone.description}</TableCell>
             
           ))}
           
           </TableRow>
           
          </TableHead>
          <TableBody>
          <TableRow >
            
            {selectedAttestation.recordContents[1]?.messageList?.map((msg) => (
              
             <TableCell  style={{width: '500px', color: msg.errorCode !== null ? 'red' : 'inherit'}} key={msg} >{msg.content}</TableCell>
             
           ))}
           
           </TableRow>
          
            
          </TableBody>
          
        </Table>
        
      </TableContainer>
      <br></br>
            <br></br>
            {selectedAttestation.recordContents[1]?.messageList?.map((msg) =>msg.errorCode !==null && (
                    <div>
                    <WarningAmberIcon style={{color: 'red'}}></WarningAmberIcon>
                    <p style={{ color: 'red', width: '500px',fontSize:"1.5em"}} key={msg} >{msg.content}: {msg.errorCode.frenchDescription}</p>
                    </div>
                  ))}
       <br></br>
       <br></br>
             <br></br>
       
      
      </div>
      
        )}


            
             </div>
             
            ))}
            </ul>
            
            
            
      
      
      
      
    
        
    </div>
    <br></br>
    <br></br>
    <h3 style={{marginLeft:"3%"}}>Enregistrement: 90 </h3>
      
      <TableContainer component={Paper} sx={{ maxWidth: 1300, marginLeft:"3%"}}>
      
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {messages90?.map((msg) => (
              <TableCell style={{width: '200px'}} key={msg}>{msg.zone.numéro}-{msg.zone.description}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {messages90?.map((msg) => (
              <TableCell style={{width: '200px'}} >{msg.content}</TableCell>
            ))}
          
              <TableRow >
             
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <br></br>
      <br></br>
      { filo?.type.toString()!== 'REJET_PLUS5' &&
    <ViewFooter></ViewFooter>}
      
      
    </div>
   );
}
  



  






  
export default ViewDetail;






