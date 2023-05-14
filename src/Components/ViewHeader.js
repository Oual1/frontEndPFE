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
      axios.get(`http://localhost:8080/headers/${id}/segment300`)
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
    
    <div style={{ width: '78%', overflowX: 'auto',marginLeft:'20%'}}>
     
      

      
      <br></br>
      <h6>segment 200</h6>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1200}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {seg200?.map((msg) => (
              <TableCell style={{width: '200px'}} key={msg}>{msg.zone.numéro}-{msg.zone.description}</TableCell>
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
      <h6>segment 300</h6>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1200}}>
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



{/* <h6>Enregistrement:10 </h6>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1200}}>
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
        
      </TableContainer> */}
      


{/* <h6>Enregistrement: 90 </h6>
      
      <TableContainer component={Paper} sx={{ maxWidth: 1200}}>
      
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
      </TableContainer> */}

