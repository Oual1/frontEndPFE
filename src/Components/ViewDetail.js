import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TableScrollButton from '@mui/material/TabScrollButton';
import { useParams } from 'react-router-dom';

import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
const ViewDetail = () => {
  
  
  const [attestations, setAttestations]= useState([]);
  const [selectedAttestation, setSelectedAttestation] = useState([]);
  
  const [selectedPrestation, setSelectedPrestation] = useState([]);
  const [selectedAttestationIndex, setSelectedAttestationIndex] = useState([]);
  
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



     
    const handleAttestationClick = (id) => {
      setSelectedAttestation(attestations.find((attestation) => attestation.id === id));
      
      
    };
    const handleAttestationClose = () => {
      setSelectedAttestation(null);
      
    };
    

    const handlePrestationClick = (id) => {
      setSelectedPrestation(selectedAttestation.prestations?.find((prestation) => prestation.id === id));
      
    };

    const handlePrestationClose= () => {
      setSelectedPrestation(null);
      
    };
  
    
    

   return (

    <div style={{marginLeft:'20%'}}>
      
      
      <TableContainer>
        <Table  stickyHeader>
          <TableHead >
            <TableRow>
              {attestations?.map((attestation, index) => (
                <div>
                <TableCell style={{width: '100px'}} key={attestation}>
                Attestaion: {index+1} </TableCell>
              <TableCell style={{width: '50px'}} key={attestation}>
                <ArrowForwardIosIcon onClick={() => handleAttestationClick(attestation.id)}></ArrowForwardIosIcon>
              </TableCell>
              </div>
              
              
            ))}
            
            </TableRow>
          </TableHead>
          
        </Table>
      </TableContainer>
    {selectedAttestation && selectedAttestation.recordContents?.length >0 && (
        
        <div style={{ width: '78%', overflowX: 'auto',marginLeft:'13%'}}>
          
          <h5>Enregistrement: 10</h5>
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
              
             <TableCell  style={{width: '500px'}} key={msg} >{msg.content}</TableCell>
             
           ))}
           
           </TableRow>
          
            
          </TableBody>
          
        </Table>
        
      </TableContainer>

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
        </Table>
        </TableContainer>
        {selectedPrestation && selectedPrestation.recordContents?.length>0 && (
          <div >
            {selectedPrestation.recordContents.map((rec)=>(
              <div style={{marginLeft:'10%'}}>
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
                    
                   <TableCell  style={{width: '500px'}} key={msg} >{msg.content}</TableCell>
                   
                 ))}
                 
                 </TableRow>
                
                  
                </TableBody>
                
              </Table>
              
            </TableContainer>
            </div>
            
    
            ))}
            <br></br>
            <br></br>
            <ArrowBackIosIcon style={{  marginLeft:'50%'}}onClick={() => handlePrestationClose()} />
            </div>

          

        )}

      <br></br>
      <br></br>
      <br></br>










      <br></br>
      <h5>Enregistrement:20</h5>
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
              
             <TableCell  style={{width: '500px'}} key={msg} >{msg.content}</TableCell>
             
           ))}
           
           </TableRow>
          
            
          </TableBody>
          
        </Table>
        
      </TableContainer>
       <br></br>
       <br></br>
      <ArrowBackIosIcon style={{  marginLeft:'50%'}}onClick={() => handleAttestationClose()} />
      
      </div>
      
        )}
        
    </div>
    
   );
}
  



  






  
export default ViewDetail;




