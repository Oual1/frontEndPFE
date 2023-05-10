/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import TableScrollButton from '@mui/material/TabScrollButton';
import { useParams } from 'react-router-dom';
const ShowFile = () => {
  
  const [header, setHeader]= useState([]);
  const [detail, setDetail]= useState([]);
  const [footer, setfooter]= useState([]);
  const [records, setRecords]= useState([]);
  const { id }=useParams();


    function getRecordList(){
      axios.get(`http://localhost:8080/headers/recordsHeader/${id}`) // Remplacez '/students' par l'URL de votre endpoint pour récupérer les étudiants
      .then(response => {
        setRecords(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }


   function getMessagesHeader(){
      axios.get(`http://localhost:8080/headers/messagesHeader/${id}`) // Remplacez '/students' par l'URL de votre endpoint pour récupérer les étudiants
      .then(response => {
        setHeader(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }
    function getMessagesDetail(){
      axios.get(`http://localhost:8080/details/messagesDetail/${id}`) // Remplacez '/students' par l'URL de votre endpoint pour récupérer les étudiants
      .then(response => {
        setDetail(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }
    function getMessagesFooter(){
      axios.get(`http://localhost:8080/footers/messagesFooter/${id}`) // Remplacez '/students' par l'URL de votre endpoint pour récupérer les étudiants
      .then(response => {
        setfooter(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }
    useEffect(() => {
     getMessagesHeader();
     getMessagesFooter();
     getRecordList()
     
      
    }, [id]);
    
  console.log(header.length);
  const groups = [];
  let i= 0;
  let j= 0;
  

    while (i< header.length && j < records.length) {
      
      
      groups.push(header.slice(i, records[j].zones.length));
      
      i+=records[j].zones.length;
      j++;
      

    }
    console.log(groups);
  

   
  
    const rec= records.slice(0,1)[0];

  const seg200= header.slice(0,12);
  const header200 = seg200.map((msg) => `${msg.zone.numéro}-${msg.zone.description}`);
  const headerContent200 = seg200.map((msg) => `${msg.content}`);

  const seg300= header.slice(12,header.size);
  const header300 = seg300.map((msg) => `${msg.zone.numéro}-${msg.zone.description}`);
  const headerContent300 = seg300.map((msg) => `${msg.content}`);

  const rec95= footer.slice(0,16);
  const footer95 = rec95.map((msg) => `${msg.zone.numéro}-${msg.zone.description}`);
  const footerContent95 = rec95.map((msg) => `${msg.content}`);

  const rec96= footer.slice(16, footer.size);
  const footer96 = rec96.map((msg) => `${msg.zone.numéro}-${msg.zone.description}`);
  const footerContent96 = rec96.map((msg) => `${msg.content}`);



  






  return (
    
    <div style={{ width: '78%', overflowX: 'auto',marginLeft:'20%'}}>
     
      <div>
      {records.length > 0 && (
        <div>
          <h6>Segment {records[0].zones.length}</h6>
        </div>
      )}
    </div>

      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1250}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {header200?.map((name) => (
              <TableCell style={{width: '200px'}} key={name}>{name}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {headerContent200?.map((cont) => (
              <TableCell style={{width: '200px'}} >{cont}</TableCell>
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
              {header300?.map((name) => (
              <TableCell style={{width: '200px'}} key={name}>{name}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {headerContent300?.map((cont) => (
              <TableCell style={{width: '200px'}} >{cont}</TableCell>
            ))}
          
              <TableRow >
             
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <h6>Enregistrement 95</h6>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1200}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {footer95?.map((name) => (
              <TableCell style={{width: '200px'}} key={name}>{name}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {footerContent95?.map((cont) => (
              <TableCell style={{width: '200px'}} >{cont}</TableCell>
            ))}
          
              <TableRow >
             
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <h6>Enregistrement 96</h6>
      <br></br>
      <TableContainer component={Paper} sx={{ maxWidth: 1200}}>
        <Table  stickyHeader>
          <TableHead scrollButtons={true} allowScrollButtonsMobile={true} ScrollButtonComponent={TableScrollButton}>
            <TableRow>
              {footer96?.map((name) => (
              <TableCell style={{width: '200px'}} key={name}>{name}</TableCell>
            ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
          {footerContent96?.map((cont) => (
              <TableCell style={{width: '200px'}}>{cont}</TableCell>
            ))}
          
              <TableRow >
             
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
      
    
    
    
    </div>
  );
};

export default ShowFile; */


{/* <div style={{ marginLeft: '20%', width: '80%', overflow: 'auto',  maxWidth:1165 }}>
  <table>
    <thead>
      <tr>
        {attestations?.map((attestation) => (
          attestation.recordContents[0]?.messageList?.map((msg) => (
            <th key={msg.id}>{msg?.zone?.numéro}-{msg?.zone?.description}</th>
          ))
        ))}
        {attestations?.length > 0}
      </tr>
    </thead>
    <tbody>
      {attestations?.map((attestation) => (
        <React.Fragment key={attestation.id}>
          <tr>
            {attestation.recordContents[0]?.messageList?.map((msg) => (
              <td key={msg.id}>{msg?.content}</td>
            ))}
            
            <td >
              <ArrowForwardIosIcon onClick={() => handleAttestationClick(attestation.id)} />
            </td>
          </tr>
          {selectedAttestationIds.includes(attestation.id) && (
            
            <tr key={`prestations-${attestation.id}`}>
              <td colSpan={"38"}>
                <h2>nombre de prestations: {attestation.prestations.length}</h2>
                <table>
                  <thead>
                    <tr>
                    {attestation.prestations && attestation.prestations?.map((prestation) => (
                        prestation.recordContents?.map((recordContent) => (
                          <tr key={recordContent.id}>
                            {recordContent?.messageList?.map((message) => (
                              <th style={{width:"300px"}}  key={message.id}>{message?.zone.numéro}-{message?.zone.description}</th>
                            ))}
                          </tr>
                        ))
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                    {attestation.prestations && attestation.prestations?.map((prestation) => (
                        prestation.recordContents?.map((recordContent) => (
                          <tr key={recordContent.id}>
                            {recordContent?.messageList?.map((message) => (
                              <td style={{width:"290px"}} key={message.id}>{message?.content}</td>
                            ))}
                          </tr>
                        ))
                      ))}
                    </tr>
                  </tbody>
                </table>
                <ArrowBackIosIcon onClick={() => handlePrestationClose(attestation.id)} />
              </td>
            </tr>
            
          )}
        </React.Fragment>
      ))}
    </tbody>
  </table>
</div> */}