import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TableScrollButton from '@mui/material/TabScrollButton';
import { useParams } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';

const ViewDetail = () => {
  
  
  const [attestations, setAttestations]= useState([]);
  const [selectedAttestation, setSelectedAttestation] = useState([]);
  
  const [selectedPrestation, setSelectedPrestation] = useState([]);
  const [selectedAttestationIndex, setSelectedAttestationIndex] = useState(null);
  
  const [attestationStates, setAttestationStates] = useState(attestations.map(() => false));
  const [selectedPrestationIndex, setSelectedPrestationIndex] = useState(null);
  
  const [prestationStates, setPrestationStates] = useState(null);
 

  
  const { id }=useParams();


  

  

  


   
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
    getAllAttestations()
     }, [id]);


    

   

    
    

    const handlePrestationClick = (id) => {
     
      setSelectedPrestation(selectedAttestation.prestations?.find((prestation) => prestation.id === id));
     
    };

    const handlePrestationClose= () => {
      setSelectedPrestation(null);
      
    };


    const handleBackClick = (index) => {
      const newAttestationStates = [...attestationStates];
      newAttestationStates[index] = false;
      setAttestationStates(newAttestationStates);
      setSelectedAttestation(null);
      setSelectedAttestationIndex(null);
      
    };
    
    const handleAttestationClick1 = (index) => {
      const newAttestationStates = [...attestationStates];
      newAttestationStates[index] = true;
      setAttestationStates(newAttestationStates);
      setSelectedAttestation(attestations[index]);
      setSelectedAttestationIndex(index);
      
    };


    const handleBackPresClick = (index) => {
      const newPrestationStates = [...prestationStates];
      newPrestationStates[index] = false;
      setPrestationStates(newPrestationStates);
      setSelectedPrestation(null);
      setSelectedPrestationIndex(null);
      
    };
    
    const handlePresClick1 = (index) => {
      const newPrestationStates = [...prestationStates];
      newPrestationStates[index] = true;
      setPrestationStates(newPrestationStates);
      setSelectedPrestation(attestations[index]);
      setSelectedPrestationIndex(index);
      
    };
  
  
    
    

   return (

    <div style={{marginLeft:'20%', display: 'flex'}}>
      
      <div style={{ flex: 1 }}>
      <TableContainer>
        <Table  stickyHeader>
          <TableHead >
            <TableRow>
              {attestations?.map((attestation, index) => (
                <div>
                <TableCell style={{width: '100px'}} key={attestation}>
                Attestaion: {index+1} </TableCell>
              <TableCell style={{width: '50px'}} key={attestation}>
              {attestationStates[index] ? (
                <ArrowBackIosIcon
                  onClick={() => handleBackClick(index)}
                ></ArrowBackIosIcon>
              ) : (
                <ArrowForwardIosIcon
                  onClick={() => handleAttestationClick1(index)}
                ></ArrowForwardIosIcon>
              )}
              </TableCell>
              </div>
              
              
            ))}
            
            </TableRow>
          </TableHead>
          
        </Table>
      </TableContainer>
      
      </div>
    {selectedAttestation && selectedAttestation.recordContents?.length >0 && (
        
        <div style={{width: '78%', overflowX: 'auto', flex: 4}} >
          
          <h2>Attestation:{selectedAttestationIndex +1}</h2>
          <br></br>
          <br></br>
          <h5>Enregistrement: 20</h5>
         <TableContainer component={Paper} sx={{ maxWidth: 1250}}>
        
        <Table  stickyHeader>
        
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton} >
          <TableRow >
            {selectedAttestation.recordContents[0]?.messageList?.map((msg) => (
              
             <TableCell  style={{width: '500px'}} key={msg} >{msg.zone.numéro}-{msg.zone.description}</TableCell>
             
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
                    <p style={{ color: 'red', width: '500px' }} key={msg} >{msg.content}: {msg.errorCode.frenchDescription}</p>
                    </div>
                  ))}

      <br></br>
      <br></br>
      <br></br>

      <TableContainer>
        
        <Table  stickyHeader>
        
          <TableHead>
          <TableRow >
            {selectedAttestation.prestations?.map((prestation, index) => (
            <div>
              <TableCell style={{width: '100px'}} key={prestation}>Prestation: {index+1} </TableCell>
            <TableCell style={{width: '50px'}} key={prestation}>
              <ArrowForwardIosIcon onClick={() => handlePrestationClick(prestation.id)}></ArrowForwardIosIcon>
            </TableCell>
            </div>
             
           ))}
          </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>

              
            </TableRow>
          </TableBody>
        </Table>
        </TableContainer>
        {selectedPrestation && selectedPrestation.recordContents?.length>0 && (
          <div>
            {selectedPrestation.recordContents.map((rec)=>(
              <div style={{marginLeft: '13%'}}>
              <TableContainer  component={Paper} sx={{ maxWidth: 1250}}>
        
              <Table  key={rec} stickyHeader>
              
                <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton} >
                <TableRow >
                  {rec.messageList?.map((msg) => (
                    
                   <TableCell  style={{width: '500px'}} key={msg} >{msg.zone.numéro}-{msg.zone.description}</TableCell>
                   
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
                    <div>
                    <WarningAmberIcon style={{color: 'red'}}></WarningAmberIcon>
                    <p style={{ color: 'red', width: '500px' }} key={msg} >{msg.content}: {msg.errorCode.frenchDescription}</p>
                    </div>
                  ))}
             
            
            
            <ArrowBackIosIcon style={{  marginLeft:'50%'}} onClick={() => handlePrestationClose()} />
            </div>
            
    
            ))}
            <br></br>
           
            
            </div>

          

        )}

      <br></br>
      <br></br>
      <br></br>










      <br></br>
      <h5>Enregistrement:80</h5>
      <TableContainer component={Paper} sx={{ maxWidth: 1250}}>
        
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
                    <p style={{ color: 'red', width: '500px' }} key={msg} >{msg.content}: {msg.errorCode.frenchDescription}</p>
                    </div>
                  ))}
       <br></br>
       
      
      </div>
      
        )}
        
    </div>
    
   );
}
  



  






  
export default ViewDetail;




