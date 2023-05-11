import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import TableScrollButton from '@mui/material/TabScrollButton';
import { Router, useParams } from 'react-router-dom';
import ViewDetail from './ViewDetail';
const ViewFooter = () => {
  
  
  const [totalFact, ssetTotalFact]= useState([]);
  const [totalMutualite, setTotalMutualite]= useState([]);
 
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
    
    <div style={{ width: '78%', overflowX: 'auto',marginLeft:'20%'}}>
     
      

     <h6>Bas de Facture</h6>
      <br></br>
      <h6>Enregistrement </h6>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1200}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {totalMutualite?.map((msg) => (
              <TableCell style={{width: '200px'}} key={msg}>{msg.zone.numéro}-{msg.zone.description}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {totalMutualite?.map((msg) => (
              <TableCell style={{width: '200px'}} >{msg.content}</TableCell>
            ))}
          
              <TableRow >
             
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <h6>Enregistrement: </h6>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1200}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {totalFact?.map((msg) => (
              <TableCell style={{width: '200px'}} key={msg}>{msg.zone.numéro}-{msg.zone.description}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {totalFact?.map((msg) => (
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

