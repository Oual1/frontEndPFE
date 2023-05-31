import axios from 'axios' ;
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';





import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { createCanvas, loadImage } from 'canvas';
import { Canvas } from '@react-pdf/renderer';
import Topbar from '../global/Topbar';





export default function ViewFiles() {
    const [Filess,setFiles]=  useState([]);


    const [errorMap, setErrorMap]= useState([]);
    const [filo, setFilo]= useState(null);
    const [userName, setUserName] = useState(null);
    

    function getAllRec(id){
      axios.get(`http://localhost:8080/details/onlyErrorMsg/${id}`) // Remplacez '/students' par l'URL de votre endpoint pour récupérer les étudiants
      .then(response => {
        setErrorMap(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }

    function getFileById(id){
      axios.get(`http://localhost:8080/files/${id}`)
      .then(response => {
        setFilo(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }
    const generatePDF = (id) => {
      getFileById(id);
      getAllRec(id);
      const doc = new jsPDF();
      
     
   
  
  
      doc.setFontSize(14);

  
      doc.text(`Rapport d'Erreur pour : ${filo?.fileName} de N° de référence ${id}`, 10,25);
      
      
  
      doc.autoTable({
        head: [['Type de Record', 'Zone', 'Code Erreur', 'Description']],
        body: Object.entries(errorMap).map(([type, message]) => [type.toString().substring(0, 2), message.zone?.numéro, message.content, message.errorCode?.frenchDescription]),
        margin:{top: 40},
      });
     
      doc.save(`${filo?.fileName}.pdf`);

  
    };


   
    function FileList(){
        axios.get("http://localhost:8080/files").then(
            response =>{
                const filess= response.data;
                setFiles(filess);
                
                
            })
    }

   
    
    
    
    useEffect(()=>{
        FileList();
        
       
        
        
    },[]
    )
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'File Reference', width: 150 },
        {
          field: 'fileName',
          headerName: 'File Name',
          width: 280,
          
         
        },
        {
          field: 'state',
          headerName: 'State',
          width: 120,
          
        },
        {
          field: 'type',
          headerName: 'Type',
          width: 250,
          
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 270,
          renderCell:(params)=>{
           const type= params.row.type.toString() !== 'BORDEREAU_FACTURATION';
            

            return(
              <div>
            
                <Link to={'/ViewDetail/'+`${params.row.id}`} > 
                  <Button  variant="contained" style={{backgroundColor:"#27E09A"}}> View File</Button> 
                </Link>
              { type &&(
             <Button variant="contained" style={{ backgroundColor: "#0F23CE", marginLeft: "5%" }} onClick={() => generatePDF(params.row.id)}>
                View Errors
             </Button>)}
   

                 </div>
            )
          }
        },

       ];
      
      
      const rows =Filess ? Filess?.map((e)=>{
        
        return{
     id: e.id,
    fileName: e.fileName,
    state: e.state,
    type:e.type 
        }}):[];
       
    
        
       
      
      
  return (
 
<div >
    <Topbar></Topbar>

<div>
     
       
        
      
     
<div style={{ marginLeft:20, marginTop:100 , marginBottom: 180}}>

  <br></br>
  <br></br>
  <h3 style={{fontSize: "1.5em",  marginLeft:"40%", color:'black' }}>File List </h3>
    <Box sx={{ height: 300, width: '102%', marginLeft:'0%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
        }}
        pageSizeOptions={[4]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box></div>
    
    </div>
    
    </div>
  );
}

  


