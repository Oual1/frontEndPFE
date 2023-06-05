
import React from 'react';

function ListConsultation() {
  const tauxErreur = 30; // Taux d'erreur fixe pour l'exemple

  return (
    <div>
      <div style={{ width: '200px', height: '20px', border: '1px solid #ccc' }}>
        <div
          style={{
            width: `${tauxErreur}%`,
            height: '100%',
            backgroundColor: 'red',
          }}
        />
      </div>
      <p>Taux d'erreur : {tauxErreur}%</p>
    </div>
  );
}

export default ListConsultation;


















































/* import axios from 'axios' ;
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ListConsultation() {
    const [consultations,setConsultations]=  useState(null);

  
    function ConsultationList(){
        axios.get("http://localhost:8083/consultations").then(
            response =>{
               setConsultations(response.data);
                
                
                
            })
    }
    
    function handleClick() {
        window.location.href = '/add-consultation';
      }
    
    useEffect(()=>{
        ConsultationList()
        
    },[]
    )
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'date',
          headerName: 'date',
          width: 150,
          
         
        },
        {
          field: 'type',
          headerName: 'type',
          width: 150,
          
        },
        
        {
          field: 'actions',
          headerName: 'Actions',
          width: 150,
          renderCell:(params)=>{
            return(
              <div>
                <a  ><EditIcon style={{Color:'#444'}}/></a>
                <a > <DeleteIcon style={{Color:'#444'}}/> </a>
              </div>
            )
          }
        },

       ];
      
      
      const rows =consultations ? consultations?.map((e)=>{
        
        return{
     id: e.id,
    date: e.date,
    type: e.type,
 
        }}):[];
       
    
        
       
      
      
  return (
 


<div style={{marginTop:50}}>
    <button onClick={handleClick} class="btn btn-primary mb-2" >Add Consultation</button>
    

    <Box sx={{ height: 400, width: '100%'}}>
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
  );
}

  

 */