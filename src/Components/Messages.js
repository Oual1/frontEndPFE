import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import TableScrollButton from '@mui/material/TabScrollButton';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/messages') // Remplacez '/students' par l'URL de votre endpoint pour récupérer les étudiants
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const firstMsg= messages.slice(0,16);
  const studentNames = firstMsg.map((msg) => `${msg.zone.numéro}-${msg.zone.description}`);
  const messageContent = firstMsg.map((msg) => `${msg.content}`);





  return (
    
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <h6>ghjkl</h6>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1200}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {studentNames?.map((name) => (
              <TableCell style={{width: '200px'}} key={name}>{name}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {messageContent?.map((cont) => (
              <TableCell style={{width: '200px'}} key={cont}>{cont}</TableCell>
            ))}
          
              <TableRow >
             
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Messages;
