import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import TableScrollButton from '@mui/material/TabScrollButton';
import { Router, useParams } from 'react-router-dom';
import ViewDetail from './ViewDetail';
const ViewFooter = () => {
  
  
  const [totalFact, ssetTotalFact]= useState(null);
  const [totalMutualite, setTotalMutualite]= useState(null);
 
  const { id }=useParams();


    function getTotalMutualite(){
      axios.get(`http://localhost:8080/footers/${id}/totalMutualité`)
      .then(response => {
        setTotalMutualite(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }


   function getTotalFact(){
      axios.get(`http://localhost:8080/footers/${id}/totalFact`)
      .then(response => {
        ssetTotalFact(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }
    
    
    
    useEffect(() => {
     getTotalMutualite();
     getTotalFact()
     
      
    }, [id]);
    
 


  






  return (
    
    <div>
     
      

     <h2 style={{color:"#2AC78C"}}>Bas de Facture</h2>
      <br></br>
      <br></br>
      <h3 style={{marginLeft:"3%"}}>Enregistrement: {totalMutualite?.record?.recordType} </h3>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1300, marginLeft:"3%"}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {totalMutualite?.messageList?.map((msg) => (
              <TableCell style={{width: '200px'}} key={msg}>{msg.zone.numéro}-{msg.zone.description}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {totalMutualite?.messageList?.map((msg) => (
              <TableCell style={{width: '200px'}} >{msg.content}</TableCell>
            ))}
          
              <TableRow >
             
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      
      <br></br>
      <h3 style={{marginLeft:"3%"}}>Enregistrement:{totalFact?.record?.recordType} </h3>
      <br></br>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1300, marginLeft:"3%"}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {totalFact?.messageList?.map((msg) => (
              <TableCell style={{width: '200px'}} key={msg}>{msg.zone.numéro}-{msg.zone.description}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {totalFact?.messageList?.map((msg) => (
              <TableCell style={{width: '200px'}} >{msg.content}</TableCell>
            ))}
          
              <TableRow >
             
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
       
      
    </div>
    
  );
};

export default ViewFooter;

