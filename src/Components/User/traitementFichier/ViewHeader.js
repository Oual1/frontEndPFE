import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import TableScrollButton from '@mui/material/TabScrollButton';
import { Router, useParams } from 'react-router-dom';
import ViewDetail from './ViewDetail';
const ViewHeader = () => {
  
  
  const [seg300, setSeg300]= useState([]);
  const [seg200, setSeg200]= useState([]);
 
  const { id }=useParams();


    function getSeg200(){
      axios.get(`http://localhost:8080/headers/${id}/segment200`)
      .then(response => {
        setSeg200(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }


   function getSeg300(){
      axios.get(`http://localhost:8082/headers/${id}/segment300`)
      .then(response => {
        setSeg300(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }
    
    
    useEffect(() => {
     getSeg200();
     getSeg300()
     
      
    }, [id]);
    
 


  






  return (
    
    <div >
       
       <br></br>
       <br></br>

     <h2 style={{color:"#2AC78C"}}>Entête de la Facture</h2> 
      <br></br>
      <br></br>
      <br></br>
      <h3 style={{marginLeft:"3%"}}>Segment: 200</h3>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1300, marginLeft:"3%"}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {seg200?.map((msg) => (
              <TableCell style={{width: '200px', color:'black'}} key={msg}>{msg.zone.numéro}-{msg.zone.description}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {seg200?.map((msg) => (
              <TableCell style={{width: '200px'}} >{msg.content}</TableCell>
            ))}
          
              <TableRow >
             
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <h3 style={{marginLeft:"3%"}}>Segment: 300</h3>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1300 , marginLeft:"3%"}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {seg300?.map((msg) => (
              <TableCell style={{width: '200px'}} key={msg}>{msg.zone.numéro}-{msg.zone.description}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {seg300?.map((msg) => (
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

export default ViewHeader;


